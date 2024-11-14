import type { TFunction } from 'i18next';
import type { SerializeFrom } from '~/overrides/remix';
import { StatusCodeMappingToString } from '~/services/constants/StringMappingToStatusCode';
import { SimpleActionResponse } from '~/types/SimpleActionResponse';

export const handleGetMessageToToast = (
  t: TFunction<any[]>,
  actionResponse: SimpleActionResponse<any, any> | SerializeFrom<SimpleActionResponse<any, any>>,
) => {
  const { hasError, errorCode } = actionResponse;
  if (!hasError) {
    return undefined;
  }
  if (errorCode) {
    return t(`error_message:${StatusCodeMappingToString[errorCode]}`);
  }
  return t(`error_message:UNKNOWN`);
};
