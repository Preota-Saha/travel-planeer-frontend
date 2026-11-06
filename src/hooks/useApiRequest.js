// Tiny reusable data-fetching hook. No caching, no retries.
// Usage:
//   const { data, loading, error, refetch } = useApiRequest(getCategories, []);
//   const { data } = useApiRequest(() => getPlace(slug), [slug]);

import { useEffect, useState, useCallback } from 'react';

export default function useApiRequest(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const run = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      setData(result);
    } catch (err) {
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    run();
  }, [run]);

  return { data, loading, error, refetch: run };
}