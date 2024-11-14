import { Branding } from '../models/Branding';
import { CreateBranding } from './createBranding';
import { ActionFunctionArgs, LoaderFunctionArgs } from '~/overrides/remix';
import { ResponseDetailSuccess, ResponseFailure } from '~/services/types/Response';
import { getFetchApiInstance } from '~/services/utils/getFetchApiInstance';
import { isResponseError } from '~/services/utils/isResponseError';
import { ServiceException } from '~/services/utils/ServiceException';

export interface UpdateBranding {
  remixRequest?: LoaderFunctionArgs | ActionFunctionArgs;
  data: CreateBranding['data'] & {
    _id: Branding['_id'];
  };
}

interface ResponseData {}

export const updateBranding = async ({ remixRequest, data }: UpdateBranding) => {
  const fetchApi = await getFetchApiInstance(remixRequest);

  const response = await fetchApi.request<ResponseDetailSuccess<ResponseData> | ResponseFailure>({
    url: `/merchants/category/branding/${data._id}`,
    method: 'PUT',
    data,
  }).axiosPromise;

  if (isResponseError(response)) {
    throw new ServiceException(response.data.message, response.data);
  }
  return response.data as ResponseDetailSuccess<ResponseData>;
};
