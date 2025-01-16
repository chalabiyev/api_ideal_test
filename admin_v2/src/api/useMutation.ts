import { useState } from 'react';

interface UseMutationOptions {
  method?: string;
  headers?: Record<string, string>;
}

const useMutation = (url: string, options?: UseMutationOptions) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  const mutate = async (body: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: options?.method || 'POST', // Default method: POST
        headers: {
          'Content-Type': 'application/json',
          ...(options?.headers || {}), // Merge additional headers
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const responseData = await response.json();
      setData(responseData);
      return responseData; // Return resolved data
    } catch (err) {
      setError(err);
      throw err; // Re-throw error for external handling
    } finally {
      setIsLoading(false);
    }
  };

  return {
    mutate,
    isLoading,
    error,
    data,
  };
};

export default useMutation;
