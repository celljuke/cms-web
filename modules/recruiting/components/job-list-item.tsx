"use client";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  User,
  ExternalLink,
  Edit,
  Pause,
} from "lucide-react";
import type { Job } from "../types";

interface JobListItemProps {
  job: Job;
}

export function JobListItem({ job }: JobListItemProps) {
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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="group flex items-center gap-4 p-4 rounded-lg border bg-card hover:shadow-md hover:border-blue-500/50 dark:hover:border-blue-800/50 transition-all duration-300">
      {/* Icon */}
      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shrink-0">
        <Briefcase className="h-5 w-5" />
      </div>

      {/* Job Info - Grid with fixed column widths */}
      <div className="flex-1 min-w-0 grid grid-cols-[1fr_180px_180px_auto] gap-6 items-center">
        {/* Title & ID */}
        <div className="min-w-0">
          <h3 className="font-semibold text-base mb-1 truncate group-hover:text-primary transition-colors">
            {job.display_name}
          </h3>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>ID: {job.job_id}</span>
          </div>
        </div>

        {/* Location & Salary - Fixed width column */}
        <div className="flex flex-col gap-1.5 text-sm min-w-0">
          {job.location ? (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{job.location}</span>
            </div>
          ) : (
            <div className="h-5" />
          )}
          {job.salary ? (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <DollarSign className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{job.salary}</span>
            </div>
          ) : (
            <div className="h-5" />
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
            <div className="h-5" />
          )}
          {job.assigned_user ? (
            <div className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{job.assigned_user.name}</span>
            </div>
          ) : (
            <div className="h-5" />
          )}
        </div>

        {/* Status, Avatar & Actions - Fixed width */}
        <div className="flex items-center gap-3 justify-end w-[280px]">
          <Badge
            className={`${getStatusColor(
              job.status,
              job.is_active
            )} border-0 whitespace-nowrap`}
          >
            {job.is_active ? job.status || "Active" : "Inactive"}
          </Badge>

          <div className="flex items-center gap-1 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
              <Pause className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
