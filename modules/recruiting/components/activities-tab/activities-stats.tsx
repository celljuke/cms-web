"use client";

import { Activity, Mail, AlertCircle, FileText } from "lucide-react";
import type { JobActivity } from "../../types";

interface ActivitiesStatsProps {
  activities: JobActivity[];
}

export function ActivitiesStats({ activities }: ActivitiesStatsProps) {
  const stats = {
    total: activities.length,
    applications: activities.filter((a) =>
      a.annotation?.toLowerCase().includes("applied")
    ).length,
    statusChanges: activities.filter((a) =>
      a.annotation?.toLowerCase().includes("status change")
    ).length,
    emails: activities.filter((a) => a.type === "email").length,
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Activity className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Activities</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
            <FileText className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Applications</p>
            <p className="text-2xl font-bold">{stats.applications}</p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <AlertCircle className="h-6 w-6 text-purple-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Status Changes</p>
            <p className="text-2xl font-bold">{stats.statusChanges}</p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
            <Mail className="h-6 w-6 text-orange-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Emails Sent</p>
            <p className="text-2xl font-bold">{stats.emails}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
