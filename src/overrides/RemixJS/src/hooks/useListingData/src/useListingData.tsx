import { isEmpty } from 'ramda';
import { useEffect, useMemo, useState } from 'react';
import { SimpleListingResponse } from '../../../types/SimpleListingResponse';
import { useFetcher, useSearchParams } from '~/overrides/remix';
import { notification } from '~/shared/ReactJS';
import { AnyRecord } from '~/shared/TypescriptUtilities';

interface UseListingData<T extends AnyRecord> {
  loaderData: SimpleListingResponse<T> | undefined;
  fetcherData: {
    data: SimpleListingResponse<T> | undefined;
    state: ReturnType<typeof useFetcher>['state'];
  };
  getNearestPageAvailable: (page: number) => void;
}

export const useListingData = <Model extends AnyRecord>({
  loaderData,
  fetcherData,
  getNearestPageAvailable,
}: UseListingData<Model>): {
  data: SimpleListingResponse<Model> | undefined;
  isFetchingList: boolean;
} => {
  const [data, setData] = useState(loaderData);
  const [currentSearchParams] = useSearchParams();

  const isFetchingList = useMemo(() => {
    return !data || fetcherData.state === 'loading' || fetcherData.state === 'submitting';
  }, [data, fetcherData.state]);

  useEffect(() => {
    if (fetcherData.data) {
      if (
        isEmpty(fetcherData.data.info.hits) &&
        !!currentSearchParams.get('page') &&
        currentSearchParams.get('page') !== fetcherData.data.page.toString()
      ) {
        getNearestPageAvailable(fetcherData.data.page);
      } else {
        setData(fetcherData.data);
      }
      if (typeof fetcherData.data.toastMessageError === 'string') {
        notification.error({
          message: fetcherData.data?.toastMessageError,
          description: '',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcherData.data]);

  useEffect(() => {
    if (loaderData) {
      if (
        isEmpty(loaderData.info.hits) &&
        !!currentSearchParams.get('page') &&
        currentSearchParams.get('page') !== loaderData.page.toString()
      ) {
        getNearestPageAvailable(loaderData.page);
      } else {
        setData(loaderData);
      }
    }
    if (loaderData?.toastMessageError) {
      notification.error({
        message: loaderData.toastMessageError,
        description: '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaderData]);

  return {
    data,
    isFetchingList,
  };
};
