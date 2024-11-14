import { TFunction } from 'i18next';
import { Branding } from '../models/Branding';

export const getStatusMappingToLabels = (t: TFunction<['common', 'branding']>): Record<Branding['status'], string> => {
  return {
    ACTIVE: t('branding:active'),
    DEACTIVE: t('branding:deactive'),
  };
};
