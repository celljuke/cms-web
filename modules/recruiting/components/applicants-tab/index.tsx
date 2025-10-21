"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion } from "@/components/ui/accordion";
import { Users, AlertCircle, Star } from "lucide-react";
import { useApplicantsData } from "../../hooks/use-applicants-data";
import { ApplicantsStats } from "./applicants-stats";
import { ApplicantsFilters } from "./applicants-filters";
import { ApplicantSection } from "./applicant-section";
import { CandidateActivitiesSheet } from "./candidate-activities-sheet";
import type { Applicant } from "../../types";

interface ApplicantsTabProps {
  applicants: Applicant[];
}

export function ApplicantsTab({ applicants }: ApplicantsTabProps) {
  const [selectedCandidate, setSelectedCandidate] = useState<Applicant | null>(
    null
  );

  const {
    searchQuery,
    statusFilter,
    uniqueStatuses,
    handleSearchChange,
    handleStatusChange,
    filteredApplicants,
    allNeedsAttention,
    allInterviews,
    allQualified,
    allOthers,
    needsAttention,
    interviews,
    qualified,
    others,
    needsAttentionPage,
    setNeedsAttentionPage,
    interviewsPage,
    setInterviewsPage,
    qualifiedPage,
    setQualifiedPage,
    othersPage,
    setOthersPage,
  } = useApplicantsData({ applicants });

  // Determine default open value based on sections
  const sections = [
    {
      value: "needs-attention",
      totalItems: needsAttention.totalItems,
    },
    {
      value: "interviews",
      totalItems: interviews.totalItems,
    },
    {
      value: "qualified",
      totalItems: qualified.totalItems,
    },
    {
      value: "others",
      totalItems: others.totalItems,
    },
  ].filter((section) => section.totalItems > 0);

  const defaultOpen = sections.length === 1 ? [sections[0].value] : [];

  return (
    <>
      <div className="space-y-6">
        {/* Stats Cards */}
        <ApplicantsStats
          needsAttention={allNeedsAttention.length}
          interviews={allInterviews.length}
          qualified={allQualified.length}
          others={allOthers.length}
        />

        {/* Filters */}
        <ApplicantsFilters
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          uniqueStatuses={uniqueStatuses}
          onSearchChange={handleSearchChange}
          onStatusChange={handleStatusChange}
        />

        {/* Accordion Sections */}
        {filteredApplicants.length > 0 ? (
          <Accordion
            type="multiple"
            defaultValue={defaultOpen}
            className="space-y-4"
          >
            <ApplicantSection
              value="needs-attention"
              title="Needs Attention"
              description="Candidates requiring immediate review"
              icon={AlertCircle}
              iconColor="text-orange-600 dark:text-orange-400"
              bgColor="bg-orange-500/10"
              applicants={needsAttention.items}
              totalItems={needsAttention.totalItems}
              totalPages={needsAttention.totalPages}
              currentPage={needsAttentionPage}
              onPageChange={setNeedsAttentionPage}
              onViewActivities={setSelectedCandidate}
            />

            <ApplicantSection
              value="interviews"
              title="Interviews"
              description="Candidates in interview stage"
              icon={Users}
              iconColor="text-purple-600 dark:text-purple-400"
              bgColor="bg-purple-500/10"
              applicants={interviews.items}
              totalItems={interviews.totalItems}
              totalPages={interviews.totalPages}
              currentPage={interviewsPage}
              onPageChange={setInterviewsPage}
              onViewActivities={setSelectedCandidate}
            />

            <ApplicantSection
              value="qualified"
              title="Qualified"
              description="Candidates meeting screening criteria"
              icon={Star}
              iconColor="text-green-600 dark:text-green-400"
              bgColor="bg-green-500/10"
              applicants={qualified.items}
              totalItems={qualified.totalItems}
              totalPages={qualified.totalPages}
              currentPage={qualifiedPage}
              onPageChange={setQualifiedPage}
              onViewActivities={setSelectedCandidate}
            />

            <ApplicantSection
              value="others"
              title="Other Candidates"
              description="All remaining candidates"
              icon={Users}
              iconColor="text-blue-600 dark:text-blue-400"
              bgColor="bg-blue-500/10"
              applicants={others.items}
              totalItems={others.totalItems}
              totalPages={others.totalPages}
              currentPage={othersPage}
              onPageChange={setOthersPage}
              onViewActivities={setSelectedCandidate}
            />
          </Accordion>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                No applicants found
              </h3>
              <p className="text-muted-foreground">
                {searchQuery || statusFilter !== "all"
                  ? "Try adjusting your filters"
                  : "No applicants have applied to this job yet"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Activities Sheet */}
      <CandidateActivitiesSheet
        applicant={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
      />
    </>
  );
}
