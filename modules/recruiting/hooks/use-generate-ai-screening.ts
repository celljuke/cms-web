"use client";

import { trpc } from "@/lib/trpc/client";
import { toast } from "sonner";

/**
 * Hook to generate AI screening email and criteria
 */
export function useGenerateAIScreening() {
  const mutation = trpc.recruiting.generateAIScreening.useMutation({
    onError: (error) => {
      toast.error("Failed to generate AI screening", {
        description: error.message,
      });
    },
  });

  const generateScreening = (jobDescription: string, jobName: string) => {
    return mutation.mutateAsync({ jobDescription, jobName });
  };

  return {
    generateScreening,
    isGenerating: mutation.isPending,
  };
}
