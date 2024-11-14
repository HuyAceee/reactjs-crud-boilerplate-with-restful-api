import { ZodError, ZodSchema } from 'zod';
import { AnyRecord } from '~/shared/TypescriptUtilities';

/**
 * Custom error class for FormDataUtils that extends the base Error class.
 *
 * @class FormDataUtilsError
 * @extends {Error}
 * @template T - The type of data associated with the error.
 */
export class FormDataUtilsError<T extends AnyRecord> extends Error {
  /** The type of error, either 'ZOD' for Zod validation errors or 'UNCAUGHT' for uncaught errors. */
  public type: 'ZOD' | 'UNCAUGHT';
  /** Details associated with the error, including data and error type. */
  public detail: { data: T; type: FormDataUtilsError<T>['type'] };

  /**
   * Creates an instance of FormDataUtilsError.
   *
   * @param {object} params - The parameters for creating the error.
   * @param {T} params.data - The data associated with the error.
   * @param {'ZOD' | 'UNCAUGHT'} params.type - The type of error.
   * @memberof FormDataUtilsError
   */
  constructor({ data, type }: { data: T; type: FormDataUtilsError<T>['type'] }) {
    super();
    this.name = 'FormDataUtilsError';
    this.type = type;
    this.detail = {
      data,
      type,
    };
  }

  /**
   * Overrides the default toString method to log error details based on the error type.
   *
   * @returns {void}
   * @memberof FormDataUtilsError
   */
  public override toString = (): void => {
    if (this.type === 'ZOD') {
      console.error('Data is invalid', this.detail.data);
    } else {
      console.error('Exception', this.detail.data);
    }
  };
}

/**
 * Utility class for handling form data encryption and decryption with Zod validation.
 *
 * @class FormDataUtils
 * @template T - The type of data to be handled.
 */
export class FormDataUtils<T extends AnyRecord> {
  /** The Zod schema used for data validation. */
  private _zodSchema!: ZodSchema<T>;

  /**
   * Creates an instance of FormDataUtils.
   *
   * @param {object} params - The parameters for creating the FormDataUtils instance.
   * @param {ZodSchema<T>} params.zodSchema - The Zod schema used for data validation.
   * @memberof FormDataUtils
   */
  constructor({ zodSchema }: { zodSchema: ZodSchema<T> }) {
    this._zodSchema = zodSchema;
  }

  /**
   * Encrypts the provided data into a JSON string.
   *
   * @param {T} data - The data to be encrypted.
   * @returns {{ json: string }} - An object with a property `json` containing the encrypted JSON string.
   * @throws {FormDataUtilsError<T>} - Throws an error if data validation fails.
   * @memberof FormDataUtils
   */
  public encrypt = (data: T): { json: string } => {
    try {
      this._zodSchema.parse(data);
      return { json: JSON.stringify(data) };
    } catch (error) {
      throw new FormDataUtilsError<T>({
        data,
        type: error instanceof ZodError ? 'ZOD' : 'UNCAUGHT',
      });
    }
  };

  /**
   * Decrypts a Request object containing form data and extracts the JSON string.
   * Parses the JSON string into the specified data type.
   *
   * @async
   * @param {Request} request - The Request object containing form data.
   * @returns {Promise<T | undefined>} - A promise that resolves to the decrypted data or undefined if no JSON string is found.
   * @throws {FormDataUtilsError<T>} - Throws an error if data validation fails.
   * @memberof FormDataUtils
   */
  public decrypt = async (request: Request): Promise<T | undefined> => {
    const formData = await request.formData();
    const requestJson = formData.get('json')?.toString();
    if (requestJson) {
      const data = JSON.parse(requestJson);
      try {
        this._zodSchema.parse(data);
        return data as T;
      } catch (error) {
        throw new FormDataUtilsError<T>({
          data,
          type: error instanceof ZodError ? 'ZOD' : 'UNCAUGHT',
        });
      }
    }
    return undefined;
  };
}
