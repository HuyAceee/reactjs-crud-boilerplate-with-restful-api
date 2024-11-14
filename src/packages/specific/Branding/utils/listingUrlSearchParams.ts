import { number, object, string, enum as enum_ } from 'zod';
import { RecordsPerPage } from '../constants/RecordsPerPage';
import { UrlSearchParamsUtils } from '~/shared/Utilities';

export const lisitngUrlSearchParamsSchema = object({
  page: number().optional(),
  search: string().optional(),
  pageSize: number().optional().default(RecordsPerPage),
  status: enum_(['ACTIVE', 'DEACTIVE']).optional(),
  brandingCode: enum_(['descend', 'ascend']).optional(),
});

export const lisitngUrlSearchParamsUtils = new UrlSearchParamsUtils({
  zodSchema: lisitngUrlSearchParamsSchema,
});
