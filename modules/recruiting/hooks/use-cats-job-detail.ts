"use client";

import { trpc } from "@/lib/trpc/client";

/**
 * Hook to fetch CATS job details
 */
export function useCatsJobDetail(jobId: number | null) {
  return trpc.recruiting.getCatsJobDetail.useQuery(
    { jobId: jobId! },
    {
      enabled: !!jobId,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    }
  );
}
