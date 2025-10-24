"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, User } from "lucide-react";
import { ActivityItem } from "./activity-item";
import { trpc } from "@/lib/trpc/client";
import type { JobActivity } from "../../types";
import { format, parseISO, startOfDay, isToday, isYesterday } from "date-fns";
import { useMemo } from "react";

interface ActivitiesListProps {
  activities: JobActivity[];
  isLoading: boolean;
}

// Group activities by date and then by user
const groupActivitiesByDateAndUser = (activities: JobActivity[]) => {
  const dateGroups = new Map<string, Map<number, JobActivity[]>>();

  activities.forEach((activity) => {
    const date = startOfDay(parseISO(activity.date));
    const dateKey = date.toISOString();

    if (!dateGroups.has(dateKey)) {
      dateGroups.set(dateKey, new Map());
    }

    const userGroups = dateGroups.get(dateKey)!;
    const userId = activity.entered_by_id;

    if (!userGroups.has(userId)) {
      userGroups.set(userId, []);
    }
    userGroups.get(userId)!.push(activity);
  });

  // Sort groups by date (most recent first)
  return Array.from(dateGroups.entries())
    .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
    .map(([dateKey, userGroups]) => ({
      date: new Date(dateKey),
      userGroups: Array.from(userGroups.entries()).map(
        ([userId, activities]) => ({
          userId,
          activities: activities.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          ),
        })
      ),
    }));
};

const getDateLabel = (date: Date) => {
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  return format(date, "MMMM d, yyyy");
};

interface UserGroupProps {
  userId: number;
  activities: JobActivity[];
}

function UserGroup({ userId, activities }: UserGroupProps) {
  const { data: user } = trpc.recruiting.getActivityUser.useQuery(
    { userId },
    {
      staleTime: 1000 * 60 * 60, // 1 hour - user data doesn't change often
    }
  );

  const userName = user
    ? `${user.first_name} ${user.last_name}`.trim() || "Unknown User"
    : "Loading...";

  const isAutomated =
    user?.first_name === "CATS" && user?.last_name === "Automated";

  return (
    <div className="space-y-3">
      {/* User Header */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {userName}
              </span>
              {isAutomated && (
                <Badge variant="secondary" className="text-xs">
                  Automated
                </Badge>
              )}
            </div>
            <span className="text-xs text-muted-foreground">
              {activities.length}{" "}
              {activities.length === 1 ? "activity" : "activities"}
            </span>
          </div>
        </div>
      </div>

      {/* Activities */}
      <div className="space-y-3 pl-6 border-l-2 border-gray-200 dark:border-gray-800 ml-4">
        {activities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
}

export function ActivitiesList({ activities, isLoading }: ActivitiesListProps) {
  const groupedActivities = useMemo(
    () => groupActivitiesByDateAndUser(activities),
    [activities]
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i} className="p-4">
            <div className="flex gap-4">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <Card className="p-12">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
            <Activity className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            No activities yet
          </h3>
          <p className="text-sm text-muted-foreground">
            Activities will appear here as candidates interact with this job
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {groupedActivities.map((dateGroup) => (
        <div key={dateGroup.date.toISOString()}>
          {/* Date Header */}
          <div className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-950 py-3 mb-6">
            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 px-3">
                {getDateLabel(dateGroup.date)}
              </span>
              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
            </div>
            <div className="text-xs text-center text-muted-foreground mt-1">
              {dateGroup.userGroups.reduce(
                (sum, group) => sum + group.activities.length,
                0
              )}{" "}
              {dateGroup.userGroups.reduce(
                (sum, group) => sum + group.activities.length,
                0
              ) === 1
                ? "activity"
                : "activities"}
            </div>
          </div>

          {/* User Groups */}
          <div className="space-y-6">
            {dateGroup.userGroups.map((userGroup) => (
              <UserGroup
                key={userGroup.userId}
                userId={userGroup.userId}
                activities={userGroup.activities}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
