import { useFetcher, useLoaderData } from '@remix-run/react';
import { useCallback, useEffect, useState } from 'react';
import { DeepAwaited } from '~/shared/TypescriptUtilities';
import { deepAwaited } from '~/shared/Utilities';

interface UseDeferData<T extends ReturnType<typeof useLoaderData>> {
  /**
   * The initial data loaded by the loader function, typically used in server-side rendering or during the initial page load.
   */
  loaderData: T;
}

/**
 * Custom hook to handle deferred loading and fetching of data. This hook is useful in cases where data is loaded in stages
 * or fetched on-demand, and it provides a mechanism to manage this data and any associated errors.
 *
 * @template T - The type of data returned by the loader and subsequently handled by this hook.
 * @param {UseDeferData<T>} params - Parameters required for this hook.
 * @param {T} params.loaderData - The data initially loaded, often via server-side rendering.
 * @returns {Object} - An object containing the deferred data, fetcher data, and an error flag.
 * @returns {DeepAwaited<T> | undefined} returns.data - The deferred data, which could still be loading, hence the `undefined` type.
 * @returns {ReturnType<typeof useFetcher<DeepAwaited<T>>>} returns.fetcherData - The fetcher object that manages fetching additional or updated data.
 * @returns {boolean} returns.isError - A boolean flag indicating whether an error occurred during the fetching process.
 */
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
