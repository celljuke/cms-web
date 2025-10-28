import { trpc } from "@/lib/trpc/client";
import { useJobSubmissions } from "./use-job-submissions";

export function useDashboardData() {
  // Fetch jobs
  const {
    data: jobs,
    isLoading: isJobsLoading,
    error: jobsError,
  } = trpc.recruiting.getJobs.useQuery();

  // Fetch draft jobs
  const {
    data: draftJobs,
    isLoading: isDraftJobsLoading,
    error: draftJobsError,
  } = useJobSubmissions();

  // Fetch latest candidates
  const {
    data: candidatesData,
    isLoading: isCandidatesLoading,
    error: candidatesError,
  } = trpc.recruiting.getLatestCandidates.useQuery({
    limit: 50,
    windowDays: 2,
  });

  // Calculate stats
  const stats = {
    total: jobs?.length || 0,
    active:
      jobs?.filter((job) => job.is_active && job.status === "Active").length ||
      0,
    drafts: draftJobs?.length || 0,
    candidates: candidatesData?.candidates?.length || 0,
  };

  return {
    jobs,
    draftJobs,
    candidatesData,
    stats,
    isLoading: isJobsLoading || isDraftJobsLoading || isCandidatesLoading,
    isJobsLoading,
    isDraftJobsLoading,
    isCandidatesLoading,
    error: jobsError || draftJobsError || candidatesError,
  };
}
