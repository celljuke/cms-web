"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/ui/user-avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Briefcase,
  Clock,
  User,
  ExternalLink,
  Play,
  Pause,
  Loader2,
  Flame,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Job } from "../types";
import { useUpdateJob } from "../hooks/use-update-job";

interface JobListItemProps {
  job: Job;
  isDraft?: boolean;
  catsJobId?: number | null;
  onEnableAgentVIP?: (jobId: number, jobTitle: string) => void;
}

export function JobListItem({
  job,
  isDraft,
  catsJobId,
  onEnableAgentVIP,
}: JobListItemProps) {
  const router = useRouter();
  const updateJob = useUpdateJob();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleRowClick = () => {
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
      const newIsActive = job.is_active ? 0 : 1;

      // API requires the full job object
      await updateJob.mutateAsync({
        jobId: job.job_id,
        data: {
          ...job,
          is_active: newIsActive,
          status: newIsActive === 1 ? "Active" : "",
          status_id: newIsActive === 1 ? 47864 : null,
        },
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusColor = (status: string | null, isActive: number) => {
    // Check for Draft status first
    if (status === "Draft") {
      return "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400";
    }

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
    // Check for Draft status first
    if (status === "Draft") {
      return "from-cyan-400 to-teal-500";
    }

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

  return (
    <div
      className="group p-3 md:p-4 rounded-lg border bg-card hover:shadow-md hover:border-blue-500/50 dark:hover:border-blue-800/50 transition-all duration-300 cursor-pointer relative"
      onClick={isUpdating ? undefined : handleRowClick}
    >
      {/* Loading Overlay */}
      {isUpdating && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 rounded-lg flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 md:h-5 md:w-5 animate-spin text-primary" />
            <p className="text-xs md:text-sm font-medium text-muted-foreground">
              Updating...
            </p>
          </div>
        </div>
      )}

      {/* Mobile Layout */}
      <div className="flex md:hidden flex-col gap-3">
        {/* Header Row */}
        <div className="flex items-start gap-3">
          <div
            className={`h-10 w-10 rounded-lg bg-gradient-to-br ${getIconGradient(
              job.status,
              job.is_active
            )} flex items-center justify-center text-white shrink-0`}
          >
            <Briefcase className="h-5 w-5" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors flex-1">
                {job.display_name}
              </h3>
              {job.is_hot === 1 && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-center h-6 w-6 rounded-full bg-orange-500/10 shrink-0">
                        <Flame className="h-3 w-3 text-orange-500" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Hot Job</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <p className="text-xs text-muted-foreground">ID: {job.job_id}</p>
          </div>

          <Badge
            className={`${getStatusColor(
              job.status,
              job.is_active
            )} border-0 text-[10px] whitespace-nowrap shrink-0`}
          >
            {job.status === "Draft"
              ? "Draft"
              : job.is_active
              ? job.status || "Active"
              : "Inactive"}
          </Badge>
        </div>

        {/* Info Row */}
        <div className="flex items-center justify-between text-xs">
          {job.updated_at && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="h-3 w-3 shrink-0" />
              <span>{new Date(job.updated_at).toLocaleDateString()}</span>
            </div>
          )}
          {job.assigned_user && (
            <UserAvatar name={job.assigned_user.name} size="sm" />
          )}
        </div>

        {/* Actions Row */}
        <TooltipProvider>
          <div className="flex items-center gap-2 pt-2 border-t">
            {isDraft && !catsJobId ? null : isDraft && catsJobId ? (
              <>
                <Button
                  variant="default"
                  size="sm"
                  className="flex-1 h-8 text-xs bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEnableAgentVIP?.(
                      catsJobId,
                      job.title || job.display_name
                    );
                  }}
                >
                  <Sparkles className="h-3 w-3 mr-1.5" />
                  Enable AgentVIP
                </Button>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 h-8 text-xs"
                      onClick={handleViewInCats}
                    >
                      <ExternalLink className="h-3 w-3 mr-1.5" />
                      View in CATS
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Open job in CATS ATS system</p>
                  </TooltipContent>
                </Tooltip>
              </>
            ) : (
              <>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 h-8 text-xs"
                      onClick={handleViewInCats}
                    >
                      <ExternalLink className="h-3 w-3 mr-1.5" />
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
                        <Pause className="h-3 w-3" />
                      ) : (
                        <Play className="h-3 w-3" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {job.is_active ? "Pause this job" : "Activate this job"}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </>
            )}
          </div>
        </TooltipProvider>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex items-center gap-4">
        {/* Icon */}
        <div
          className={`h-10 w-10 rounded-lg bg-gradient-to-br ${getIconGradient(
            job.status,
            job.is_active
          )} flex items-center justify-center text-white shrink-0 transition-colors duration-300`}
        >
          <Briefcase className="h-5 w-5" />
        </div>

        {/* Job Info - Flexible layout */}
        <div className="flex-1 min-w-0 flex items-center gap-4">
          {/* Title & ID - Takes up remaining space */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base mb-1 truncate group-hover:text-primary transition-colors">
              {job.display_name}
            </h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>ID: {job.job_id}</span>
            </div>
          </div>

          {/* Updated Date */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground min-w-0 max-w-[120px]">
            {job.updated_at ? (
              <>
                <Clock className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">
                  {new Date(job.updated_at).toLocaleDateString()}
                </span>
              </>
            ) : (
              <span className="text-muted-foreground/50 text-xs">No date</span>
            )}
          </div>

          {/* User Avatar */}
          <div className="flex items-center justify-center min-w-0">
            {job.assigned_user ? (
              <UserAvatar name={job.assigned_user.name} size="md" />
            ) : (
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                <User className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Status & Actions - Fixed width */}
          <div className="flex items-center gap-3 justify-end shrink-0">
            {job.is_hot === 1 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-orange-500/10 shrink-0">
                      <Flame className="h-4 w-4 text-orange-500" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Hot Job</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            <Badge
              className={`${getStatusColor(
                job.status,
                job.is_active
              )} border-0 whitespace-nowrap`}
            >
              {job.status === "Draft"
                ? "Draft"
                : job.is_active
                ? job.status || "Active"
                : "Inactive"}
            </Badge>

            <TooltipProvider>
              <div className="flex items-center gap-2">
                {isDraft && !catsJobId ? null : isDraft && catsJobId ? (
                  <>
                    <Button
                      variant="default"
                      size="sm"
                      className="gap-1.5 h-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEnableAgentVIP?.(
                          catsJobId,
                          job.title || job.display_name
                        );
                      }}
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                    </Button>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="gap-1.5 h-8"
                          onClick={handleViewInCats}
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Open job in CATS ATS system</p>
                      </TooltipContent>
                    </Tooltip>
                  </>
                ) : (
                  <>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="gap-1.5 h-8"
                          onClick={handleViewInCats}
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
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
                          className="h-8 w-8 shrink-0"
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
                        <p>
                          {job.is_active
                            ? "Pause this job"
                            : "Activate this job"}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </>
                )}
              </div>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
