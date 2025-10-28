import { trpc } from "@/lib/trpc/client";

export function useJobSubmissions() {
  return trpc.recruiting.getJobSubmissions.useQuery();
}

export function useJobSubmission(jobId: number) {
  return trpc.recruiting.getJobSubmission.useQuery({ jobId });
}
