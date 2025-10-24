"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Paperclip } from "lucide-react";
import { AttachmentItem } from "./attachment-item";
import type { JobAttachment } from "../../types";

interface AttachmentsListProps {
  attachments: JobAttachment[];
  isLoading: boolean;
}

export function AttachmentsList({
  attachments,
  isLoading,
}: AttachmentsListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4 shadow-none">
            <div className="flex items-center gap-4">
              <Skeleton className="w-12 h-12 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (attachments.length === 0) {
    return (
      <Card className="p-12 shadow-none">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
            <Paperclip className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            No attachments yet
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Attachments for this job will appear here once they are uploaded
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-2">
      {attachments.map((attachment) => (
        <AttachmentItem key={attachment.id} attachment={attachment} />
      ))}
    </div>
  );
}
