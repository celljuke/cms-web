"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  PlusIcon,
  Briefcase,
  Users,
  TrendingUp,
  Clock,
  ChevronLeft,
} from "lucide-react";
import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc/client";
import { Skeleton } from "@/components/ui/skeleton";
import { JobCard } from "./job-card";
import { JobListItem } from "./job-list-item";
import { JobsSkeleton } from "./jobs-skeleton";
import { JobFilters } from "./job-filters";
import { ViewSwitcher } from "./view-switcher";
import { LatestCandidates } from "./latest-candidates";
import { MethodSelection } from "./job-creation/method-selection";
import type { Job } from "../types";
import { useRouter } from "next/navigation";

export function RecruitingDashboard() {
  const [tab, setTab] = useState("jobs");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Active");
  const [sortBy, setSortBy] = useState("newest");
  const [view, setView] = useState<"card" | "list">("card");
  const [windowDays] = useState(2);
  const [showMethodSelection, setShowMethodSelection] = useState(false);

  // Fetch jobs with tRPC
  const { data: jobs, isLoading: isFetching } =
    trpc.recruiting.getJobs.useQuery();

  // Fetch latest candidates for stats
  const { data: candidatesData, isLoading: isCandidatesLoading } =
    trpc.recruiting.getLatestCandidates.useQuery({
      limit: 50,
      windowDays,
    });

  // Filter and sort jobs
  const filteredJobs = jobs
    ?.filter((job: Job) => {
      const matchesSearch =
        searchQuery === "" ||
        job.display_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.job_id.toString().includes(searchQuery) ||
        (job.location &&
          job.location.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "Inactive" && !job.is_active) ||
        (job.is_active && job.status === statusFilter);

      return matchesSearch && matchesStatus;
    })
    .sort((a: Job, b: Job) => {
      switch (sortBy) {
        case "newest":
          // Sort by updated_at or created_at, newest first
          const dateA = new Date(a.updated_at || a.created_at || 0).getTime();
          const dateB = new Date(b.updated_at || b.created_at || 0).getTime();
          return dateB - dateA;

        case "oldest":
          // Sort by updated_at or created_at, oldest first
          const dateAOld = new Date(
            a.updated_at || a.created_at || 0
          ).getTime();
          const dateBOld = new Date(
            b.updated_at || b.created_at || 0
          ).getTime();
          return dateAOld - dateBOld;

        case "title":
          // Sort by title alphabetically (A-Z)
          return a.display_name.localeCompare(b.display_name);

        case "status":
          // Sort by status: Active > OnHold > Closed > Inactive
          const statusOrder: Record<string, number> = {
            Active: 1,
            OnHold: 2,
            Closed: 3,
            Inactive: 4,
          };
          const statusA = a.is_active ? a.status || "Active" : "Inactive";
          const statusB = b.is_active ? b.status || "Active" : "Inactive";
          return (statusOrder[statusA] || 5) - (statusOrder[statusB] || 5);

        default:
          return 0;
      }
    });

  // Calculate stats
  const stats = {
    total: jobs?.length || 0,
    active:
      jobs?.filter((j: Job) => j.is_active && j.status === "Active").length ||
      0,
    latestCandidates: candidatesData?.count || 0,
    recentActivity:
      jobs?.filter((j: Job) => {
        if (!j.updated_at) return false;
        const daysSince = Math.floor(
          (Date.now() - new Date(j.updated_at).getTime()) /
            (1000 * 60 * 60 * 24)
        );
        return daysSince <= 7;
      }).length || 0,
  };

  const router = useRouter();

  const handleSelectMethod = (method: "existing" | "scratch") => {
    setShowMethodSelection(false);
    if (method === "scratch") {
      router.push("/recruiting/jobs/new");
    } else {
      // TODO: Implement existing job registration flow
      alert("Existing job registration coming soon!");
    }
  };

  return (
    <>
      <main>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6 md:mb-8">
            <div>
              <h1 className="text-2xl md:text-4xl font-semibold tracking-tight mb-1 md:mb-2">
                Recruiting Dashboard
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Manage your job orders and track candidate pipeline
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
            <div className="bg-card rounded-lg border p-4 md:p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="h-5 w-5 md:h-6 md:w-6 text-blue-500" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Total Jobs
                  </p>
                  {isFetching ? (
                    <Skeleton className="h-6 md:h-8 w-12 md:w-16 mt-1" />
                  ) : (
                    <p className="text-xl md:text-2xl font-bold">
                      {stats.total}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border p-4 md:p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-green-500" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Active Jobs
                  </p>
                  {isFetching ? (
                    <Skeleton className="h-6 md:h-8 w-12 md:w-16 mt-1" />
                  ) : (
                    <p className="text-xl md:text-2xl font-bold">
                      {stats.active}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border p-4 md:p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 md:h-6 md:w-6 text-purple-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Latest Candidates
                  </p>
                  {isCandidatesLoading ? (
                    <Skeleton className="h-6 md:h-8 w-12 md:w-16 mt-1" />
                  ) : (
                    <div className="flex items-baseline gap-1.5 md:gap-2">
                      <p className="text-xl md:text-2xl font-bold">
                        {stats.latestCandidates}
                      </p>
                      <p className="text-[10px] md:text-xs text-muted-foreground whitespace-nowrap">
                        last {windowDays} days
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border p-4 md:p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 md:h-6 md:w-6 text-orange-500" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Recent Activity
                  </p>
                  {isFetching ? (
                    <Skeleton className="h-6 md:h-8 w-12 md:w-16 mt-1" />
                  ) : (
                    <p className="text-xl md:text-2xl font-bold">
                      {stats.recentActivity}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={tab} onValueChange={setTab}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <TabsList className="grid grid-cols-2 h-auto">
                <TabsTrigger value="jobs" className="gap-2">
                  <Briefcase className="h-4 w-4" />
                  Jobs
                  {stats.total > 0 && (
                    <Badge variant="secondary" className="ml-1">
                      {stats.total}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="candidates" className="gap-2">
                  <Users className="h-4 w-4" />
                  Latest Candidates
                </TabsTrigger>
              </TabsList>

              {tab === "jobs" && (
                <Button
                  className="gap-2"
                  onClick={() => setShowMethodSelection(true)}
                >
                  <PlusIcon className="h-4 w-4" />
                  Create New Job
                </Button>
              )}
            </div>

            <TabsContent value="jobs" className="mt-6">
              {/* Filters and View Switcher */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex-1 w-full sm:w-auto">
                  <JobFilters
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    statusFilter={statusFilter}
                    onStatusChange={setStatusFilter}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                  />
                </div>
                <ViewSwitcher view={view} onViewChange={setView} />
              </div>

              {/* Jobs List */}
              {isFetching ? (
                <JobsSkeleton />
              ) : filteredJobs && filteredJobs.length > 0 ? (
                view === "card" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredJobs.map((job: Job) => (
                      <JobCard key={job.job_id} job={job} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredJobs.map((job: Job) => (
                      <JobListItem key={job.job_id} job={job} />
                    ))}
                  </div>
                )
              ) : (
                <div className="text-center py-12">
                  <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery || statusFilter !== "all"
                      ? "Try adjusting your filters"
                      : "Get started by creating your first job"}
                  </p>
                  {!searchQuery && statusFilter === "all" && (
                    <Button
                      className="gap-2"
                      onClick={() => setShowMethodSelection(true)}
                    >
                      <PlusIcon className="h-4 w-4" />
                      Create New Job
                    </Button>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="candidates" className="mt-6">
              <LatestCandidates />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <MethodSelection
        open={showMethodSelection}
        onOpenChange={setShowMethodSelection}
        onSelectMethod={handleSelectMethod}
      />
    </>
  );
}
