import { Briefcase, TrendingUp, FileEdit, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardStatsProps {
  stats: {
    total: number;
    active: number;
    drafts: number;
    candidates: number;
  };
  isLoading: boolean;
  windowDays?: number;
}

export function DashboardStats({
  stats,
  isLoading,
  windowDays = 2,
}: DashboardStatsProps) {
  const statCards = [
    {
      label: "Total Jobs",
      value: stats.total,
      icon: Briefcase,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Active Jobs",
      value: stats.active,
      icon: TrendingUp,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      label: "Draft Jobs",
      value: stats.drafts,
      icon: FileEdit,
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
    },
    {
      label: "Latest Candidates",
      value: stats.candidates,
      icon: Users,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-card border rounded-lg p-4 md:p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                  <div
                    className={`h-10 w-10 md:h-12 md:w-12 rounded-lg ${stat.bgColor} flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className={`h-5 w-5 md:h-6 md:w-6 ${stat.color}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs md:text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                    {isLoading ? (
                      <Skeleton className="h-6 md:h-8 w-12 md:w-16 mt-1" />
                    ) : (
                      <p className="text-xl md:text-2xl font-bold">
                        {stat.value}
                      </p>
                    )}
                    {stat.label === "Latest Candidates" && !isLoading && (
                      <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5">
                        last {windowDays} days
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
