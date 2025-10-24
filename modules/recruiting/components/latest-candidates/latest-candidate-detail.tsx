"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Mail,
  ExternalLink,
  Clock,
  FileText,
  Calendar,
  User,
  Home,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import type { LatestCandidate } from "../../types";

interface LatestCandidateDetailProps {
  candidate: LatestCandidate;
  onViewInCats?: (candidateId: number) => void;
}

export function LatestCandidateDetail({
  candidate,
  onViewInCats,
}: LatestCandidateDetailProps) {
  const initials =
    `${candidate.first_name[0]}${candidate.last_name[0]}`.toUpperCase();
  const fullName = `${candidate.first_name} ${candidate.last_name}`;
  const timeAgo = formatDistanceToNow(new Date(candidate.date_created), {
    addSuffix: true,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="h-20 w-20 rounded-full flex items-center justify-center text-3xl font-bold bg-primary/10 text-primary border-2 border-primary/20">
            {initials}
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{fullName}</h2>

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
            <Clock className="h-4 w-4" />
            <span>Added {timeAgo}</span>
            <span className="mx-2">•</span>
            <Calendar className="h-4 w-4" />
            <span>{format(new Date(candidate.date_created), "PPp")}</span>
          </div>

          {/* Action Button */}
          {onViewInCats && (
            <Button
              onClick={() => onViewInCats(candidate.id)}
              className="gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              View in CATS
            </Button>
          )}
        </div>
      </div>

      <Separator />

      {/* Candidate ID */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <User className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold">Candidate ID</h3>
        </div>
        <Badge variant="outline" className="text-sm font-mono px-3 py-1">
          {candidate.id}
        </Badge>
      </div>

      {/* Contact Information */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Mail className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold">Contact Information</h3>
        </div>
        <div className="space-y-3">
          {candidate.email && (
            <div className="flex items-start gap-3 text-sm bg-muted p-3 rounded-lg">
              <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                <p className="text-foreground">{candidate.email}</p>
              </div>
            </div>
          )}

          {(candidate.city || candidate.state) && (
            <div className="flex items-start gap-3 text-sm bg-muted p-3 rounded-lg">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Location</p>
                <p className="text-foreground">
                  {[candidate.city, candidate.state].filter(Boolean).join(", ")}
                </p>
              </div>
            </div>
          )}

          {candidate.address && (
            <div className="flex items-start gap-3 text-sm bg-muted p-3 rounded-lg">
              <Home className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Address</p>
                <p className="text-foreground">{candidate.address}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Notes */}
      {candidate.notes && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Notes</h3>
          </div>
          <div className="bg-muted p-4 rounded-lg text-sm text-foreground whitespace-pre-wrap">
            {candidate.notes}
          </div>
        </div>
      )}

      {/* Timestamps */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold">Timeline</h3>
        </div>
        <div className="space-y-2">
          <div className="flex items-start gap-3 text-sm bg-muted p-3 rounded-lg">
            <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Created</p>
              <p className="text-foreground">
                {format(new Date(candidate.date_created), "PPpp")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 text-sm bg-muted p-3 rounded-lg">
            <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">
                Last Modified
              </p>
              <p className="text-foreground">
                {format(new Date(candidate.date_modified), "PPpp")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
