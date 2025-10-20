"use client";

import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";
import { useRouter } from "next/navigation";
import type { Job } from "../types";

interface JobListItemProps {
  job: Job;
}

export function JobListItem({ job }: JobListItemProps) {
  const router = useRouter();

  const handleRowClick = () => {
    router.push(`/recruiting/jobs/${job.job_id}`);
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Action logic will be implemented here
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

  return (
    <div
      className="group flex items-center gap-4 p-4 rounded-lg border bg-card hover:shadow-md hover:border-blue-500/50 dark:hover:border-blue-800/50 transition-all duration-300 cursor-pointer"
      onClick={handleRowClick}
    >
      {/* Icon */}
      <div
        className={`h-10 w-10 rounded-lg bg-gradient-to-br ${getIconGradient(
          job.status,
          job.is_active
        )} flex items-center justify-center text-white shrink-0 transition-colors duration-300`}
      >
        <Briefcase className="h-5 w-5" />
      </div>

      {/* Job Info - Grid with fixed column widths */}
      <div className="flex-1 min-w-0 grid grid-cols-[1fr_200px_200px_auto] gap-6 items-center">
        {/* Title & ID */}
        <div className="min-w-0">
          <h3 className="font-semibold text-base mb-1 truncate group-hover:text-primary transition-colors">
            {job.display_name}
          </h3>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>ID: {job.job_id}</span>
          </div>
        </div>

        {/* Location - Fixed width column */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground min-w-0">
          {job.location ? (
            <>
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{job.location}</span>
            </>
          ) : (
            <span className="text-muted-foreground/50">No location</span>
          )}
        </div>

        {/* Metadata - Fixed width column */}
        <div className="flex flex-col gap-1.5 text-xs text-muted-foreground min-w-0">
          {job.updated_at ? (
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">
                {new Date(job.updated_at).toLocaleDateString()}
              </span>
            </div>
          ) : (
            <div className="h-4" />
          )}
          {job.assigned_user ? (
            <div className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{job.assigned_user.name}</span>
            </div>
          ) : (
            <div className="h-4" />
          )}
        </div>

        {/* Status & Actions - Fixed width */}
        <div className="flex items-center gap-3 justify-end w-[260px]">
          <Badge
            className={`${getStatusColor(
              job.status,
              job.is_active
            )} border-0 whitespace-nowrap`}
          >
            {job.is_active ? job.status || "Active" : "Inactive"}
          </Badge>

          <TooltipProvider>
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="gap-1.5 h-8"
                    onClick={handleActionClick}
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
                    onClick={handleActionClick}
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
                    {job.is_active ? "Pause this job" : "Activate this job"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
