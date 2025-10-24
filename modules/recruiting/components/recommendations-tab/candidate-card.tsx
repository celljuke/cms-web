"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, ExternalLink, Users } from "lucide-react";
import type { RecommendedCandidate } from "../../types";

interface CandidateCardProps {
  candidate: RecommendedCandidate;
  rank: number;
  onClick?: () => void;
  onViewInCats?: (e: React.MouseEvent, candidateId: string) => void;
  onViewSimilar?: (e: React.MouseEvent, candidateId: string) => void;
}

export function CandidateCard({
  candidate,
  rank,
  onClick,
  onViewInCats,
  onViewSimilar,
}: CandidateCardProps) {
  const matchScore = Math.round(candidate.score * 100);
  const initials = candidate.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 60) return "text-blue-600 bg-blue-50 border-blue-200";
    if (score >= 40) return "text-orange-600 bg-orange-50 border-orange-200";
    return "text-gray-600 bg-gray-50 border-gray-200";
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-blue-500";
    if (score >= 40) return "bg-orange-500";
    return "bg-gray-500";
  };

  return (
    <Card
      className="p-4 hover:bg-muted/50 transition-all duration-200 cursor-pointer shadow-none"
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        {/* Rank Badge with Initials */}
        <div className="flex-shrink-0 relative">
          <div
            className={`h-12 w-12 rounded-full flex items-center justify-center text-lg font-bold border-2 ${getScoreColor(
              matchScore
            )}`}
          >
            {initials}
          </div>
          <div className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shadow-md">
            #{rank}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <h3 className="text-base font-semibold text-foreground truncate">
                {candidate.name}
              </h3>
              <div
                className={`px-2 py-0.5 rounded-full text-xs font-semibold text-white ${getScoreBadgeColor(
                  matchScore
                )} flex-shrink-0`}
              >
                {matchScore}% Match
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
            {(candidate.city || candidate.state) && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>
                  {[candidate.city, candidate.state].filter(Boolean).join(", ")}
                </span>
              </div>
            )}
            {candidate.experience_years > 0 && (
              <div className="flex items-center gap-1">
                <Briefcase className="h-3 w-3" />
                <span>{candidate.experience_years} years exp.</span>
              </div>
            )}
          </div>

          {/* Top Skills - Limited to 5 */}
          {candidate.skills && candidate.skills.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {candidate.skills.slice(0, 5).map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs font-normal"
                >
                  {skill}
                </Badge>
              ))}
              {candidate.skills.length > 5 && (
                <Badge variant="outline" className="text-xs">
                  +{candidate.skills.length - 5} more
                </Badge>
              )}
            </div>
          )}

          {/* Recent Role */}
          {candidate.roles && candidate.roles.length > 0 && (
            <p className="text-xs text-muted-foreground line-clamp-1">
              • {candidate.roles[0]}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 flex-shrink-0">
          {onViewSimilar && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onViewSimilar(e, candidate.id);
              }}
              className="gap-1"
            >
              <Users className="h-4 w-4" />
              Similar
            </Button>
          )}
          {onViewInCats && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onViewInCats(e, candidate.id);
              }}
              className="gap-1"
            >
              <ExternalLink className="h-4 w-4" />
              View in CATS
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
