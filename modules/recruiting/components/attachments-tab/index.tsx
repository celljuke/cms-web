"use client";

import { useJobAttachments } from "../../hooks/use-job-attachments";
import { AttachmentsStats } from "./attachments-stats";
import { AttachmentsList } from "./attachments-list";

interface AttachmentsTabProps {
  jobId: number;
}

export function AttachmentsTab({ jobId }: AttachmentsTabProps) {
  const { attachments, isLoading } = useJobAttachments(jobId);

  return (
    <div className="space-y-6">
      {/* Stats */}
      {!isLoading && attachments.length > 0 && (
        <AttachmentsStats attachments={attachments} />
      )}

      {/* Attachments List */}
      <AttachmentsList attachments={attachments} isLoading={isLoading} />
    </div>
  );
}
