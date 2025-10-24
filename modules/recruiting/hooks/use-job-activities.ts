"use client";

import { trpc } from "@/lib/trpc/client";

/**
 * Hook for fetching job activities
 */
export function useJobActivities(jobId: number) {
  const {
    data: activitiesData,
    isLoading,
    error,
  } = trpc.recruiting.getJobActivities.useQuery(
    { jobId },
    {
      retry: 1,
      staleTime: 1000 * 60 * 2, // 2 minutes
      enabled: !!jobId,
    }
  );

  return {
    activities: activitiesData?.activities || [],
    isLoading,
    error,
  };
}
