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
import { ApplicantsTable } from "./applicants-table";
import { JobDetailLoading } from "./job-detail-loading";

interface JobDetailProps {
  jobId: number;
}

export function JobDetail({ jobId }: JobDetailProps) {
  const router = useRouter();
  const { job, isLoading, error } = useJobDetail(jobId);
  const {
    analytics,
    applicants,
    isLoading: analyticsLoading,
  } = useJobAnalytics(jobId);
  const [activeTab, setActiveTab] = useState("job-details");

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
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
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
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
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
            <TabsTrigger value="job-details" className="gap-2">
              <FileText className="h-4 w-4" />
              Job Details
            </TabsTrigger>
            <TabsTrigger value="conversion-funnel" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Conversion Funnel
            </TabsTrigger>
            <TabsTrigger value="applicants" className="gap-2">
              <Users className="h-4 w-4" />
              Applicants
              {applicants.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {applicants.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="attachments" className="gap-2">
              <Paperclip className="h-4 w-4" />
              Attachments
            </TabsTrigger>
            <TabsTrigger value="activities" className="gap-2">
              <Activity className="h-4 w-4" />
              Activities
            </TabsTrigger>
            <TabsTrigger value="ai-recommendations" className="gap-2">
              <Sparkles className="h-4 w-4" />
              AI Recommendations
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
              <ApplicantsTable applicants={applicants} />
            )}
          </TabsContent>

          {/* Attachments Tab - Placeholder */}
          <TabsContent value="attachments">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-12 text-center">
                <Paperclip className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Attachments Coming Soon
                </h3>
                <p className="text-muted-foreground">
                  Upload and manage job-related documents
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activities Tab - Placeholder */}
          <TabsContent value="activities">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-12 text-center">
                <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Activities Coming Soon
                </h3>
                <p className="text-muted-foreground">
                  View activity history and timeline for this job
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Recommendations Tab - Placeholder */}
          <TabsContent value="ai-recommendations">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-12 text-center">
                <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  AI Recommendations Coming Soon
                </h3>
                <p className="text-muted-foreground">
                  Get AI-powered insights and candidate recommendations
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
