"use client";

import { Users, Award, TrendingUp, Sparkles } from "lucide-react";
import type { RecommendedCandidate } from "../../types";

interface RecommendationsStatsProps {
  candidates: RecommendedCandidate[];
}

export function RecommendationsStats({
  candidates,
}: RecommendationsStatsProps) {
  const stats = {
    total: candidates.length,
    highMatch: candidates.filter((c) => c.score >= 0.8).length,
    avgExperience:
      candidates.length > 0
        ? Math.round(
            candidates.reduce((sum, c) => sum + c.experience_years, 0) /
              candidates.length
          )
        : 0,
    withCertifications: candidates.filter(
      (c) => c.certifications && c.certifications.length > 0
    ).length,
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Users className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Candidates</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">High Match (80%+)</p>
            <p className="text-2xl font-bold">{stats.highMatch}</p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-purple-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Avg. Experience</p>
            <p className="text-2xl font-bold">{stats.avgExperience} yrs</p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
            <Award className="h-6 w-6 text-orange-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">With Certifications</p>
            <p className="text-2xl font-bold">{stats.withCertifications}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
