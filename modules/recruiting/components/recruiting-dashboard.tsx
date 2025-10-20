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
import { JobCard } from "./job-card";
import { JobsSkeleton } from "./jobs-skeleton";
import { JobFilters } from "./job-filters";
import type { Job } from "../types";
import { useRouter } from "next/navigation";

export function RecruitingDashboard() {
  const [tab, setTab] = useState("jobs");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch jobs with tRPC
  const { data: jobs, isLoading: isFetching } =
    trpc.recruiting.getJobs.useQuery();

  // Add artificial delay to show loading state (simulating slow third-party API)
  useEffect(() => {
    if (jobs) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000); // 2 second delay to show the fancy loader

      return () => clearTimeout(timer);
    }
  }, [jobs]);

  // Filter jobs based on search and status
  const filteredJobs = jobs?.filter((job: Job) => {
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
  });

  // Calculate stats
  const stats = {
    total: jobs?.length || 0,
    active:
      jobs?.filter((j: Job) => j.is_active && j.status === "Active").length ||
      0,
    candidates: 0, // This would come from another API
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

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="mb-8">
            <h1 className="text-4xl font-semibold tracking-tight mb-2">
              Recruiting Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your job orders and track candidate pipeline
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/apps")}
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Assistant Selection
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Jobs</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Jobs</p>
                <p className="text-2xl font-bold">{stats.active}</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Candidates</p>
                <p className="text-2xl font-bold">{stats.candidates}</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Recent Activity</p>
                <p className="text-2xl font-bold">{stats.recentActivity}</p>
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
              <Button className="gap-2">
                <PlusIcon className="h-4 w-4" />
                Create New Job
              </Button>
            )}
          </div>

          <TabsContent value="jobs" className="mt-6">
            {/* Filters */}
            <JobFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
            />

            {/* Jobs List */}
            {isLoading || isFetching ? (
              <JobsSkeleton />
            ) : filteredJobs && filteredJobs.length > 0 ? (
              <div className="space-y-2">
                {filteredJobs.map((job: Job) => (
                  <JobCard key={job.job_id} job={job} />
                ))}
              </div>
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
                  <Button className="gap-2">
                    <PlusIcon className="h-4 w-4" />
                    Create New Job
                  </Button>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="candidates">
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Candidates Coming Soon
              </h3>
              <p className="text-muted-foreground">
                Candidate management features will be available here
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
