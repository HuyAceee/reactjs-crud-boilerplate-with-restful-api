import React, { ReactNode } from 'react';
import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm, useFormContext } from 'react-hook-form';
import { FetcherWithComponents, SubmitFunction, useActionData, useSubmit } from '../remix';
import { createFormData, mergeErrors } from '.';
import type {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormHandleSubmit,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form';

export type SubmitFunctionOptions = Parameters<SubmitFunction>[1];

export interface UseRemixFormOptions<T extends FieldValues> extends UseFormProps<T> {
  submitHandlers?: {
    onValid?: SubmitHandler<T>;
    onInvalid?: SubmitErrorHandler<T>;
  };
  submitConfig?: SubmitFunctionOptions;
  submitData?: FieldValues;
  fetcher?: FetcherWithComponents<T>;
}

export const useRemixForm = <T extends FieldValues>({
  submitHandlers,
  submitConfig,
  submitData,
  fetcher,
  ...formProps // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
}: UseRemixFormOptions<T>) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const submit = fetcher?.submit ?? useSubmit();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const data: any = fetcher?.data ?? useActionData();
  const methods = useForm<T>(formProps);

  // Submits the data to the server when form is valid
  const onSubmit = (data: T): void => {
    if (!submitHandlers?.onValid) {
      submit(createFormData({ ...data, ...submitData }), {
        method: 'post',
        ...submitConfig,
      });
    }
    submitHandlers?.onValid?.(data);
  };

  const values = methods.getValues();
  const validKeys = Object.keys(values);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onInvalid = submitHandlers?.onInvalid;

  const formState = methods.formState;

  const {
    dirtyFields,
    isDirty,
    isSubmitSuccessful,
    isSubmitted,
    isSubmitting,
    isValid,
    isValidating,
    touchedFields,
    submitCount,
    errors,
    isLoading,
  } = formState;

  const formErrors = mergeErrors<T>(errors, data?.errors ? data.errors : data, validKeys);

  return {
    ...methods,
    handleSubmit: methods.handleSubmit(onSubmit, onInvalid),
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    register: (name: Path<T>, options?: RegisterOptions<T>) => ({
      ...methods.register(name, options),
      defaultValue: data?.defaultValues?.[name] ?? '',
    }),
    formState: {
      dirtyFields,
      isDirty,
      isSubmitSuccessful,
      isSubmitted,
      isSubmitting,
      isValid,
      isValidating,
      touchedFields,
      submitCount,
      isLoading,
      errors: formErrors,
    },
  };
};
interface RemixFormProviderProps<T extends FieldValues> extends Omit<UseFormReturn<T>, 'handleSubmit'> {
  children: React.ReactNode;
  handleSubmit: any;
  register: any;
}
export const RemixFormProvider = <T extends FieldValues>({
  children,
  ...props
}: RemixFormProviderProps<T>): ReactNode => {
  return <FormProvider {...props}>{children}</FormProvider>;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useRemixFormContext = <T extends FieldValues>() => {
  const methods = useFormContext<T>();
  return {
    ...methods,
    handleSubmit: methods.handleSubmit as any as ReturnType<UseFormHandleSubmit<T>>,
  };
};
