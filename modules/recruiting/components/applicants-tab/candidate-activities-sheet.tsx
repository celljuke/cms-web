"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Activity,
  AlertCircle,
  Calendar,
  User,
  FileText,
  MessageCircle,
  Mail,
  Star,
} from "lucide-react";
import { trpc } from "@/lib/trpc/client";
import { format, formatDistanceToNow } from "date-fns";
import type { Applicant } from "../../types";

interface CandidateActivitiesSheetProps {
  applicant: Applicant | null;
  onClose: () => void;
}

const getActivityIcon = (type: string, annotation: string | null) => {
  if (annotation?.toLowerCase().includes("status change")) {
    return AlertCircle;
  }
  if (annotation?.toLowerCase().includes("applied")) {
    return FileText;
  }
  if (type === "other") {
    return Activity;
  }
  return MessageCircle;
};

const getActivityColor = (annotation: string | null) => {
  if (!annotation) return "text-gray-600 dark:text-gray-400";

  if (annotation.toLowerCase().includes("submitted")) {
    return "text-blue-600 dark:text-blue-400";
  }
  if (annotation.toLowerCase().includes("attempt")) {
    return "text-orange-600 dark:text-orange-400";
  }
  if (annotation.toLowerCase().includes("applied")) {
    return "text-green-600 dark:text-green-400";
  }
  return "text-purple-600 dark:text-purple-400";
};

const getStatusColor = (status: string) => {
  const lowerStatus = status.toLowerCase();
  if (lowerStatus.includes("qualified")) {
    return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800";
  }
  if (lowerStatus.includes("interview")) {
    return "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800";
  }
  if (lowerStatus.includes("submitted")) {
    return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800";
  }
  return "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-800";
};

export function CandidateActivitiesSheet({
  applicant,
  onClose,
}: CandidateActivitiesSheetProps) {
  const { data, isLoading, error } =
    trpc.recruiting.getCandidateActivities.useQuery(
      { candidateId: applicant?.candidate_id! },
      {
        enabled: !!applicant,
      }
    );

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-3 w-3 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-none text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <Sheet
      open={applicant !== null}
      onOpenChange={(open) => !open && onClose()}
    >
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader className="p-6 space-y-4">
          <SheetTitle className="text-2xl font-bold">
            Candidate Activities
          </SheetTitle>

          {applicant && (
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-4">
                <Avatar className="h-14 w-14 border-2 border-primary/20">
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold text-lg">
                    {getInitials(applicant.full_name)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg mb-1">
                    {applicant.full_name}
                  </h3>

                  <div className="flex items-center gap-3 flex-wrap">
                    <a
                      href={`mailto:${applicant.email}`}
                      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      <span className="truncate">{applicant.email}</span>
                    </a>

                    <div className="flex items-center gap-1">
                      {renderStarRating(applicant.rating)}
                      <span className="text-xs text-muted-foreground ml-1">
                        ({applicant.rating}/5)
                      </span>
                    </div>
                  </div>

                  <div className="mt-2">
                    <Badge
                      className={getStatusColor(applicant.status)}
                      variant="outline"
                    >
                      {applicant.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          )}

          <SheetDescription className="text-sm text-muted-foreground">
            Complete timeline of all activities for this candidate
          </SheetDescription>
        </SheetHeader>
        <div className="px-6 pb-6">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                      <div className="h-4 w-full bg-muted rounded animate-pulse" />
                      <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error || !data ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Unable to load activities
                </h3>
                <p className="text-muted-foreground text-sm">
                  {error?.message ||
                    "An error occurred while loading candidate activities"}
                </p>
              </CardContent>
            </Card>
          ) : data.activities.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No activities yet
                </h3>
                <p className="text-muted-foreground text-sm">
                  No activities have been recorded for this candidate
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {Object.entries(
                data.activities.reduce((acc, activity) => {
                  const date = format(new Date(activity.date), "MMMM d, yyyy");
                  if (!acc[date]) {
                    acc[date] = [];
                  }
                  acc[date].push(activity);
                  return acc;
                }, {} as Record<string, typeof data.activities>)
              ).map(([date, dateActivities]) => (
                <div key={date}>
                  <div className="flex items-center gap-2 mb-4 sticky top-0 bg-background py-2 z-10">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-semibold text-sm">{date}</h3>
                  </div>

                  <div className="space-y-3 relative before:absolute before:left-[19px] before:top-0 before:bottom-0 before:w-px before:bg-border">
                    {dateActivities.map((activity) => {
                      const Icon = getActivityIcon(
                        activity.type,
                        activity.annotation
                      );
                      const iconColor = getActivityColor(activity.annotation);
                      const time = format(new Date(activity.date), "h:mm a");
                      const timeAgo = formatDistanceToNow(
                        new Date(activity.date),
                        {
                          addSuffix: true,
                        }
                      );

                      return (
                        <div key={activity.id} className="relative pl-12">
                          <div
                            className={`absolute left-0 top-2 h-10 w-10 rounded-full bg-background border-2 border-border flex items-center justify-center ${iconColor}`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>

                          <Card className="py-0">
                            <CardContent className="p-4">
                              <div className="space-y-3">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex-1">
                                    {activity.annotation && (
                                      <Badge variant="outline" className="mb-2">
                                        {activity.annotation}
                                      </Badge>
                                    )}
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                      <span>{time}</span>
                                      <span>•</span>
                                      <span>{timeAgo}</span>
                                    </div>
                                  </div>
                                </div>

                                {activity.notes && (
                                  <div className="text-sm leading-relaxed">
                                    {activity.notes
                                      .split("\n")
                                      .map((line, i) => (
                                        <p
                                          key={i}
                                          className={i > 0 ? "mt-2" : ""}
                                        >
                                          {line}
                                        </p>
                                      ))}
                                  </div>
                                )}

                                <div className="flex items-center gap-2 pt-2 border-t text-xs text-muted-foreground">
                                  <User className="h-3 w-3" />
                                  <span>User ID: {activity.entered_by_id}</span>
                                  <span>•</span>
                                  <span>Type: {activity.type}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
