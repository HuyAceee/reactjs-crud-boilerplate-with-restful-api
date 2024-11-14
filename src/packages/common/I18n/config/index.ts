import { auth } from '../../Auth/locales/auth';
import { common } from './locales/common';
import { dashboard } from './locales/dashboard';
import { dashboard_layout } from './locales/dashboard_layout';
import { error_message } from './locales/error_message';
import { page403 } from './locales/page403';
import { page404 } from './locales/page404';
import { page500 } from './locales/page500';
import { branding } from '~/packages/specific/Branding/locales/branding';
import { getPublicEnv } from '~/utils/functions/getPublicEnv';

// This is the list of languages your application supports
const supportedLngs = ['en', 'fr'];

// This is the language you want to use in case
// if the user language is not in the supportedLngs
const fallbackLng = getPublicEnv('VITE_DEFAULT_LANGUAGE');

// The default namespace of i18next is "translation", but you can customize it here
const defaultNS = 'translation';

const resources = {
  en: {
    translation: {},
    common: common.en,
    auth: auth.en,
    error_message: error_message.en,
    page403: page403.en,
    page404: page404.en,
    page500: page500.en,
    branding: branding.en,
    dashboard_layout: dashboard_layout.en,
    dashboard: dashboard.en,

    components: {
      FormMutation: {
        ok: 'Confirm',
        save: 'Save',
        cancel: 'Cancel',
        confirm_description: 'Confirm to save this record',
      },
    },
  },
  fr: {
    translation: {},
    common: common.fr,
  },
};

export const i18nConfig = {
  supportedLngs,
  fallbackLng,
  defaultNS,
  resources,
};

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: (typeof resources)['en'];
  }
}
