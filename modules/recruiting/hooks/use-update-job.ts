import { trpc } from "@/lib/trpc/client";
import { toast } from "sonner";

export function useUpdateJob() {
  const utils = trpc.useUtils();

  const mutation = trpc.recruiting.updateJob.useMutation({
    onSuccess: async () => {
      // Invalidate jobs list and wait for refetch to complete
      await utils.recruiting.getJobs.invalidate();
      toast.success("Job updated successfully");
    },
    onError: (error) => {
      toast.error(`Failed to update job: ${error.message}`);
    },
  });

  return mutation;
}
