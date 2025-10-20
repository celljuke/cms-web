"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Users,
  Building2,
  Mail,
  ExternalLink,
  ChevronLeft,
  Clock,
  FileText,
  CheckCircle2,
  TrendingUp,
  Paperclip,
  Activity,
  Sparkles,
  Calendar,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useJobDetail } from "../hooks/use-job-detail";

interface JobDetailProps {
  jobId: number;
}

export function JobDetail({ jobId }: JobDetailProps) {
  const router = useRouter();
  const { job, isLoading, error } = useJobDetail(jobId);
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
    // Action logic will be implemented here
  };

  const formatLocation = (location: any) => {
    if (!location) return "Not specified";
    const { city, state } = location;
    return `${city}, ${state}`.replace(/^\w/, (c) => c.toUpperCase());
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <Skeleton className="h-10 w-48 mb-8" />
          <Skeleton className="h-12 w-96 mb-4" />
          <Skeleton className="h-12 w-full mb-6" />
          <div className="space-y-6">
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
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
          <TooltipProvider>
            <Button onClick={handleActionClick} className="gap-2">
              <ExternalLink className="h-4 w-4" />
              Open in CATS
            </Button>
          </TooltipProvider>
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Main Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Job Description */}
                <Card className="hover:shadow-md transition-shadow py-2">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h2 className="text-lg font-semibold">Job Description</h2>
                    </div>
                    <div
                      className="prose prose-sm dark:prose-invert max-w-none leading-7"
                      dangerouslySetInnerHTML={{ __html: job.description }}
                    />
                  </CardContent>
                </Card>

                {/* Screening Criteria */}
                {job.criteria && (
                  <Card className="hover:shadow-md transition-shadow py-2">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <h2 className="text-lg font-semibold">
                          Screening Criteria
                        </h2>
                      </div>
                      <div
                        className="prose prose-sm dark:prose-invert max-w-none leading-7"
                        dangerouslySetInnerHTML={{ __html: job.criteria }}
                      />
                    </CardContent>
                  </Card>
                )}

                {/* Screening Email */}
                {job.screening_email && (
                  <Card className="hover:shadow-md transition-shadow py-2">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                          <Mail className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h2 className="text-lg font-semibold">
                          Screening Email
                        </h2>
                      </div>
                      <div
                        className="prose prose-sm dark:prose-invert max-w-none leading-7"
                        dangerouslySetInnerHTML={{
                          __html: job.screening_email,
                        }}
                      />
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Right Column - Metadata */}
              <div className="space-y-6">
                {/* Quick Details */}
                <Card className="hover:shadow-md transition-shadow py-2">
                  <CardContent className="p-4">
                    <h2 className="font-semibold mb-4">Quick Details</h2>
                    <div className="space-y-4">
                      {job.location && (
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm font-medium mb-1">Location</p>
                            <p className="text-sm text-muted-foreground">
                              {formatLocation(job.location)}
                            </p>
                          </div>
                        </div>
                      )}

                      {job.max_rate && (
                        <div className="flex items-start gap-3">
                          <DollarSign className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm font-medium mb-1">
                              Pay Range
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {job.max_rate}
                            </p>
                          </div>
                        </div>
                      )}

                      {job.openings && (
                        <div className="flex items-start gap-3">
                          <Users className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm font-medium mb-1">Openings</p>
                            <p className="text-sm text-muted-foreground">
                              {job.openings}
                            </p>
                          </div>
                        </div>
                      )}

                      {job.type && (
                        <div className="flex items-start gap-3">
                          <Briefcase className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm font-medium mb-1">
                              Employment Type
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {job.type === "H" ? "Hourly" : job.type}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Company */}
                {job.company && (
                  <Card className="hover:shadow-md transition-shadow py-2">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-4">
                        <Building2 className="h-5 w-5" />
                        <h2 className="font-semibold">Company</h2>
                      </div>
                      <p className="font-medium mb-1">{job.company.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {job.company.state} {job.company.postal_code}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Team */}
                <Card className="hover:shadow-md transition-shadow py-2">
                  <CardContent className="p-4">
                    <h2 className="font-semibold mb-4">Team</h2>
                    <div className="space-y-4">
                      {job.owner && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Owner
                          </p>
                          <p className="text-sm font-medium">
                            {job.owner.first_name} {job.owner.last_name}
                          </p>
                        </div>
                      )}

                      {job.recruiter && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Recruiter
                          </p>
                          <p className="text-sm font-medium">
                            {job.recruiter.first_name} {job.recruiter.last_name}
                          </p>
                        </div>
                      )}

                      {job.assigned_user && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Assigned User
                          </p>
                          <p className="text-sm font-medium">
                            {job.assigned_user.name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {job.assigned_user.email}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Timeline */}
                <Card className="hover:shadow-md transition-shadow py-2">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="h-5 w-5" />
                      <h2 className="font-semibold">Timeline</h2>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Created
                        </p>
                        <p className="text-sm font-medium">
                          {formatDate(job.date_created)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Last Modified
                        </p>
                        <p className="text-sm font-medium">
                          {formatDate(job.date_modified)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Application Forms */}
                {job.application_forms && job.application_forms.length > 0 && (
                  <Card className="hover:shadow-md transition-shadow py-2">
                    <CardContent className="p-4">
                      <h2 className="font-semibold mb-4">Application Forms</h2>
                      <ul className="space-y-2">
                        {job.application_forms.map((form) => (
                          <li
                            key={form.id}
                            className="text-sm flex items-center gap-2 text-muted-foreground"
                          >
                            <FileText className="h-4 w-4" />
                            {form.description}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Other Tabs - Placeholder */}
          <TabsContent value="conversion-funnel">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-12 text-center">
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Conversion Funnel Coming Soon
                </h3>
                <p className="text-muted-foreground">
                  Track candidate progression through your hiring pipeline
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applicants">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-12 text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Applicants Coming Soon
                </h3>
                <p className="text-muted-foreground">
                  View and manage all applicants for this job
                </p>
              </CardContent>
            </Card>
          </TabsContent>

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
