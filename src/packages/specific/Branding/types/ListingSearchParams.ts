import { lisitngUrlSearchParamsUtils } from '../utils/listingUrlSearchParams';
import { GetTypeOfSearchParamsFromUrlParamsUtils } from '~/overrides/RemixJS/types';

export type ListingSearchParams = GetTypeOfSearchParamsFromUrlParamsUtils<typeof lisitngUrlSearchParamsUtils>;
