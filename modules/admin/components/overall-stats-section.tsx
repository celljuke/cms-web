import { Card, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  UserPlus,
  Target,
  Mail,
  Bell,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import type { OverallStats } from "../types";

interface OverallStatsSectionProps {
  stats: OverallStats;
}

const statItems = [
  {
    key: "active_jobs" as keyof OverallStats,
    label: "Active Jobs",
    icon: Briefcase,
    color: "blue",
  },
  {
    key: "new_applicants_this_week" as keyof OverallStats,
    label: "New Applicants",
    icon: UserPlus,
    color: "green",
  },
  {
    key: "applicants_assigned_match_score" as keyof OverallStats,
    label: "Scored",
    icon: Target,
    color: "purple",
  },
  {
    key: "applicants_sent_screening_emails" as keyof OverallStats,
    label: "Screened",
    icon: Mail,
    color: "cyan",
  },
  {
    key: "applicants_sent_reminders" as keyof OverallStats,
    label: "Reminders",
    icon: Bell,
    color: "yellow",
  },
  {
    key: "applicants_who_replied" as keyof OverallStats,
    label: "Replied",
    icon: MessageSquare,
    color: "indigo",
  },
  {
    key: "applicants_qualified" as keyof OverallStats,
    label: "Qualified",
    icon: CheckCircle2,
    color: "emerald",
  },
];

const getColorClasses = (color: string) => {
  const colors: Record<string, { bg: string; text: string }> = {
    blue: { bg: "bg-blue-500/10", text: "text-blue-500" },
    green: { bg: "bg-green-500/10", text: "text-green-500" },
    purple: { bg: "bg-purple-500/10", text: "text-purple-500" },
    cyan: { bg: "bg-cyan-500/10", text: "text-cyan-500" },
    yellow: { bg: "bg-yellow-500/10", text: "text-yellow-500" },
    indigo: { bg: "bg-indigo-500/10", text: "text-indigo-500" },
    emerald: { bg: "bg-emerald-500/10", text: "text-emerald-500" },
  };
  return colors[color] || colors.blue;
};

export function OverallStatsSection({ stats }: OverallStatsSectionProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {statItems.map((item) => {
        const Icon = item.icon;
        const colors = getColorClasses(item.color);

        return (
          <Card key={item.key} className="shadow-none">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`h-10 w-10 rounded-lg ${colors.bg} flex items-center justify-center shrink-0`}
                >
                  <Icon className={`h-5 w-5 ${colors.text}`} />
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-bold mb-1">
                {stats[item.key]}
              </p>
              <p className="text-xs text-muted-foreground">{item.label}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
