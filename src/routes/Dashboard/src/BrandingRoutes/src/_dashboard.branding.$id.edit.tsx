import type { ActionFunctionArgs, TypedResponse } from '~/overrides/remix';
import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import { json, redirect } from '~/overrides/remix';
import { validateFormData } from '~/overrides/remix-hook-form';
import { i18nServer } from '~/packages/common/I18n/i18n.server';
import {
  BrandingFormMutationProps,
  BrandingFormMutationValues,
} from '~/packages/specific/Branding/components/FormMutation/FormMutation';
import { getFormMutationResolver } from '~/packages/specific/Branding/components/FormMutation/zodResolver';
import { Branding } from '~/packages/specific/Branding/models/Branding';
import { updateBranding } from '~/packages/specific/Branding/services/updateBranding';
import { brandingFormMutationValuesToCreateBrandingService } from '~/packages/specific/Branding/utils/brandingFormMutationValuesToCreateBrandingService';
import { SimpleActionResponse } from '~/types/SimpleActionResponse';
import { fetcherFormData } from '~/utils/functions/formData/fetcherFormData';
import { handleCatchClauseAsSimpleResponse } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';
import { preventRevalidateOnEditPage } from '~/utils/functions/preventRevalidateOnEditPage';

export type EditBrandingActionResponse = SimpleActionResponse<
  Pick<Branding, '_id'>,
  BrandingFormMutationProps['fieldsError']
>;
export const action = async (remixRequest: ActionFunctionArgs): Promise<TypedResponse<EditBrandingActionResponse>> => {
  const { request, params } = remixRequest;
  if (!params['id']) {
    return redirect('/branding');
  }
  try {
    const t = await i18nServer.getFixedT(request, ['common', 'branding'] as const);
    const { errors, data } = await validateFormData<BrandingFormMutationValues>(
      await fetcherFormData.decrypt(request),
      getFormMutationResolver(t),
    );
    if (data) {
      await updateBranding({
        remixRequest,
        data: {
          _id: params['id'],
          ...brandingFormMutationValuesToCreateBrandingService(data),
        },
      });

      return json({
        hasError: false,
        message: 'Saved',
        info: undefined,
      });
    }
    return json(...handleFormResolverError(errors));
  } catch (error) {
    return handleCatchClauseAsSimpleResponse(error);
  }
};

export const shouldRevalidate = preventRevalidateOnEditPage;

export const ErrorBoundary = PageErrorBoundary;
