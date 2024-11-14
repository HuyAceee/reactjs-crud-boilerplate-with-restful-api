import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { getFormLoginResolver } from '../constants/zodResolver';
import { Form, Link } from '~/overrides/remix';
import { useRemixForm } from '~/overrides/remix-hook-form';
import { Field, useDeepCompareEffect } from '~/shared/ReactJS';
import { Button, Checkbox, Input, InputPassword } from '~/shared/ReactJS';

export interface FormLoginValues {
  email: string;
  password: string;
  remember: boolean;
}

export interface FormLoginProps {
  loading: boolean;
  fieldsError?: Partial<Record<keyof FormLoginValues, string>>;
}

export const FormLogin: FC<FormLoginProps> = ({ loading, fieldsError = {} }) => {
  const { t } = useTranslation(['common', 'auth']);
  const {
    handleSubmit,
    setValue,
    trigger,
    watch,
    setError,
    formState: { errors },
  } = useRemixForm<Partial<FormLoginValues>>({
    mode: 'onSubmit',
    defaultValues: {
      email: 'dmsthp2023@gmail.com',
      password: 'Admin@123',
      remember: true,
    },
    resolver: getFormLoginResolver(t),
    submitHandlers: {
      onInvalid: console.log,
    },
  });
  const email = watch('email');
  const password = watch('password');
  const remember = watch('remember');

  useDeepCompareEffect(() => {
    Object.keys(fieldsError).forEach(key => {
      const key_ = key as keyof typeof fieldsError;
      if (fieldsError[key_]) {
        setError(key_, {
          message: fieldsError[key_],
        });
      }
    });
  }, [fieldsError]);

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <Field label={t('auth:email')} error={errors.email?.message}>
        <Input
          valueVariant="controlled-state"
          value={email}
          onChange={value => {
            setValue('email', value);
            trigger('email');
          }}
          placeholder={t('auth:email')}
        />
      </Field>

      <div className="mb-[16px] mt-[20px]">
        <Field label={t('auth:password')} error={errors.password?.message}>
          <InputPassword
            valueVariant="controlled-state"
            value={password}
            onChange={value => {
              setValue('password', value);
              trigger('password');
            }}
            placeholder={t('auth:password')}
          />
        </Field>
      </div>

      <div className="mb-[34px] flex items-center justify-between">
        <Checkbox
          checked={remember}
          onChange={value => {
            setValue('remember', value);
            trigger('remember');
          }}
        >
          {t('auth:remember_me')}
        </Checkbox>
        <Link to={'/forgot-password'}>{t('auth:forgot_password')}</Link>
      </div>
      <Button color="primary" htmlType="submit" className="w-full text-[16px] font-semibold" loading={loading}>
        {t('auth:login')}
      </Button>
    </Form>
  );
};
