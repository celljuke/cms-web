"use client";

import { trpc } from "@/lib/trpc/client";

/**
 * Hook for fetching job attachments
 */
export function useJobAttachments(jobId: number, isCatId: boolean = true) {
  const {
    data: attachmentsData,
    isLoading,
    error,
  } = trpc.recruiting.getJobAttachments.useQuery(
    { jobId, isCatId },
    {
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
      enabled: !!jobId,
    }
  );

  return {
    attachments: attachmentsData?.attachments || [],
    isLoading,
    error,
  };
}
