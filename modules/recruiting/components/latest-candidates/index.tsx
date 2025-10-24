"use client";

import { useState, useMemo } from "react";
import { WindowVirtualizer } from "virtua";
import { useLatestCandidates } from "../../hooks/use-latest-candidates";
import { LatestCandidateCard } from "./latest-candidate-card";
import { LatestCandidateDetail } from "./latest-candidate-detail";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, Loader2, RefreshCw, Users, Search } from "lucide-react";

export function LatestCandidates() {
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(
    null
  );
  const [showDetail, setShowDetail] = useState(false);
  const [windowDays, setWindowDays] = useState(2);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: candidatesData,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useLatestCandidates(50, windowDays);

  // Filter candidates based on search
  const filteredCandidates = useMemo(() => {
    if (!candidatesData?.candidates) return [];
    if (!searchQuery.trim()) return candidatesData.candidates;

    const query = searchQuery.toLowerCase().trim();
    return candidatesData.candidates.filter((candidate) => {
      const fullName =
        `${candidate.first_name} ${candidate.last_name}`.toLowerCase();
      const email = candidate.email?.toLowerCase() || "";
      const city = candidate.city?.toLowerCase() || "";
      const state = candidate.state?.toLowerCase() || "";

      return (
        fullName.includes(query) ||
        email.includes(query) ||
        city.includes(query) ||
        state.includes(query)
      );
    });
  }, [candidatesData?.candidates, searchQuery]);

  const handleCardClick = (candidateId: number) => {
    setSelectedCandidateId(candidateId);
    setShowDetail(true);
  };

  const handleViewInCats = (_e: React.MouseEvent, candidateId: number) => {
    const url = `https://match.catsone.com/index.php?m=candidates&a=show&candidateID=${candidateId}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedCandidateId(null);
  };

  const selectedCandidate = candidatesData?.candidates.find(
    (c) => c.id === selectedCandidateId
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Skeleton className="h-10 w-full max-w-md" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-lg" />
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
          Failed to Load Candidates
        </h3>
        <p className="text-sm text-muted-foreground mb-4 text-center max-w-md">
          {error?.message ||
            "An error occurred while fetching latest candidates"}
        </p>
        <Button onClick={() => refetch()} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      </div>
    );
  }

  if (!candidatesData || candidatesData.candidates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="bg-muted rounded-full p-4 mb-4">
          <Users className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No Recent Candidates</h3>
        <p className="text-sm text-muted-foreground text-center max-w-md">
          No new candidates found in the last {windowDays} days.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6 pb-8">
        {/* Header */}
        <div className="flex items-start md:items-center justify-between gap-4 flex-col md:flex-row">
          <div>
            <h2 className="text-2xl font-bold">Latest Candidates</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Showing most recent candidates
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Select
              value={windowDays.toString()}
              onValueChange={(value) => setWindowDays(Number(value))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Last 24 hours</SelectItem>
                <SelectItem value="2">Last 2 days</SelectItem>
                <SelectItem value="3">Last 5 days</SelectItem>
                <SelectItem value="7">Last 7 days</SelectItem>
              </SelectContent>
            </Select>

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
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search name, email, city, state..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Candidates List with Virtual Scrolling */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Showing {filteredCandidates.length} of {candidatesData.count}{" "}
              candidate{candidatesData.count !== 1 ? "s" : ""}
            </span>
            <span>Auto-refreshes every 5 min</span>
          </div>

          {filteredCandidates.length > 0 ? (
            <WindowVirtualizer>
              {filteredCandidates.map((candidate) => (
                <div key={candidate.id} className="mb-3">
                  <LatestCandidateCard
                    candidate={candidate}
                    onClick={() => handleCardClick(candidate.id)}
                    onViewInCats={handleViewInCats}
                  />
                </div>
              ))}
            </WindowVirtualizer>
          ) : (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                No candidates found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search query
              </p>
            </div>
          )}
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
              Complete candidate information
            </SheetDescription>
          </SheetHeader>

          <div className="px-6 pb-6">
            {selectedCandidate && (
              <LatestCandidateDetail
                candidate={selectedCandidate}
                onViewInCats={(id) =>
                  handleViewInCats({} as React.MouseEvent, id)
                }
              />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
