"use client";

import { Paperclip, FileText, FileImage, File } from "lucide-react";
import type { JobAttachment } from "../../types";

interface AttachmentsStatsProps {
  attachments: JobAttachment[];
}

export function AttachmentsStats({ attachments }: AttachmentsStatsProps) {
  const stats = {
    total: attachments.length,
    documents: attachments.filter((a) =>
      /\.(pdf|doc|docx|txt)$/i.test(a.filename)
    ).length,
    images: attachments.filter((a) =>
      /\.(jpg|jpeg|png|gif|svg)$/i.test(a.filename)
    ).length,
    other: attachments.filter(
      (a) => !/\.(pdf|doc|docx|txt|jpg|jpeg|png|gif|svg)$/i.test(a.filename)
    ).length,
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Paperclip className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Files</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <FileText className="h-6 w-6 text-purple-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Documents</p>
            <p className="text-2xl font-bold">{stats.documents}</p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
            <FileImage className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Images</p>
            <p className="text-2xl font-bold">{stats.images}</p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-gray-500/10 flex items-center justify-center">
            <File className="h-6 w-6 text-gray-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Other</p>
            <p className="text-2xl font-bold">{stats.other}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
