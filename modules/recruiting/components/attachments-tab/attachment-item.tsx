"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText,
  FileImage,
  FileSpreadsheet,
  File,
  Download,
  ExternalLink,
  Clock,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import type { JobAttachment } from "../../types";

interface AttachmentItemProps {
  attachment: JobAttachment;
}

const getFileIcon = (filename: string) => {
  const ext = filename.split(".").pop()?.toLowerCase();

  switch (ext) {
    case "pdf":
    case "doc":
    case "docx":
    case "txt":
      return FileText;
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "svg":
      return FileImage;
    case "xls":
    case "xlsx":
    case "csv":
      return FileSpreadsheet;
    default:
      return File;
  }
};

const getFileColor = (filename: string) => {
  const ext = filename.split(".").pop()?.toLowerCase();

  switch (ext) {
    case "pdf":
      return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950";
    case "doc":
    case "docx":
      return "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950";
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950";
    case "xls":
    case "xlsx":
    case "csv":
      return "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950";
    default:
      return "text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900";
  }
};

const getFileExtension = (filename: string) => {
  return filename.split(".").pop()?.toUpperCase() || "FILE";
};

export function AttachmentItem({ attachment }: AttachmentItemProps) {
  const Icon = getFileIcon(attachment.filename);
  const colorClass = getFileColor(attachment.filename);
  const extension = getFileExtension(attachment.filename);

  const handleDownload = () => {
    // Implement download logic
    console.log("Download:", attachment.id);
  };

  const handleView = () => {
    // Implement view logic
    console.log("View:", attachment.id);
  };

  return (
    <Card className="p-4 shadow-none hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors group">
      <div className="flex items-center gap-4">
        {/* File Icon */}
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClass}`}
        >
          <Icon className="w-6 h-6" />
        </div>

        {/* File Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate group-hover:text-primary transition-colors">
                {attachment.filename}
              </h4>
              <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                <Badge variant="outline" className="text-xs font-mono">
                  {extension}
                </Badge>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>
                    {formatDistanceToNow(new Date(attachment.created), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <span className="hidden sm:inline">
                  {format(new Date(attachment.created), "MMM d, yyyy")}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleView}
                className="h-8 w-8 p-0"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="sr-only">View</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDownload}
                className="h-8 w-8 p-0"
              >
                <Download className="h-4 w-4" />
                <span className="sr-only">Download</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
