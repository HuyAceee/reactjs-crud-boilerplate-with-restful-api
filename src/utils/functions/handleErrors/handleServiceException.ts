import { RTHandleError } from './@types/RemixJsonFunction';
import { ServiceException } from '~/services/utils/ServiceException';
import { SimpleActionResponse } from '~/types/SimpleActionResponse';

export const handleServiceException = <Model = any>(
  error: ServiceException,
): RTHandleError<SimpleActionResponse<Model, undefined>> => {
  console.log('handleServiceException:: ', error);
  const response = error.cause;
  return [
    {
      message: `[ServiceException]: ${error}`,
      hasError: true,
      errorCode: response?.code,
      info: undefined,
    },
    { status: 400 },
  ];
};
