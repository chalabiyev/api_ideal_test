import { Language } from 'src/types/types';
import { useEffect, useState, useCallback } from 'react';
import request from './request';

const useApi = (endpoint: string, language: Language = Language.AZ) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [hasData, setHasData] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    if (!endpoint) return;
    setLoading(true);
    try {
      const response = await request.get(endpoint, {
        headers: {
          'Accept-Language': language,
        },
      });
      const responseData = response.data;
      setData(responseData);
      setHasData(!!responseData && Object.keys(responseData).length > 0);
    } catch (err) {
      setError(err);
      setHasData(false);
    } finally {
      setLoading(false);
    }
  }, [endpoint, language]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, hasData, loading, refetch: fetchData };
};

export default useApi;
