import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { object, string, enum as enum_ } from 'zod';
import { getRequiredMessage } from '~/utils/functions/getRequiredMessage';

export const getFormMutationSchema = (t: TFunction<['common', 'branding']>) => {
  const code = {
    required: getRequiredMessage(t, 'branding:code'),
  };
  const name = {
    required: getRequiredMessage(t, 'branding:name'),
  };
  const status = {
    required: getRequiredMessage(t, 'branding:status'),
  };
  return object({
    code: string({ required_error: code.required }).min(1, code.required),
    name: string({ required_error: name.required }).min(1, name.required),
    status: enum_(['ACTIVE', 'DEACTIVE'], { required_error: status.required }),
  });
};

export const getFormMutationResolver = (t: TFunction<['common', 'branding']>) => {
  return zodResolver(getFormMutationSchema(t));
};
