import { keys } from 'ramda';
import type { RTHandleError } from './@types/RemixJsonFunction';
import type { FieldErrors, FieldValues } from 'react-hook-form';
import { AnyRecord } from '~/shared/TypescriptUtilities';
import { SimpleActionResponse } from '~/types/SimpleActionResponse';

export const handleFormResolverError = <
  FormValues extends FieldValues = any,
  Model = any,
  FieldsError extends AnyRecord | undefined = undefined,
>(
  errors: FieldErrors<FormValues>,
): RTHandleError<SimpleActionResponse<Model, FieldsError>> => {
  console.log('handleFormResolverError:: ', errors);
  return [
    {
      message: `[FormResolver]: ${errors}`,
      hasError: true,
      info: undefined,
      fieldsError: keys(errors).reduce<SimpleActionResponse<any, any>['fieldsError']>((result, fieldError) => {
        return {
          ...result,
          [fieldError]: errors[fieldError]?.message,
        };
      }, {}),
    },
    { status: 400 },
  ];
};
