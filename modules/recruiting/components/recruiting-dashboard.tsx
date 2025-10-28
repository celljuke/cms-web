"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  Users,
  FileEdit,
  ChevronLeft,
  PlusIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DashboardStats } from "./dashboard-stats";
import { JobsTab } from "./jobs-tab";
import { DraftJobsTab } from "./draft-jobs-tab";
import { LatestCandidates } from "./latest-candidates";
import { MethodSelection } from "./job-creation/method-selection";
import { useDashboardData } from "../hooks/use-dashboard-data";

export function RecruitingDashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showMethodSelection, setShowMethodSelection] = useState(false);

  // Initialize tab from URL query parameter or default to "jobs"
  const [tab, setTab] = useState(() => {
    const tabParam = searchParams.get("tab");
    return tabParam === "drafts" || tabParam === "candidates"
      ? tabParam
      : "jobs";
  });

  // Update tab when URL changes
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (
      tabParam &&
      (tabParam === "jobs" ||
        tabParam === "drafts" ||
        tabParam === "candidates")
    ) {
      setTab(tabParam);
    }
  }, [searchParams]);

  // Fetch all dashboard data
  const {
    jobs,
    draftJobs,
    stats,
    isLoading,
    isJobsLoading,
    isDraftJobsLoading,
  } = useDashboardData();

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
          <DashboardStats stats={stats} isLoading={isLoading} windowDays={2} />

          {/* Tabs */}
          <Tabs value={tab} onValueChange={setTab}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <TabsList className="grid grid-cols-3 w-full sm:w-auto h-auto">
                <TabsTrigger
                  value="jobs"
                  className="gap-1.5 sm:gap-2 min-w-[100px] sm:min-w-[180px] text-xs sm:text-sm"
                >
                  <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="hidden xs:inline">Jobs</span>
                  <span className="inline xs:hidden">Jobs</span>
                  {stats.total > 0 && (
                    <Badge
                      variant="secondary"
                      className="ml-0.5 sm:ml-1 text-[10px] sm:text-xs h-4 sm:h-5 px-1 sm:px-1.5"
                    >
                      {stats.total}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="candidates"
                  className="gap-1.5 sm:gap-2 min-w-[100px] sm:min-w-[180px] text-xs sm:text-sm"
                >
                  <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Latest Candidates</span>
                  <span className="inline sm:hidden">Candidates</span>
                </TabsTrigger>
                <TabsTrigger
                  value="drafts"
                  className="gap-1.5 sm:gap-2 min-w-[100px] sm:min-w-[180px] text-xs sm:text-sm"
                >
                  <FileEdit className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="hidden xs:inline">Draft Jobs</span>
                  <span className="inline xs:hidden">Drafts</span>
                  {stats.drafts > 0 && (
                    <Badge
                      variant="secondary"
                      className="ml-0.5 sm:ml-1 bg-cyan-500/10 text-cyan-700 text-[10px] sm:text-xs h-4 sm:h-5 px-1 sm:px-1.5"
                    >
                      {stats.drafts}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>

              {tab === "jobs" && (
                <Button
                  className="gap-2 w-full sm:w-auto"
                  onClick={() => setShowMethodSelection(true)}
                >
                  <PlusIcon className="h-4 w-4" />
                  Create New Job
                </Button>
              )}
            </div>

            <TabsContent value="jobs" className="mt-6">
              <JobsTab
                jobs={jobs}
                isLoading={isJobsLoading}
                onCreateJob={() => setShowMethodSelection(true)}
              />
            </TabsContent>

            <TabsContent value="candidates" className="mt-6">
              <LatestCandidates />
            </TabsContent>

            <TabsContent value="drafts" className="mt-6">
              <DraftJobsTab
                draftJobs={draftJobs}
                isLoading={isDraftJobsLoading}
                onCreateJob={() => setShowMethodSelection(true)}
              />
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
