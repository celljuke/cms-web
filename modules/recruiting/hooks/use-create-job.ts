import { trpc } from "@/lib/trpc/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useCreateJob() {
  const router = useRouter();
  const utils = trpc.useUtils();

  return trpc.recruiting.createJob.useMutation({
    onSuccess: (data) => {
      toast.success("Job created successfully!");
      // Invalidate job submissions (drafts) cache
      utils.recruiting.getJobSubmissions.invalidate();
      // Redirect to recruiting dashboard with drafts tab active
      router.push("/recruiting?tab=drafts");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create job");
    },
  });
}
