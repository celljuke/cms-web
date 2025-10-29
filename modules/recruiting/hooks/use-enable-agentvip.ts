"use client";

import { trpc } from "@/lib/trpc/client";
import { toast } from "sonner";
import type { EnableAgentVIPPayload } from "../types";

/**
 * Hook to enable AgentVIP on a job
 */
export function useEnableAgentVIP() {
  const utils = trpc.useUtils();

  const mutation = trpc.recruiting.enableAgentVIP.useMutation({
    onSuccess: () => {
      toast.success("AgentVIP enabled successfully", {
        description: "The job is now active and ready for candidates",
      });
      // Invalidate queries to refresh the lists
      utils.recruiting.getJobSubmissions.invalidate();
      utils.recruiting.getJobs.invalidate();
    },
    onError: (error) => {
      toast.error("Failed to enable AgentVIP", {
        description: error.message,
      });
    },
  });

  const enableAgentVIP = (payload: EnableAgentVIPPayload) => {
    return mutation.mutateAsync(payload as any);
  };

  return {
    enableAgentVIP,
    isEnabling: mutation.isPending,
  };
}
