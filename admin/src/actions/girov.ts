import type { IGirovItem } from 'src/types/girov';

import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

// ----------------------------------------------------------------------

type GirovsData = {
  girovs: IGirovItem[];
  // for now
  products: IGirovItem[];
};

export function useGetGirovs() {
  const url = endpoints.girov.list;

  const { data, isLoading, error, isValidating } = useSWR<GirovsData>(url, fetcher, swrOptions);
  const memoizedValue = useMemo(
    () => ({
      girovs: data?.products || [],
      girovsLoading: isLoading,
      girovsError: error,
      girovsValidating: isValidating,
      girovsEmpty: !isLoading && !data?.products?.length,
    }),
    [data?.products, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

type GirovData = {
  girov: IGirovItem;
};

export function useGetGirov(girovId: string) {
  const url = girovId ? [endpoints.girov.details, { params: { girovId } }] : '';

  const { data, isLoading, error, isValidating } = useSWR<GirovData>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      girov: data?.girov,
      girovLoading: isLoading,
      girovError: error,
      girovValidating: isValidating,
    }),
    [data?.girov, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

type SearchResultsData = {
  results: IGirovItem[];
};

export function useSearchGirovs(query: string) {
  const url = query ? [endpoints.girov.search, { params: { query } }] : '';

  const { data, isLoading, error, isValidating } = useSWR<SearchResultsData>(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.results || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !data?.results.length,
    }),
    [data?.results, error, isLoading, isValidating]
  );

  return memoizedValue;
}
