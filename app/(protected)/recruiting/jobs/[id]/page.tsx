import { JobDetail } from "@/modules/recruiting/components/job-detail";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function RecruitingJobDetailPage({ params }: PageProps) {
  const { id } = await params;
  const jobId = parseInt(id, 10);

  return <JobDetail jobId={jobId} />;
}
