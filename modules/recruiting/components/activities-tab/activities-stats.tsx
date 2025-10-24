"use client";

import { Card } from "@/components/ui/card";
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

  const statItems = [
    {
      label: "Total Activities",
      value: stats.total,
      icon: Activity,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950",
    },
    {
      label: "Applications",
      value: stats.applications,
      icon: FileText,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-950",
    },
    {
      label: "Status Changes",
      value: stats.statusChanges,
      icon: AlertCircle,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950",
    },
    {
      label: "Emails Sent",
      value: stats.emails,
      icon: Mail,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-950",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statItems.map((stat) => (
        <Card key={stat.label} className="p-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
