"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  AlertCircle,
  FileText,
  MessageCircle,
  Mail,
  User,
  Clock,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import type { JobActivity } from "../../types";

interface ActivityItemProps {
  activity: JobActivity;
}

const getActivityIcon = (type: string, annotation: string | null) => {
  if (annotation?.toLowerCase().includes("status change")) {
    return AlertCircle;
  }
  if (annotation?.toLowerCase().includes("applied")) {
    return FileText;
  }
  if (type === "email") {
    return Mail;
  }
  if (type === "other") {
    return Activity;
  }
  return MessageCircle;
};

const getActivityColor = (annotation: string | null) => {
  if (!annotation) return "text-gray-600 dark:text-gray-400";

  const lower = annotation.toLowerCase();
  if (lower.includes("applied") || lower.includes("submitted")) {
    return "text-blue-600 dark:text-blue-400";
  }
  if (lower.includes("contacted") || lower.includes("attempt")) {
    return "text-purple-600 dark:text-purple-400";
  }
  if (lower.includes("qualified") || lower.includes("interviewed")) {
    return "text-green-600 dark:text-green-400";
  }
  if (lower.includes("not in consideration") || lower.includes("rejected")) {
    return "text-red-600 dark:text-red-400";
  }
  return "text-gray-600 dark:text-gray-400";
};

const getActivityBadgeVariant = (annotation: string | null) => {
  if (!annotation) return "secondary" as const;

  const lower = annotation.toLowerCase();
  if (lower.includes("applied") || lower.includes("submitted")) {
    return "default" as const;
  }
  if (lower.includes("contacted") || lower.includes("attempt")) {
    return "secondary" as const;
  }
  if (lower.includes("qualified") || lower.includes("interviewed")) {
    return "default" as const;
  }
  if (lower.includes("not in consideration") || lower.includes("rejected")) {
    return "destructive" as const;
  }
  return "secondary" as const;
};

export function ActivityItem({ activity }: ActivityItemProps) {
  const Icon = getActivityIcon(activity.type, activity.annotation);
  const colorClass = getActivityColor(activity.annotation);
  const badgeVariant = getActivityBadgeVariant(activity.annotation);

  // Extract candidate name from notes if it's an AI-generated note
  const getCandidateName = () => {
    if (activity.annotation?.includes("Applied through")) {
      return `Candidate #${activity.data_item.id}`;
    }
    return null;
  };

  const candidateName = getCandidateName();

  return (
    <Card className="p-4 shadow-none">
      <div className="space-y-3">
        {/* Header Row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {/* Icon */}
            <div
              className={`w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 ${colorClass}`}
            >
              <Icon className="w-4 h-4" />
            </div>

            {/* Title Area */}
            <div className="flex-1 min-w-0 space-y-1">
              {activity.annotation && (
                <Badge variant={badgeVariant} className="text-xs">
                  {activity.annotation}
                </Badge>
              )}
              {candidateName && (
                <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                  <User className="w-3.5 h-3.5" />
                  <span>{candidateName}</span>
                </div>
              )}
            </div>
          </div>

          {/* Time Badge */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground flex-shrink-0">
            <Clock className="w-3.5 h-3.5" />
            <span className="font-medium">
              {formatDistanceToNow(new Date(activity.date), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>

        {/* Notes */}
        {activity.notes && (
          <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed pl-12">
            {activity.notes}
          </div>
        )}

        {/* Footer Meta */}
        <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground pl-12">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-xs capitalize">
              {activity.type}
            </Badge>
            <span>Candidate ID: {activity.data_item.id}</span>
          </div>
          <span className="text-[11px]">
            {format(new Date(activity.date), "MMM d, h:mm a")}
          </span>
        </div>
      </div>
    </Card>
  );
}
