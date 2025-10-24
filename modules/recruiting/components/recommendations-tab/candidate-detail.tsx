"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Building2,
  Globe,
  Mail,
  ExternalLink,
  Users,
} from "lucide-react";
import type { RecommendedCandidate } from "../../types";

interface CandidateDetailProps {
  candidate: RecommendedCandidate;
  rank: number;
  onViewInCats?: (candidateId: string) => void;
  onViewSimilar?: (candidateId: string) => void;
}

export function CandidateDetail({
  candidate,
  rank,
  onViewInCats,
  onViewSimilar,
}: CandidateDetailProps) {
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 relative">
          <div
            className={`h-20 w-20 rounded-full flex items-center justify-center text-3xl font-bold border-2 ${getScoreColor(
              matchScore
            )}`}
          >
            {initials}
          </div>
          <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shadow-md">
            #{rank}
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-2xl font-bold">{candidate.name}</h2>
            <div
              className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${getScoreBadgeColor(
                matchScore
              )}`}
            >
              {matchScore}% Match
            </div>
          </div>

          {/* Contact & Location */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {candidate.email && (
              <div className="flex items-center gap-1.5">
                <Mail className="h-4 w-4" />
                <span>{candidate.email}</span>
              </div>
            )}
            {(candidate.city || candidate.state) && (
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                <span>
                  {[candidate.city, candidate.state].filter(Boolean).join(", ")}
                </span>
              </div>
            )}
            {candidate.experience_years > 0 && (
              <div className="flex items-center gap-1.5">
                <Briefcase className="h-4 w-4" />
                <span>{candidate.experience_years} years experience</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4">
            {onViewInCats && (
              <Button
                onClick={() => onViewInCats(candidate.id)}
                className="gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                View in CATS
              </Button>
            )}
            {onViewSimilar && (
              <Button
                onClick={() => onViewSimilar(candidate.id)}
                variant="outline"
                className="gap-2"
              >
                <Users className="h-4 w-4" />
                Find Similar Candidates
              </Button>
            )}
          </div>
        </div>
      </div>

      <Separator />

      {/* Skills */}
      {candidate.skills && candidate.skills.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Award className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Top Skills</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {candidate.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Recent Roles */}
      {candidate.roles && candidate.roles.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Briefcase className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Recent Roles</h3>
          </div>
          <div className="space-y-2">
            {candidate.roles.map((role, index) => (
              <div
                key={index}
                className="text-sm text-foreground bg-muted p-3 rounded-lg"
              >
                • {role}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {candidate.education && candidate.education.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Education</h3>
          </div>
          <div className="space-y-2">
            {candidate.education.map((edu, index) => (
              <div
                key={index}
                className="text-sm text-foreground bg-muted p-3 rounded-lg"
              >
                • {edu}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Industries */}
      {candidate.industries && candidate.industries.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Building2 className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Industries</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {candidate.industries.map((industry, index) => (
              <Badge key={index} variant="outline" className="text-sm">
                {industry}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {candidate.languages && candidate.languages.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Globe className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Languages</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {candidate.languages.map((lang, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {candidate.certifications && candidate.certifications.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Award className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">
              Certifications ({candidate.certifications.length})
            </h3>
          </div>
          <div className="space-y-2">
            {candidate.certifications.map((cert, index) => (
              <div
                key={index}
                className="text-sm text-foreground bg-muted p-3 rounded-lg"
              >
                • {cert}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
