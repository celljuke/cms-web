"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";

export function JobsSkeleton() {
  return (
    <div className="space-y-4">
      {/* Loading Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="relative">
            <svg
              className="animate-spin h-8 w-8 text-primary"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">
              Connecting to ATS
            </div>
            <div className="text-xs text-muted-foreground/70 mt-1">
              Pulling your job data...
            </div>
          </div>
        </div>

        {/* Animated Progress Bar */}
        <div className="w-64 mx-auto">
          <Progress value={65} className="h-1.5 animate-pulse" />
        </div>
      </div>

      {/* Skeleton Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <Card
            key={index}
            className="group h-full shadow-none py-2 animate-pulse"
          >
            <CardContent className="p-4 h-full flex flex-col">
              {/* Header with Status */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              </div>

              {/* Job Title */}
              <div className="mb-2 min-h-[3rem]">
                <Skeleton className="h-5 w-full mb-2" />
                <Skeleton className="h-5 w-3/4" />
              </div>

              {/* Job ID */}
              <Skeleton className="h-4 w-24 mb-3" />

              {/* Description */}
              <div className="space-y-2 mb-4 flex-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 mb-4">
                <Skeleton className="h-3.5 w-3.5 rounded" />
                <Skeleton className="h-4 w-32" />
              </div>

              {/* Footer with Metadata */}
              <div className="pt-3 border-t mt-auto space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Skeleton className="h-3.5 w-3.5 rounded" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Skeleton className="h-3.5 w-3.5 rounded" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 mt-4 pt-3 border-t">
                <Skeleton className="h-8 flex-1 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
