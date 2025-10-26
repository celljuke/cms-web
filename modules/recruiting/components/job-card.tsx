"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Briefcase,
  MapPin,
  Clock,
  User,
  ExternalLink,
  Play,
  Pause,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Job } from "../types";
import { useUpdateJob } from "../hooks/use-update-job";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const router = useRouter();
  const updateJob = useUpdateJob();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleCardClick = () => {
    router.push(`/recruiting/jobs/${job.job_id}`);
  };

  const handleViewInCats = (e: React.MouseEvent) => {
    e.stopPropagation();
    const catsUrl = `https://match.catsone.com/index.php?m=jobs&a=show&jobOrderID=${job.job_id}`;
    window.open(catsUrl, "_blank");
  };

  const handleToggleActive = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isUpdating) return;

    setIsUpdating(true);
    try {
      // API requires the full job object
      await updateJob.mutateAsync({
        jobId: job.job_id,
        data: {
          ...job,
          is_active: job.is_active ? 0 : 1,
        },
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusColor = (status: string | null, isActive: number) => {
    if (!isActive) return "bg-gray-500/10 text-gray-700 dark:text-gray-300";

    switch (status) {
      case "Active":
        return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "OnHold":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
      case "Closed":
        return "bg-red-500/10 text-red-700 dark:text-red-400";
      default:
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400";
    }
  };

  const getIconGradient = (status: string | null, isActive: number) => {
    if (!isActive) return "from-gray-400 to-gray-500";

    switch (status) {
      case "Active":
        return "from-green-500 to-emerald-600";
      case "OnHold":
        return "from-yellow-500 to-orange-500";
      case "Closed":
        return "from-red-500 to-rose-600";
      default:
        return "from-blue-500 to-cyan-500";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const stripHtml = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  return (
    <Card
      className="group h-full shadow-none hover:shadow-lg transition-all duration-300 hover:border-blue-500/50 dark:hover:border-blue-800/50 py-2 cursor-pointer relative"
      onClick={isUpdating ? undefined : handleCardClick}
    >
      {/* Loading Overlay */}
      {isUpdating && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 rounded-lg flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm font-medium text-muted-foreground">
              Updating job...
            </p>
          </div>
        </div>
      )}

      <CardContent className="p-4 h-full flex flex-col">
        {/* Header with Status */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`h-10 w-10 rounded-lg bg-gradient-to-br ${getIconGradient(
                job.status,
                job.is_active
              )} flex items-center justify-center text-white shrink-0 transition-colors duration-300`}
            >
              <Briefcase className="h-5 w-5" />
            </div>
            <Badge
              className={`${getStatusColor(
                job.status,
                job.is_active
              )} border-0`}
            >
              {job.is_active ? job.status || "Active" : "Inactive"}
            </Badge>
          </div>
        </div>

        {/* Job Title */}
        <h3 className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors min-h-[3rem]">
          {job.display_name}
        </h3>

        {/* Job ID */}
        <p className="text-xs text-muted-foreground mb-3">ID: {job.job_id}</p>

        {/* Description */}
        {job.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
            {truncateText(stripHtml(job.description), 120)}
          </p>
        )}

        {/* Location */}
        {job.location && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{job.location}</span>
          </div>
        )}

        {/* Footer with Metadata */}
        <div className="pt-3 border-t mt-auto space-y-2">
          <div className="flex items-center justify-between text-xs">
            {job.updated_at && (
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="h-3.5 w-3.5 shrink-0" />
                <span>{new Date(job.updated_at).toLocaleDateString()}</span>
              </div>
            )}
            {job.assigned_user && (
              <div className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                <span className="text-muted-foreground truncate max-w-[120px]">
                  {job.assigned_user.name}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Actions - Always visible */}
        <TooltipProvider>
          <div className="flex items-center gap-2 mt-4 pt-3 border-t">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-1.5"
                  onClick={handleViewInCats}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  View in CATS
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Open job in CATS ATS system</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleToggleActive}
                  disabled={isUpdating}
                >
                  {job.is_active ? (
                    <Pause className="h-3.5 w-3.5" />
                  ) : (
                    <Play className="h-3.5 w-3.5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{job.is_active ? "Pause this job" : "Activate this job"}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
