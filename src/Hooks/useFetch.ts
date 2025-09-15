import { useEffect, useState, useCallback } from "react";

export default function useFetch<T>(url:string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    try {
        setIsLoading(true)
        setError(null)
      const response = await fetch(url);
      if (!response.ok) throw new Error("error fetching data");
      const result = await response.json();
      setData(result.products);
    } catch (error:unknown) {
      if(error instanceof Error){
        setError(error.message);
      }else{
        setError(String(error))
      }
    } finally {
      setIsLoading(false);
    }
  }, [url]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, isLoading} as const
}
