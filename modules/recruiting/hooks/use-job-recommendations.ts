"use client";

import { trpc } from "@/lib/trpc/client";

export function useJobRecommendations(jobId: number, topK: number = 50) {
  return trpc.recruiting.getJobRecommendations.useQuery(
    { jobId, topK },
    {
      enabled: !!jobId,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
}
