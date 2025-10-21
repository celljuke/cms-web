"use client";

import { trpc } from "@/lib/trpc/client";

/**
 * Custom hook to fetch job analytics and applicants
 * @param jobId - The job ID to fetch analytics for
 * @param enabled - Whether to enable the query (for lazy loading)
 */
export function useJobAnalytics(jobId: number, enabled: boolean = true) {
  const { data, isLoading, error, refetch } =
    trpc.recruiting.getJobAnalytics.useQuery(
      { jobId },
      {
        enabled: enabled && !!jobId,
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
