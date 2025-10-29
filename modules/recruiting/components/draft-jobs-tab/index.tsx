import { useState, useMemo } from "react";
import { Briefcase, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JobFilters } from "../job-filters";
import { ViewSwitcher } from "../view-switcher";
import { JobCard } from "../job-card";
import { JobListItem } from "../job-list-item";
import { JobsSkeleton } from "../jobs-skeleton";
import { EnableAgentVIPSheet } from "../enable-agentvip-sheet";
import type { JobSubmission, Job } from "../../types";

interface DraftJobsTabProps {
  draftJobs: JobSubmission[] | undefined;
  isLoading: boolean;
  onCreateJob: () => void;
}

export function DraftJobsTab({
  draftJobs,
  isLoading,
  onCreateJob,
}: DraftJobsTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [view, setView] = useState<"card" | "list">("card");
  const [enableAgentVIPSheetOpen, setEnableAgentVIPSheetOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [selectedJobTitle, setSelectedJobTitle] = useState("");

  const handleEnableAgentVIP = (jobId: number, jobTitle: string) => {
    setSelectedJobId(jobId);
    setSelectedJobTitle(jobTitle);
    setEnableAgentVIPSheetOpen(true);
  };

  // Create a mapping of job_id to cats_job_id for draft jobs
  const draftJobsMetadata = useMemo(() => {
    if (!draftJobs) return new Map();
    const map = new Map<number, { cats_job_id: number | null }>();
    draftJobs.forEach((draft) => {
      map.set(draft.id, { cats_job_id: draft.cats_job_id });
    });
    return map;
  }, [draftJobs]);

  // Transform JobSubmission to Job format for component reuse
  const transformedJobs: Job[] = useMemo(() => {
    if (!draftJobs) return [];

    return draftJobs.map((draft) => ({
      job_id: draft.id,
      display_name: draft.title,
      description: draft.description || "",
      screening_email: "",
      criteria: "",
      title: draft.title,
      location:
        draft.city && draft.state ? `${draft.city}, ${draft.state}` : null,
      country_code: draft.country_code,
      is_hot: draft.is_hot ? 1 : 0,
      salary: draft.salary,
      remote_type: draft.remote_type,
      max_rate: draft.max_rate,
      duration: draft.duration,
      start_date: draft.start_date,
      openings: draft.openings,
      status: "Draft",
      status_id: null,
      date_created: draft.created_at,
      date_modified: draft.updated_at,
      category_name: draft.category,
      type: draft.type,
      company: null,
      application_forms: [],
      owner: null,
      recruiter: null,
      is_active: 0,
      created_at: draft.created_at,
      updated_at: draft.updated_at,
      created_by: draft.created_by,
      assigned_user: null,
    }));
  }, [draftJobs]);

  // Filter and sort draft jobs
  const filteredJobs = useMemo(() => {
    // Filter
    let filtered = transformedJobs;
    if (searchQuery) {
      filtered = transformedJobs.filter(
        (job) =>
          job.display_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.job_id.toString().includes(searchQuery) ||
          (job.location &&
            job.location.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Sort
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          const dateA = new Date(a.created_at || 0).getTime();
          const dateB = new Date(b.created_at || 0).getTime();
          return dateB - dateA;
        case "oldest":
          const dateA2 = new Date(a.created_at || 0).getTime();
          const dateB2 = new Date(b.created_at || 0).getTime();
          return dateA2 - dateB2;
        case "title":
          return a.display_name.localeCompare(b.display_name);
        default:
          return 0;
      }
    });
  }, [transformedJobs, searchQuery, sortBy]);

  return (
    <>
      {/* Filters and View Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex-1 w-full sm:w-auto">
          <JobFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter="all"
            onStatusChange={() => {}}
            sortBy={sortBy}
            onSortChange={setSortBy}
            hideStatusFilter
          />
        </div>
        <div className="flex items-center gap-2">
          <ViewSwitcher view={view} onViewChange={setView} />
        </div>
      </div>

      {/* Draft Jobs Grid/List */}
      {isLoading ? (
        <JobsSkeleton />
      ) : filteredJobs && filteredJobs.length > 0 ? (
        view === "card" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredJobs.map((job) => {
              const metadata = draftJobsMetadata.get(job.job_id);
              return (
                <JobCard
                  key={job.job_id}
                  job={job}
                  isDraft={true}
                  catsJobId={metadata?.cats_job_id}
                  onEnableAgentVIP={handleEnableAgentVIP}
                />
              );
            })}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredJobs.map((job) => {
              const metadata = draftJobsMetadata.get(job.job_id);
              return (
                <JobListItem
                  key={job.job_id}
                  job={job}
                  isDraft={true}
                  catsJobId={metadata?.cats_job_id}
                  onEnableAgentVIP={handleEnableAgentVIP}
                />
              );
            })}
          </div>
        )
      ) : (
        <div className="text-center py-12 border rounded-lg bg-muted/20">
          <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No draft jobs found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery
              ? "Try adjusting your search"
              : "Draft jobs will appear here after you start creating a new job"}
          </p>
          {!searchQuery && (
            <Button className="gap-2" onClick={onCreateJob}>
              <PlusIcon className="h-4 w-4" />
              Create New Job
            </Button>
          )}
        </div>
      )}

      {/* Enable AgentVIP Sheet */}
      <EnableAgentVIPSheet
        jobId={selectedJobId}
        jobTitle={selectedJobTitle}
        open={enableAgentVIPSheetOpen}
        onOpenChange={setEnableAgentVIPSheetOpen}
      />
    </>
  );
}
