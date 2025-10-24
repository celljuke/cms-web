"use client";

import { useJobActivities } from "../../hooks/use-job-activities";
import { ActivitiesStats } from "./activities-stats";
import { ActivitiesList } from "./activities-list";

interface ActivitiesTabProps {
  jobId: number;
}

export function ActivitiesTab({ jobId }: ActivitiesTabProps) {
  const { activities, isLoading } = useJobActivities(jobId);

  return (
    <div className="space-y-6">
      {/* Stats */}
      {!isLoading && activities.length > 0 && (
        <ActivitiesStats activities={activities} />
      )}

      {/* Activities List */}
      <ActivitiesList activities={activities} isLoading={isLoading} />
    </div>
  );
}
