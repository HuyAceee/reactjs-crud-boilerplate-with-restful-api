import type { RTHandleError } from './@types/RemixJsonFunction';
import { SimpleActionResponse } from '~/types/SimpleActionResponse';

export const handleNativeError = <Model = any>(error: Error): RTHandleError<SimpleActionResponse<Model, undefined>> => {
  console.log('handleNativeError:: ', error);
  return [
    {
      message: `[NativeError]: ${error}`,
      hasError: true,
      info: undefined,
    },
    { status: 400 },
  ];
};
