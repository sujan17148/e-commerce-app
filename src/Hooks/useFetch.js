import { useEffect, useState, useCallback } from "react";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
        setIsLoading(true)
        setError(null)
      const response = await fetch(url);
      if (!response.ok) throw new Error("error fetching data");
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [url]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, isLoading };
}
