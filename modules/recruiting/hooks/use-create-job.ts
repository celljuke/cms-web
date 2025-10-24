import { trpc } from "@/lib/trpc/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useCreateJob() {
  const router = useRouter();
  const utils = trpc.useUtils();

  return trpc.recruiting.createJob.useMutation({
    onSuccess: (data) => {
      toast.success("Job created successfully!");
      utils.recruiting.getJobs.invalidate();
      router.push(`/recruiting/jobs/${data.id}`);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create job");
    },
  });
}
