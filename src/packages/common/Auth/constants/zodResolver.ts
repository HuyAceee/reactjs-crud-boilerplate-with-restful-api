import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { boolean, object, string } from 'zod';
import { getRequiredMessage } from '~/utils/functions/getRequiredMessage';
import { isEmail } from '~/utils/regexes/isEmail';

export const getFormLoginResolver = (t: TFunction<Array<'common' | 'auth'>>) => {
  const email = {
    required: getRequiredMessage(t, 'auth:email'),
    invalid: t('auth:invalid_email'),
  };
  const password = {
    required: getRequiredMessage(t, 'password'),
  };
  return zodResolver(
    object({
      email: string({ required_error: email.required })
        .trim()
        .min(1, { message: email.required })
        .regex(isEmail, { message: email.invalid }),
      password: string({ required_error: password.required }).trim().min(1, { message: password.required }),
      remember: boolean(),
    }),
  );
};

export const getFormForgotPasswordResolver = (t: TFunction<Array<'common' | 'auth'>>) => {
  const email = {
    required: getRequiredMessage(t, 'auth:email'),
    invalid: t('auth:invalid_email'),
  };

  return zodResolver(
    object({
      email: string({ required_error: email.required })
        .trim()
        .min(1, { message: email.required })
        .regex(isEmail, { message: email.invalid }),
    }),
  );
};
