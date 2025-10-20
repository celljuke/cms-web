"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
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
    <Card className="group h-full hover:shadow-lg transition-all duration-300 hover:border-blue-500/50 dark:hover:border-blue-800/50 py-2">
      <CardContent className="p-3 h-full flex flex-col">
        {/* Header with Icon and Status */}
        <div className="flex items-start justify-between mb-4">
          <Badge
            className={`${getStatusColor(job.status, job.is_active)} border-0`}
          >
            {job.is_active ? job.status || "Active" : "Inactive"}
          </Badge>
        </div>

        {/* Job Title */}
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
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

        {/* Footer with Metadata */}
        <div className="pt-4 border-t space-y-2">
          {job.updated_at && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              <span>
                Updated {new Date(job.updated_at).toLocaleDateString()}
              </span>
            </div>
          )}
          {job.assigned_user && (
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="" alt={job.assigned_user.name} />
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {getInitials(job.assigned_user.name)}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground truncate">
                {job.assigned_user.name}
              </span>
            </div>
          )}
        </div>

        {/* Actions - shown on hover */}
        <div className="flex items-center gap-1 mt-4 pt-4 border-t opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <Button variant="outline" size="sm" className="flex-1">
            <ExternalLink className="h-3.5 w-3.5 mr-1" />
            View
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Edit className="h-3.5 w-3.5" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Pause className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
