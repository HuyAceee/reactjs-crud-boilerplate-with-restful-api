import { BrandingFormMutationProps } from '../components/FormMutation/FormMutation';
import { Branding } from '../models/Branding';

interface BrandingModelToDefaultValuesOfFormMutation {
  branding: Branding | undefined;
}

export const brandingModelToDefaultValuesOfFormMutation = ({
  branding,
}: BrandingModelToDefaultValuesOfFormMutation): BrandingFormMutationProps['defaultValues'] => {
  if (!branding) {
    return {
      status: 'ACTIVE',
      name: undefined,
      code: undefined,
    };
  }

  return {
    status: branding.status,
    code: branding.brandingCode,
    name: branding.brandingName,
  };
};
