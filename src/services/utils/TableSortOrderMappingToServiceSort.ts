import { OrderSorter } from '../types/SearchParams';
import { TableSortOrder } from '~/shared/ReactJS';

export const getTableSortOrderMappingToServiceSort = (order: TableSortOrder): OrderSorter => {
  if (order === 'ascend') {
    return 'asc';
  }
  if (order === 'descend') {
    return 'desc';
  }
  return undefined;
};
