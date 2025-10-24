"use client";

import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useJobCreationStore } from "../../../stores/job-creation-store";
import {
  Building2,
  MapPin,
  Briefcase,
  Calendar,
  DollarSign,
  FileText,
  Users,
  Tag,
  Clock,
} from "lucide-react";
import { format } from "date-fns";

interface ReviewStepProps {
  onValidationChange: (isValid: boolean) => void;
}

export function ReviewStep({ onValidationChange }: ReviewStepProps) {
  const { formData, selectedCompany, reviewMetadata } = useJobCreationStore();

  // Always valid for review
  useEffect(() => {
    onValidationChange(true);
  }, [onValidationChange]);

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card className="p-6 shadow-none">
        <div className="flex items-center gap-2 mb-4">
          <Briefcase className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Basic Information</h3>
        </div>
        <div className="space-y-3">
          <div>
            <div className="text-sm text-muted-foreground">Job Title</div>
            <div className="font-medium">{formData.title || "—"}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Description</div>
            <div className="text-sm line-clamp-3">
              {formData.description || "—"}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Type</div>
              <Badge variant="secondary">{formData.type || "—"}</Badge>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Openings</div>
              <div className="font-medium">{formData.openings || "—"}</div>
            </div>
          </div>
          {formData.remote_type && (
            <div>
              <div className="text-sm text-muted-foreground">Remote Type</div>
              <Badge variant="outline">{formData.remote_type}</Badge>
            </div>
          )}
          {formData.is_hot && (
            <div>
              <Badge variant="destructive">Hot Job</Badge>
            </div>
          )}
        </div>
      </Card>

      {/* Location */}
      <Card className="p-6 shadow-none">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Location</h3>
        </div>
        <div className="space-y-2">
          <div className="font-medium">
            {[formData.city, formData.state].filter(Boolean).join(", ") || "—"}
          </div>
          {formData.postal_code && (
            <div className="text-sm text-muted-foreground">
              {formData.postal_code}
            </div>
          )}
          <div className="text-sm text-muted-foreground">
            {formData.country_code || "—"}
          </div>
        </div>
      </Card>

      {/* Company */}
      <Card className="p-6 shadow-none">
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Company & Team</h3>
        </div>
        <div className="space-y-3">
          <div>
            <div className="text-sm text-muted-foreground">Company</div>
            <div className="font-medium">{selectedCompany?.name || "—"}</div>
          </div>
          {reviewMetadata.department && (
            <div>
              <div className="text-sm text-muted-foreground">Department</div>
              <div className="font-medium">
                {reviewMetadata.department.name}
              </div>
            </div>
          )}
          {reviewMetadata.contact && (
            <div>
              <div className="text-sm text-muted-foreground">Contact</div>
              <div className="font-medium">
                {reviewMetadata.contact.first_name}{" "}
                {reviewMetadata.contact.last_name}
                {reviewMetadata.contact.title &&
                  ` - ${reviewMetadata.contact.title}`}
              </div>
            </div>
          )}
          {reviewMetadata.recruiter && (
            <div>
              <div className="text-sm text-muted-foreground">Recruiter</div>
              <div className="font-medium">{reviewMetadata.recruiter.name}</div>
            </div>
          )}
          {reviewMetadata.categoryName && (
            <div>
              <div className="text-sm text-muted-foreground">Category</div>
              <div className="font-medium">{reviewMetadata.categoryName}</div>
            </div>
          )}
          {reviewMetadata.workflow && (
            <div>
              <div className="text-sm text-muted-foreground">Workflow</div>
              <div className="font-medium">
                {reviewMetadata.workflow.title}
                {reviewMetadata.workflow.is_default && (
                  <Badge variant="secondary" className="ml-2">
                    Default
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Job Details */}
      {(formData.start_date ||
        formData.salary ||
        formData.max_rate ||
        formData.duration ||
        formData.job_close_schedule_time) && (
        <Card className="p-6 shadow-none">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Job Details</h3>
          </div>
          <div className="space-y-3">
            {formData.start_date && (
              <div>
                <div className="text-sm text-muted-foreground">Start Date</div>
                <div className="font-medium">{formData.start_date}</div>
              </div>
            )}
            {formData.salary && (
              <div>
                <div className="text-sm text-muted-foreground">Salary</div>
                <div className="font-medium">{formData.salary}</div>
              </div>
            )}
            {formData.max_rate && (
              <div>
                <div className="text-sm text-muted-foreground">Max Rate</div>
                <div className="font-medium">{formData.max_rate}</div>
              </div>
            )}
            {formData.duration && (
              <div>
                <div className="text-sm text-muted-foreground">Duration</div>
                <div className="font-medium">{formData.duration}</div>
              </div>
            )}
            {formData.job_close_schedule_time && (
              <div className="pt-2 border-t">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <div className="text-sm font-medium">Auto Close Job</div>
                </div>
                <div className="space-y-2 ml-6">
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Scheduled Close Date & Time
                    </div>
                    <div className="font-medium">
                      {format(
                        new Date(formData.job_close_schedule_time),
                        "PPP 'at' p"
                      )}
                    </div>
                  </div>
                  {formData.time_zone && (
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Timezone
                      </div>
                      <Badge variant="outline">{formData.time_zone}</Badge>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Tags & Groups */}
      {((formData.tags && formData.tags.length > 0) ||
        (formData.user_groups && formData.user_groups.length > 0)) && (
        <Card className="p-6 shadow-none">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Tags & Groups</h3>
          </div>
          <div className="space-y-3">
            {formData.tags && formData.tags.length > 0 && (
              <div>
                <div className="text-sm text-muted-foreground mb-2">Tags</div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {formData.user_groups && formData.user_groups.length > 0 && (
              <div>
                <div className="text-sm text-muted-foreground mb-2">
                  User Groups
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.user_groups.map((group) => (
                    <Badge key={group} variant="outline">
                      {group}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Applications */}
      {formData.applications && formData.applications.length > 0 && (
        <Card className="p-6 shadow-none">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Application Forms</h3>
          </div>
          <div className="space-y-2">
            {formData.applications.map((app) => (
              <div key={app.id} className="flex items-center gap-2">
                <Badge variant="secondary">
                  {app.id === 6274
                    ? "General"
                    : app.id === 6275
                    ? "EEO-1 Compliance Questionnaire"
                    : `Application ${app.id}`}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
