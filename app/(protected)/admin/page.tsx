"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, Calendar, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  OverallStatsSection,
  FunnelChart,
  JobFunnelTable,
  FunnelDropsSection,
  useWeeklyReport,
} from "@/modules/admin";
import type { TimeFilter } from "@/modules/admin";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { format } from "date-fns";

function AdminDashboardLoading() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {[...Array(7)].map((_, i) => (
          <Card key={i} className="shadow-none">
            <CardContent className="p-4">
              <Skeleton className="h-10 w-10 rounded-lg mb-2" />
              <Skeleton className="h-8 w-16 mb-1" />
              <Skeleton className="h-4 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [weeksBack, setWeeksBack] = useState(0);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("weekly");

  const {
    data: report,
    isLoading,
    refetch,
    isFetching,
  } = useWeeklyReport(weeksBack, timeFilter);

  return (
    <main>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6 md:mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/recruiting")}
              className="shrink-0"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-1">
                Admin Dashboard
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Weekly recruitment activity and performance metrics
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 shrink-0">
            <Select
              value={timeFilter}
              onValueChange={(value: TimeFilter) => setTimeFilter(value)}
            >
              <SelectTrigger className="w-[140px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="weekly">This Week</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={weeksBack.toString()}
              onValueChange={(value) => setWeeksBack(Number(value))}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Current Period</SelectItem>
                <SelectItem value="1">1 Week Ago</SelectItem>
                <SelectItem value="2">2 Weeks Ago</SelectItem>
                <SelectItem value="3">3 Weeks Ago</SelectItem>
                <SelectItem value="4">4 Weeks Ago</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="icon"
              onClick={() => refetch()}
              disabled={isFetching}
            >
              <RefreshCw
                className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
              />
            </Button>
          </div>
        </div>

        {/* Report Period */}
        {report && (
          <div className="mb-6 p-3 bg-secondary/50 rounded-lg border">
            <p className="text-sm text-center">
              <span className="text-muted-foreground">Report Period:</span>{" "}
              <span className="font-medium">
                {format(new Date(report.report_period_start), "MMM d, yyyy")} -{" "}
                {format(new Date(report.report_period_end), "MMM d, yyyy")}
              </span>
            </p>
          </div>
        )}

        {/* Content */}
        {isLoading ? (
          <AdminDashboardLoading />
        ) : report ? (
          <div className="space-y-6">
            {/* Overall Stats */}
            <OverallStatsSection stats={report.overall_stats} />

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FunnelChart stats={report.overall_stats} />
              <FunnelDropsSection drops={report.funnel_drops} />
            </div>

            {/* Job Level Table */}
            <JobFunnelTable jobs={report.job_level_funnel} />
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No data available</p>
          </div>
        )}
      </div>
    </main>
  );
}
