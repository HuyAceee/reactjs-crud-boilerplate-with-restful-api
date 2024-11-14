import type { ActionFunctionArgs, TypedResponse } from '~/overrides/remix';
import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import { json } from '~/overrides/remix';
import { validateFormData } from '~/overrides/remix-hook-form';
import { i18nServer } from '~/packages/common/I18n/i18n.server';
import {
  BrandingFormMutationProps,
  BrandingFormMutationValues,
} from '~/packages/specific/Branding/components/FormMutation/FormMutation';
import { getFormMutationResolver } from '~/packages/specific/Branding/components/FormMutation/zodResolver';
import { Branding } from '~/packages/specific/Branding/models/Branding';
import { createBranding } from '~/packages/specific/Branding/services/createBranding';
import { brandingFormMutationValuesToCreateBrandingService } from '~/packages/specific/Branding/utils/brandingFormMutationValuesToCreateBrandingService';
import { SimpleActionResponse } from '~/types/SimpleActionResponse';
import { fetcherFormData } from '~/utils/functions/formData/fetcherFormData';
import { handleCatchClauseAsSimpleResponse } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';

export type CreateBrandingActionResponse = SimpleActionResponse<
  Pick<Branding, '_id'>,
  BrandingFormMutationProps['fieldsError']
>;
export const action = async (
  remixRequest: ActionFunctionArgs,
): Promise<TypedResponse<CreateBrandingActionResponse>> => {
  const { request } = remixRequest;
  try {
    const t = await i18nServer.getFixedT(request, ['common', 'branding'] as const);
    const { errors, data } = await validateFormData<BrandingFormMutationValues>(
      await fetcherFormData.decrypt(request),
      getFormMutationResolver(t),
    );
    if (data) {
      await createBranding({
        remixRequest,
        data: brandingFormMutationValuesToCreateBrandingService(data),
      });

      return json({
        hasError: false,
        message: 'Created',
        info: undefined,
      });
    }
    return json(...handleFormResolverError(errors));
  } catch (error) {
    return handleCatchClauseAsSimpleResponse(error);
  }
};

export const ErrorBoundary = PageErrorBoundary;
