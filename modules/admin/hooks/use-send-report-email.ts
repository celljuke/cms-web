"use client";

import { trpc } from "@/lib/trpc/client";
import { toast } from "sonner";
import type { TimeFilter } from "../types";

/**
 * Hook to send weekly report via email
 */
export function useSendReportEmail() {
  const mutation = trpc.recruiting.sendWeeklyReportEmail.useMutation({
    onSuccess: (data) => {
      toast.success("Report sent successfully", {
        description: data.message || "The report has been emailed",
      });
    },
    onError: (error) => {
      toast.error("Failed to send report", {
        description: error.message,
      });
    },
  });

  const sendReport = (
    weeksBack: number,
    timeFilter: TimeFilter,
    recipients: string[]
  ) => {
    return mutation.mutateAsync({ weeksBack, timeFilter, recipients });
  };

  return {
    sendReport,
    isSending: mutation.isPending,
  };
}
