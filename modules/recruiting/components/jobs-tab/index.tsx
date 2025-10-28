import { useState, useMemo } from "react";
import { Briefcase, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JobFilters } from "../job-filters";
import { ViewSwitcher } from "../view-switcher";
import { JobCard } from "../job-card";
import { JobListItem } from "../job-list-item";
import { JobsSkeleton } from "../jobs-skeleton";
import type { Job } from "../../types";

interface JobsTabProps {
  jobs: Job[] | undefined;
  isLoading: boolean;
  onCreateJob: () => void;
}

export function JobsTab({ jobs, isLoading, onCreateJob }: JobsTabProps) {
  const [view, setView] = useState<"card" | "list">("card");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("Active");
  const [sortBy, setSortBy] = useState<string>("newest");

  // Filter and sort jobs
  const filteredJobs = useMemo(() => {
    return jobs
      ?.filter((job) => {
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
      .sort((a, b) => {
        switch (sortBy) {
          case "newest":
            const dateA = new Date(a.updated_at || a.created_at || 0).getTime();
            const dateB = new Date(b.updated_at || b.created_at || 0).getTime();
            return dateB - dateA;
          case "oldest":
            const dateA2 = new Date(
              a.updated_at || a.created_at || 0
            ).getTime();
            const dateB2 = new Date(
              b.updated_at || b.created_at || 0
            ).getTime();
            return dateA2 - dateB2;
          case "title":
            return a.display_name.localeCompare(b.display_name);
          default:
            return 0;
        }
      });
  }, [jobs, searchQuery, statusFilter, sortBy]);

  return (
    <>
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
        <div className="flex items-center gap-2">
          <ViewSwitcher view={view} onViewChange={setView} />
        </div>
      </div>

      {/* Jobs List/Grid */}
      {isLoading ? (
        <JobsSkeleton />
      ) : filteredJobs && filteredJobs.length > 0 ? (
        view === "card" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredJobs.map((job) => (
              <JobCard key={job.job_id} job={job} />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredJobs.map((job) => (
              <JobListItem key={job.job_id} job={job} />
            ))}
          </div>
        )
      ) : (
        <div className="text-center py-12 border rounded-lg bg-muted/20">
          <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery || statusFilter !== "all"
              ? "Try adjusting your filters"
              : "Get started by creating your first job"}
          </p>
          {!searchQuery && statusFilter === "all" && (
            <Button className="gap-2" onClick={onCreateJob}>
              <PlusIcon className="h-4 w-4" />
              Create New Job
            </Button>
          )}
        </div>
      )}
    </>
  );
}
