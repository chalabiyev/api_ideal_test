import type { IChannelItem } from 'src/types/channel';

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

type ChannelsData = {
  channels: IChannelItem[];
  // for now
  products: IChannelItem[];
};

export function useGetChannels() {
  const url = endpoints.channel.list;

  const { data, isLoading, error, isValidating } = useSWR<ChannelsData>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      channels: data?.products || [],
      channelsLoading: isLoading,
      channelsError: error,
      channelsValidating: isValidating,
      channelsEmpty: !isLoading && !data?.products,
    }),
    [data?.products, error, isLoading, isValidating]
  );

  return memoizedValue;

}

// ----------------------------------------------------------------------

type ChannelData = {
  channel: IChannelItem;
  // for now
  product: IChannelItem;
};

export function useGetChannel(channelId: string) {
  const url = channelId ? [endpoints.product.details, { params: { channelId } }] : '';

  const { data, isLoading, error, isValidating } = useSWR<ChannelData>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      channel: data?.channel,
      channelLoading: isLoading,
      channelError: error,
      channelValidating: isValidating,
    }),
    [data?.channel, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

type SearchResultsData = {
  results: IChannelItem[];
};

export function useSearchChannels(query: string) {
  const url = query ? [endpoints.channel.search, { params: { query } }] : '';

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
