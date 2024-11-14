import { useCallback, useEffect, useState } from 'react';
import { useFetcher, useLoaderData } from '~/overrides/remix';
import { DeepAwaited } from '~/shared/TypescriptUtilities';
import { deepAwaited } from '~/shared/Utilities';

interface UseDeferData<T extends ReturnType<typeof useLoaderData>> {
  loaderData: T;
}

export const useDeferData = <T extends ReturnType<typeof useLoaderData>>({
  loaderData,
}: UseDeferData<T>): {
  data: DeepAwaited<T> | undefined;
  fetcherData: ReturnType<typeof useFetcher<DeepAwaited<T>>>;
  isError: boolean;
} => {
  const [data, setData] = useState<DeepAwaited<T> | undefined>(undefined);
  const [isError, setIsError] = useState(false);
  const fetcherData = useFetcher() as ReturnType<typeof useFetcher<DeepAwaited<T>>>;

  const handleGetData = useCallback(async () => {
    setIsError(false);
    try {
      const data = await deepAwaited(loaderData);
      setData(data);
    } catch (error) {
      console.log('useDeferData:: ', error);
      const isAborted = error instanceof Error && error.message.includes('Deferred data aborted');
      setIsError(isAborted ? false : true);
    }
  }, [loaderData]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  return {
    data,
    fetcherData,
    isError,
  };
};
