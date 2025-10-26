import { trpc } from "@/lib/trpc/client";
import { toast } from "sonner";
import type { Job } from "../types";

export function useUpdateJob() {
  const utils = trpc.useUtils();

  const mutation = trpc.recruiting.updateJob.useMutation({
    onSuccess: (updatedJob: Job) => {
      // Update the cache directly with the returned job object
      utils.recruiting.getJobs.setData(undefined, (oldData) => {
        if (!oldData) return oldData;

        // Replace the updated job in the list
        return oldData.map((job) =>
          job.job_id === updatedJob.job_id ? updatedJob : job
        );
      });

      toast.success("Job updated successfully");
    },
    onError: (error) => {
      toast.error(`Failed to update job: ${error.message}`);
    },
  });

  return mutation;
}
