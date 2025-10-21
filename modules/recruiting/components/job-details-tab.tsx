"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  CheckCircle2,
  Mail,
  MapPin,
  DollarSign,
  Users,
  Briefcase,
  Building2,
  Clock,
} from "lucide-react";
import type { JobDetail } from "../types";

interface JobDetailsTabProps {
  job: JobDetail;
}

export function JobDetailsTab({ job }: JobDetailsTabProps) {
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Main Details */}
      <div className="lg:col-span-2 space-y-6">
        {/* Job Description */}
        <Card className="py-2 shadow-none">
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
          <Card className="py-2 shadow-none">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-lg font-semibold">Screening Criteria</h2>
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
          <Card className="py-2 shadow-none">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-lg font-semibold">Screening Email</h2>
              </div>
              <div
                className="prose prose-sm dark:prose-invert max-w-none leading-7"
                dangerouslySetInnerHTML={{ __html: job.screening_email }}
              />
            </CardContent>
          </Card>
        )}
      </div>

      {/* Right Column - Metadata */}
      <div className="space-y-6">
        {/* Quick Details */}
        <Card className="py-2 shadow-none">
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
                    <p className="text-sm font-medium mb-1">Pay Range</p>
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
                    <p className="text-sm font-medium mb-1">Employment Type</p>
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
          <Card className="py-2 shadow-none">
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
        <Card className="py-2 shadow-none">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-4">Team</h2>
            <div className="space-y-4">
              {job.owner && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Owner</p>
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
        <Card className="py-2 shadow-none">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5" />
              <h2 className="font-semibold">Timeline</h2>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Created</p>
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
          <Card className="py-2 shadow-none">
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
  );
}
