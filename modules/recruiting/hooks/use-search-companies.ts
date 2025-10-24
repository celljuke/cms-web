import { trpc } from "@/lib/trpc/client";
import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

export function useSearchCompanies(initialQuery = "") {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  const debouncedSetQuery = useDebouncedCallback((value: string) => {
    setDebouncedQuery(value);
  }, 300);

  useEffect(() => {
    debouncedSetQuery(query);
  }, [query, debouncedSetQuery]);

  const { data, isLoading, isError } = trpc.recruiting.searchCompanies.useQuery(
    { query: debouncedQuery },
    {
      enabled: debouncedQuery.length >= 2,
    }
  );

  return {
    companies: data || [],
    isLoading,
    isError,
    query,
    setQuery,
  };
}
