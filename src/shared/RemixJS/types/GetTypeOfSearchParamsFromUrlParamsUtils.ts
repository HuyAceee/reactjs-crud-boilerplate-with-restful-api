import { TypeOf } from 'zod';
import { GetGeneric } from '~/shared/TypescriptUtilities';
import { UrlSearchParamsUtils } from '~/shared/Utilities';

export type GetTypeOfSearchParamsFromUrlParamsUtils<T extends UrlSearchParamsUtils<any>> = TypeOf<
  // @ts-ignore
  GetGeneric<Exclude<T['_zodSchema'], undefined>>
>;
