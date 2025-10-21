import { useState, useMemo } from "react";
import type { Applicant } from "../types";

interface UseApplicantsDataProps {
  applicants: Applicant[];
}

interface PaginatedData {
  items: Applicant[];
  totalPages: number;
  totalItems: number;
}

export function useApplicantsData({ applicants }: UseApplicantsDataProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Separate pagination state for each section
  const [needsAttentionPage, setNeedsAttentionPage] = useState(1);
  const [interviewsPage, setInterviewsPage] = useState(1);
  const [qualifiedPage, setQualifiedPage] = useState(1);
  const [othersPage, setOthersPage] = useState(1);

  const itemsPerPage = 10;

  // Get unique statuses for filter
  const uniqueStatuses = useMemo(
    () => Array.from(new Set(applicants.map((a) => a.status))).sort(),
    [applicants]
  );

  // Filter applicants
  const filteredApplicants = useMemo(() => {
    return applicants.filter((applicant) => {
      const matchesSearch =
        searchQuery === "" ||
        applicant.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        applicant.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || applicant.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applicants, searchQuery, statusFilter]);

  // Group applicants by category
  const allNeedsAttention = useMemo(
    () => filteredApplicants.filter((a) => a.attention_needed),
    [filteredApplicants]
  );

  const allInterviews = useMemo(
    () =>
      filteredApplicants.filter((a) =>
        a.status.toLowerCase().includes("interview")
      ),
    [filteredApplicants]
  );

  const allQualified = useMemo(
    () =>
      filteredApplicants.filter((a) =>
        a.status.toLowerCase().includes("qualified")
      ),
    [filteredApplicants]
  );

  const allOthers = useMemo(
    () =>
      filteredApplicants.filter(
        (a) =>
          !a.attention_needed &&
          !a.status.toLowerCase().includes("interview") &&
          !a.status.toLowerCase().includes("qualified")
      ),
    [filteredApplicants]
  );

  // Pagination helper
  const paginate = (items: Applicant[], page: number): PaginatedData => {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return {
      items: items.slice(startIndex, endIndex),
      totalPages,
      totalItems: items.length,
    };
  };

  // Paginated data for each section
  const needsAttention = useMemo(
    () => paginate(allNeedsAttention, needsAttentionPage),
    [allNeedsAttention, needsAttentionPage]
  );

  const interviews = useMemo(
    () => paginate(allInterviews, interviewsPage),
    [allInterviews, interviewsPage]
  );

  const qualified = useMemo(
    () => paginate(allQualified, qualifiedPage),
    [allQualified, qualifiedPage]
  );

  const others = useMemo(
    () => paginate(allOthers, othersPage),
    [allOthers, othersPage]
  );

  // Reset all pagination when filters change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setNeedsAttentionPage(1);
    setInterviewsPage(1);
    setQualifiedPage(1);
    setOthersPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setNeedsAttentionPage(1);
    setInterviewsPage(1);
    setQualifiedPage(1);
    setOthersPage(1);
  };

  return {
    // Filter state
    searchQuery,
    statusFilter,
    uniqueStatuses,
    handleSearchChange,
    handleStatusChange,

    // Filtered data
    filteredApplicants,
    allNeedsAttention,
    allInterviews,
    allQualified,
    allOthers,

    // Paginated data
    needsAttention,
    interviews,
    qualified,
    others,

    // Pagination state
    needsAttentionPage,
    setNeedsAttentionPage,
    interviewsPage,
    setInterviewsPage,
    qualifiedPage,
    setQualifiedPage,
    othersPage,
    setOthersPage,
  };
}
