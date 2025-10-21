"use client";

import { trpc } from "@/lib/trpc/client";

/**
 * Custom hook to fetch job analytics and applicants
 */
export function useJobAnalytics(jobId: number) {
  const { data, isLoading, error, refetch } = trpc.recruiting.getJobAnalytics.useQuery(
    { jobId },
    {
      enabled: !!jobId,
      refetchOnWindowFocus: false,
    }
  );

  return {
    analytics: data?.analytics,
    applicants: data?.applicants || [],
    isLoading,
    error,
    refetch,
  };
}

