import { AnyRecord } from '~/shared/TypescriptUtilities';

export type SimpleActionResponse<
  T,
  FieldsError extends AnyRecord | undefined = undefined,
  Extra extends AnyRecord = AnyRecord,
> = Extra & {
  message: string;
  hasError: boolean;
  info: T | undefined;
  fieldsError?: Partial<FieldsError>;
};
