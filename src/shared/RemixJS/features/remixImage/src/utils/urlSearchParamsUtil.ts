import { transformOptions } from './transformOptionsSchema';
import { UrlSearchParamsUtils } from '~/shared/Utilities';

export const urlSearchParamsUtil = new UrlSearchParamsUtils({
  zodSchema: transformOptions,
});
