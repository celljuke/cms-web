"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  ChevronLeft,
  ExternalLink,
  TrendingUp,
  Users,
  Paperclip,
  Activity,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useJobDetail } from "../hooks/use-job-detail";
import { useJobAnalytics } from "../hooks/use-job-analytics";
import { JobDetailsTab } from "./job-details-tab";
import { ConversionFunnel } from "./conversion-funnel";
import { JobDetailLoading } from "./job-detail-loading";
import { ApplicantsTab } from "./applicants-tab";
import { ActivitiesTab } from "./activities-tab";
import { AttachmentsTab } from "./attachments-tab";
import { RecommendationsTab } from "./recommendations-tab";

interface JobDetailProps {
  jobId: number;
}

export function JobDetail({ jobId }: JobDetailProps) {
  const router = useRouter();
  const { job, isLoading, error } = useJobDetail(jobId);
  const [activeTab, setActiveTab] = useState("job-details");

  // Only fetch analytics when user navigates to tabs that need it
  const shouldFetchAnalytics =
    activeTab === "conversion-funnel" || activeTab === "applicants";
  const {
    analytics,
    applicants,
    isLoading: analyticsLoading,
  } = useJobAnalytics(jobId, shouldFetchAnalytics);

  const getStatusColor = (status: string | null, isActive: number) => {
    if (!isActive) return "bg-gray-500/10 text-gray-700 dark:text-gray-300";

    switch (status) {
      case "Active":
        return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "OnHold":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
      case "Closed":
        return "bg-red-500/10 text-red-700 dark:text-red-400";
      default:
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400";
    }
  };

  const handleActionClick = () => {
    // Open in CATS - implement based on your CATS URL structure
    window.open(`https://your-cats-url.com/jobs/${jobId}`, "_blank");
  };

  if (isLoading) {
    return <JobDetailLoading />;
  }

  if (error || !job) {
    return (
      <div>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Job not found</h3>
            <p className="text-muted-foreground mb-4">
              The job you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => router.push("/recruiting")}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main>
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/recruiting")}
              className="mb-4 -ml-2"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-4xl font-semibold tracking-tight mb-2">
              {job.display_name}
            </h1>
            <div className="flex items-center gap-3">
              <Badge
                className={`${getStatusColor(
                  job.status,
                  job.is_active
                )} border-0`}
              >
                {job.is_active ? job.status || "Active" : "Inactive"}
              </Badge>
              <span className="text-sm text-muted-foreground">
                ID: {job.job_id}
              </span>
            </div>
          </div>

          {/* Actions */}
          <Button onClick={handleActionClick} className="gap-2">
            <ExternalLink className="h-4 w-4" />
            Open in CATS
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-6 h-auto mb-6 w-full">
            <TabsTrigger
              value="job-details"
              className="flex-col md:flex-row gap-1 md:gap-2 py-2 md:py-1"
            >
              <FileText className="h-4 w-4" />
              <span className="text-xs md:text-sm hidden md:inline">
                Job Details
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="conversion-funnel"
              className="flex-col md:flex-row gap-1 md:gap-2 py-2 md:py-1"
            >
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs md:text-sm hidden md:inline">
                Conversion Funnel
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="applicants"
              className="flex-col md:flex-row gap-1 md:gap-2 py-2 md:py-1"
            >
              <Users className="h-4 w-4" />
              <span className="text-xs md:text-sm hidden md:inline">
                Applicants
              </span>
              {!analyticsLoading && applicants.length > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-0 md:ml-1 text-[10px] md:text-xs hidden md:inline-flex"
                >
                  {applicants.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="attachments"
              className="flex-col md:flex-row gap-1 md:gap-2 py-2 md:py-1"
            >
              <Paperclip className="h-4 w-4" />
              <span className="text-xs md:text-sm hidden md:inline">
                Attachments
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="activities"
              className="flex-col md:flex-row gap-1 md:gap-2 py-2 md:py-1"
            >
              <Activity className="h-4 w-4" />
              <span className="text-xs md:text-sm hidden md:inline">
                Activities
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="ai-recommendations"
              className="flex-col md:flex-row gap-1 md:gap-2 py-2 md:py-1"
            >
              <Sparkles className="h-4 w-4" />
              <span className="text-xs md:text-sm hidden md:inline">
                AI Recommendations
              </span>
            </TabsTrigger>
          </TabsList>

          {/* Job Details Tab */}
          <TabsContent value="job-details">
            <JobDetailsTab job={job} />
          </TabsContent>

          {/* Conversion Funnel Tab */}
          <TabsContent value="conversion-funnel">
            {analyticsLoading ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center animate-pulse">
                      <TrendingUp className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        Loading Analytics
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Calculating conversion metrics...
                      </p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <div className="h-2 w-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]" />
                      <div className="h-2 w-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.15s]" />
                      <div className="h-2 w-2 rounded-full bg-blue-500 animate-bounce" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : analytics ? (
              <ConversionFunnel analytics={analytics} />
            ) : (
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-12 text-center">
                  <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No Analytics Available
                  </h3>
                  <p className="text-muted-foreground">
                    Analytics data is not available for this job
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Applicants Tab */}
          <TabsContent value="applicants">
            {analyticsLoading ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center animate-pulse">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        Loading Applicants
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Gathering candidate information...
                      </p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-bounce [animation-delay:-0.3s]" />
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-bounce [animation-delay:-0.15s]" />
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-bounce" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <ApplicantsTab applicants={applicants} />
            )}
          </TabsContent>

          {/* Attachments Tab */}
          <TabsContent value="attachments">
            <AttachmentsTab jobId={jobId} />
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities">
            <ActivitiesTab jobId={jobId} />
          </TabsContent>

          {/* AI Recommendations Tab */}
          <TabsContent value="ai-recommendations">
            <RecommendationsTab jobId={jobId} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
