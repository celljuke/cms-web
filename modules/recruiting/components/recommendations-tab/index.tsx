"use client";

import { useState } from "react";
import { WindowVirtualizer } from "virtua";
import { useJobRecommendations } from "../../hooks/use-job-recommendations";
import { useSimilarCandidates } from "../../hooks/use-similar-candidates";
import { RecommendationsStats } from "./recommendations-stats";
import { CandidateCard } from "./candidate-card";
import { CandidateDetail } from "./candidate-detail";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AlertCircle, ArrowLeft, Loader2, RefreshCw } from "lucide-react";

interface RecommendationsTabProps {
  jobId: number;
}

export function RecommendationsTab({ jobId }: RecommendationsTabProps) {
  const [selectedCandidate, setSelectedCandidate] = useState<{
    id: string;
    rank: number;
  } | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showSimilar, setShowSimilar] = useState(false);
  const [similarCandidateId, setSimilarCandidateId] = useState<string | null>(
    null
  );

  const {
    data: recommendations,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useJobRecommendations(jobId);

  const {
    data: similarCandidates,
    isLoading: isSimilarLoading,
    isError: isSimilarError,
  } = useSimilarCandidates(similarCandidateId || "", 50, showSimilar);

  const handleCardClick = (candidateId: string, rank: number) => {
    setSelectedCandidate({ id: candidateId, rank });
    setShowDetail(true);
  };

  const handleViewInCats = (_e: React.MouseEvent, candidateId: string) => {
    const url = `https://match.catsone.com/index.php?m=candidates&a=show&candidateID=${candidateId}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleViewSimilar = (_e: React.MouseEvent, candidateId: string) => {
    setSimilarCandidateId(candidateId);
    setShowSimilar(true);
  };

  const handleCloseSimilar = () => {
    setShowSimilar(false);
    setSimilarCandidateId(null);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedCandidate(null);
  };

  const candidate = recommendations?.candidates.find(
    (c) => c.id === selectedCandidate?.id
  );

  const similarSourceCandidate = recommendations?.candidates.find(
    (c) => c.id === similarCandidateId
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-lg" />
          ))}
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="bg-destructive/10 rounded-full p-4 mb-4">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <h3 className="text-lg font-semibold mb-2">
          Failed to Load Recommendations
        </h3>
        <p className="text-sm text-muted-foreground mb-4 text-center max-w-md">
          {error?.message ||
            "An error occurred while fetching AI recommendations"}
        </p>
        <Button onClick={() => refetch()} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      </div>
    );
  }

  if (!recommendations || recommendations.candidates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="bg-muted rounded-full p-4 mb-4">
          <AlertCircle className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No Recommendations Found</h3>
        <p className="text-sm text-muted-foreground text-center max-w-md">
          No matching candidates were found for this job position.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">AI-Powered Recommendations</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Found {recommendations.total_found} candidates using{" "}
              <Badge variant="secondary" className="text-xs">
                {recommendations.search_method}
              </Badge>{" "}
              algorithm
            </p>
          </div>
          <Button
            onClick={() => refetch()}
            variant="outline"
            size="sm"
            disabled={isRefetching}
          >
            {isRefetching ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Refresh
          </Button>
        </div>

        {/* Stats */}
        <RecommendationsStats candidates={recommendations.candidates} />

        {/* Virtual List with Window Scrolling */}
        <div className="space-y-4">
          <WindowVirtualizer>
            {recommendations.candidates.map((candidate, index) => (
              <div key={candidate.id} className="mb-4">
                <CandidateCard
                  candidate={candidate}
                  rank={index + 1}
                  onClick={() => handleCardClick(candidate.id, index + 1)}
                  onViewInCats={handleViewInCats}
                  onViewSimilar={handleViewSimilar}
                />
              </div>
            ))}
          </WindowVirtualizer>
        </div>
      </div>

      {/* Candidate Detail Sheet */}
      <Sheet open={showDetail} onOpenChange={handleCloseDetail}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader className="p-6 space-y-1">
            <SheetTitle className="text-2xl font-bold">
              Candidate Details
            </SheetTitle>
            <SheetDescription className="text-base">
              Complete profile and qualifications
            </SheetDescription>
          </SheetHeader>

          <div className="px-6 pb-6">
            {candidate && selectedCandidate && (
              <CandidateDetail
                candidate={candidate}
                rank={selectedCandidate.rank}
                onViewInCats={(id) =>
                  handleViewInCats({} as React.MouseEvent, id)
                }
                onViewSimilar={(_id) => {
                  setSimilarCandidateId(candidate.id);
                  setShowSimilar(true);
                }}
              />
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Similar Candidates Sheet */}
      <Sheet open={showSimilar} onOpenChange={handleCloseSimilar}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader className="p-6 space-y-1">
            <SheetTitle className="text-2xl font-bold flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCloseSimilar}
                className="mr-2 -ml-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              Similar Candidates
            </SheetTitle>
            <SheetDescription className="text-base">
              {similarSourceCandidate && (
                <>
                  Candidates similar to{" "}
                  <span className="font-semibold text-foreground">
                    {similarSourceCandidate.name}
                  </span>
                </>
              )}
            </SheetDescription>
          </SheetHeader>

          <div className="px-6 pb-6 space-y-4">
            {isSimilarLoading && (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-32 rounded-lg" />
                ))}
              </div>
            )}

            {isSimilarError && (
              <div className="flex flex-col items-center justify-center py-8">
                <AlertCircle className="h-8 w-8 text-destructive mb-2" />
                <p className="text-sm text-muted-foreground">
                  Failed to load similar candidates
                </p>
              </div>
            )}

            {similarCandidates &&
              similarCandidates.similar_candidates.length > 0 && (
                <>
                  <div className="text-sm text-muted-foreground mb-4">
                    Found {similarCandidates.total_found} similar candidates
                  </div>
                  {similarCandidates.similar_candidates.map(
                    (candidate, index) => (
                      <CandidateCard
                        key={candidate.id}
                        candidate={candidate}
                        rank={index + 1}
                        onClick={() => {
                          handleCloseSimilar();
                          handleCardClick(candidate.id, index + 1);
                        }}
                        onViewInCats={handleViewInCats}
                      />
                    )
                  )}
                </>
              )}

            {similarCandidates &&
              similarCandidates.similar_candidates.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8">
                  <p className="text-sm text-muted-foreground">
                    No similar candidates found
                  </p>
                </div>
              )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
