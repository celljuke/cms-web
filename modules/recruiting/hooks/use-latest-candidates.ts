"use client";

import { trpc } from "@/lib/trpc/client";

export function useLatestCandidates(
  limit: number = 50,
  windowDays: number = 2
) {
  return trpc.recruiting.getLatestCandidates.useQuery(
    { limit, windowDays },
    {
      staleTime: 2 * 60 * 1000, // 2 minutes
      refetchInterval: 5 * 60 * 1000, // Auto-refresh every 5 minutes
    }
  );
}
