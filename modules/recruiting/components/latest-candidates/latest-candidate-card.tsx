"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, ExternalLink, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { LatestCandidate } from "../../types";

interface LatestCandidateCardProps {
  candidate: LatestCandidate;
  onClick?: () => void;
  onViewInCats?: (e: React.MouseEvent, candidateId: number) => void;
}

export function LatestCandidateCard({
  candidate,
  onClick,
  onViewInCats,
}: LatestCandidateCardProps) {
  const initials =
    `${candidate.first_name[0]}${candidate.last_name[0]}`.toUpperCase();
  const fullName = `${candidate.first_name} ${candidate.last_name}`;
  const timeAgo = formatDistanceToNow(new Date(candidate.date_created), {
    addSuffix: true,
  });

  return (
    <Card
      className="p-3 hover:bg-muted/50 transition-all duration-200 cursor-pointer shadow-none"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold bg-primary/10 text-primary border-2 border-primary/20">
            {initials}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="text-sm font-semibold text-foreground truncate">
              {fullName}
            </h3>
            <Badge
              variant="outline"
              className="text-xs font-mono flex-shrink-0"
            >
              {candidate.id}
            </Badge>
          </div>

          {/* Contact Info */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
            {candidate.email && (
              <div className="flex items-center gap-1 truncate max-w-[250px]">
                <Mail className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{candidate.email}</span>
              </div>
            )}
            {(candidate.city || candidate.state) && (
              <div className="flex items-center gap-1 flex-shrink-0">
                <MapPin className="h-3 w-3" />
                <span>
                  {[candidate.city, candidate.state].filter(Boolean).join(", ")}
                </span>
              </div>
            )}
            <div className="flex items-center gap-1 flex-shrink-0">
              <Clock className="h-3 w-3" />
              <span>{timeAgo}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex-shrink-0">
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
