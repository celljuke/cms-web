"use client";

import { trpc } from "@/lib/trpc/client";

/**
 * Hook for fetching assigned jobs
 */
export function useAssignedJobs() {
  const {
    data: jobs,
    isLoading,
    error,
  } = trpc.profile.getAssignedJobs.useQuery(undefined, {
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    jobs: jobs || [],
    isLoading,
    error,
  };
}
