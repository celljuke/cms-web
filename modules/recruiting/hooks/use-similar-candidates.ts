"use client";

import { trpc } from "@/lib/trpc/client";

export function useSimilarCandidates(
  candidateId: string,
  topK: number = 50,
  enabled: boolean = false
) {
  return trpc.recruiting.getSimilarCandidates.useQuery(
    { candidateId, topK },
    {
      enabled: enabled && !!candidateId,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
}
