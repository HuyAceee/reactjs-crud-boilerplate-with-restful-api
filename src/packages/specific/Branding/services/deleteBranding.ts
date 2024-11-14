import { ActionFunctionArgs, LoaderFunctionArgs } from '~/overrides/remix';
import { Branding } from '~/packages/specific/Branding/models/Branding';
import { ResponseDetailSuccess, ResponseFailure } from '~/services/types/Response';
import { getFetchApiInstance } from '~/services/utils/getFetchApiInstance';
import { isResponseError } from '~/services/utils/isResponseError';
import { ServiceException } from '~/services/utils/ServiceException';

interface ResponseData {}

interface DeleteBranding {
  remixRequest?: LoaderFunctionArgs | ActionFunctionArgs;
  _id: Branding['_id'];
}
export const deleteBranding = async ({ remixRequest, _id }: DeleteBranding) => {
  const fetchApi = await getFetchApiInstance(remixRequest);

  const response = await fetchApi.request<ResponseDetailSuccess<ResponseData> | ResponseFailure>({
    url: `/merchants/category/branding/${_id}`,
    method: 'DELETE',
  }).axiosPromise;

  if (isResponseError(response)) {
    throw new ServiceException(response.data.message, response.data);
  }
  return response.data as ResponseDetailSuccess<ResponseData>;
};
