import useSWR from 'swr';

const fetcher = (url: string) =>
  fetch(url, { method: 'GET' }).then((res) => res.json());

export const useMqttData = () => {
  const { data, error } = useSWR('/api/temperature', fetcher, {
    refreshInterval: 2000, // Poll every 2 seconds
  });

  return {
    data: data ? data.message : null,
    isLoading: !error && !data,
    isError: error,
  };
};
