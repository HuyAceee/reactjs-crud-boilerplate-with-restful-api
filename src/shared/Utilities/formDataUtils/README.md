# Overview

The `FormDataUtils` library is a utility class designed to facilitate the encryption and decryption of form data. It integrates Zod validation to ensure data integrity during these processes. The primary methods include encrypting data into a JSON string and decrypting a `Request` object containing form data.

# API

### `FormDataUtils<T>`

Utility class for handling form data encryption and decryption.

#### Constructor

- `new FormDataUtils({ zodSchema: ZodSchema<T> })`: Creates an instance of FormDataUtils with the specified Zod schema for data validation.

#### Methods

| Method                                               | Description                                                                                                                         |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `encrypt(value: T): { json: string }`                | Encrypts the provided data into a JSON string.                                                                                      |
| `decrypt(request: Request): Promise<T \| undefined>` | Decrypts a `Request` object containing form data and extracts the JSON string. Parses the JSON string into the specified data type. |

### `FormDataUtilsError<T>`

Custom error class for `FormDataUtils` that extends the base `Error` class.

#### Constructor

- `new FormDataUtilsError({ data: T, type: FormDataUtilsError<T>['type'] })`: Creates an instance of FormDataUtilsError.

#### Methods

| Method             | Description                                                                           |
| ------------------ | ------------------------------------------------------------------------------------- |
| `toString(): void` | Overrides the default `toString` method to log error details based on the error type. |

# Usage

```typescript
import { FormDataUtils, FormDataUtilsError } from "formDataUtils";

const formDataUtils = new FormDataUtils({ zodSchema: yourZodSchema });

// Encrypt data
const inputData = { key: "value", number: 42 };
try {
  const encryptedResult = formDataUtils.encrypt(inputData);
  console.log(encryptedResult); // Output: { json: '{"key":"value","number":42}' }
} catch (error) {
  if (error instanceof FormDataUtilsError) {
    error.toString();
  }
}

// Decrypt Request object
const formData = new FormData();
formData.append("json", JSON.stringify(inputData));
const fakeRequest = new Request("http://example.com", { method: "POST", body: formData });

try {
  const decryptedData = await formDataUtils.decrypt(fakeRequest);
  console.log(decryptedData); // Output: { key: 'value', number: 42 }
} catch (error) {
  if (error instanceof FormDataUtilsError) {
    error.toString();
  }
}
```
