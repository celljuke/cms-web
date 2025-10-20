"use client";

import { trpc } from "@/lib/trpc/client";

/**
 * Custom hook to fetch job detail by ID
 * Handles loading, error, and data states
 */
export function useJobDetail(jobId: number) {
  const { data, isLoading, error, refetch } = trpc.recruiting.getJobDetail.useQuery(
    { jobId },
    {
      enabled: !!jobId,
      refetchOnWindowFocus: false,
    }
  );

  return {
    job: data,
    isLoading,
    error,
    refetch,
  };
}

