"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, Search, ExternalLink, AlertCircle, Users } from "lucide-react";
import type { Applicant } from "../types";

interface ApplicantsTableProps {
  applicants: Applicant[];
}

const getStatusColor = (status: string) => {
  const lowerStatus = status.toLowerCase();
  
  if (lowerStatus.includes("submitted")) {
    return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800";
  }
  if (lowerStatus.includes("contacted")) {
    return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800";
  }
  if (lowerStatus.includes("attempt")) {
    return "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800";
  }
  if (lowerStatus.includes("not in consideration") || lowerStatus.includes("no contact")) {
    return "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-800";
  }
  if (lowerStatus.includes("interview")) {
    return "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800";
  }
  if (lowerStatus.includes("qualified")) {
    return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800";
  }
  
  return "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-800";
};

const getStatusLabel = (status: string) => {
  if (status.includes("Attempt")) {
    return { label: status, variant: "warning" as const };
  }
  if (status.includes("Interview")) {
    return { label: "Interviews", variant: "default" as const };
  }
  if (status.includes("Qualified")) {
    return { label: "Qualified", variant: "default" as const };
  }
  return { label: "Others", variant: "secondary" as const };
};

export function ApplicantsTable({ applicants }: ApplicantsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Get unique statuses for filter
  const uniqueStatuses = Array.from(
    new Set(applicants.map((a) => a.status))
  ).sort();

  // Filter applicants
  const filteredApplicants = applicants.filter((applicant) => {
    const matchesSearch =
      searchQuery === "" ||
      applicant.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || applicant.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Group applicants by category
  const needsAttention = filteredApplicants.filter((a) => a.attention_needed);
  const interviews = filteredApplicants.filter((a) => 
    a.status.toLowerCase().includes("interview")
  );
  const qualified = filteredApplicants.filter((a) => 
    a.status.toLowerCase().includes("qualified")
  );
  const others = filteredApplicants.filter((a) => 
    !a.attention_needed && 
    !a.status.toLowerCase().includes("interview") &&
    !a.status.toLowerCase().includes("qualified")
  );

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-none text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  const renderApplicantRow = (applicant: Applicant) => (
    <TableRow key={applicant.candidate_id}>
      <TableCell className="font-medium">{applicant.full_name}</TableCell>
      <TableCell>{renderStarRating(applicant.rating)}</TableCell>
      <TableCell>
        <a
          href={`mailto:${applicant.email}`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {applicant.email}
        </a>
      </TableCell>
      <TableCell>{applicant.phone || "—"}</TableCell>
      <TableCell>
        <Badge className={getStatusColor(applicant.status)} variant="outline">
          {applicant.status}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ExternalLink className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            Actions
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );

  const renderSection = (
    title: string,
    count: number,
    applicants: Applicant[],
    icon: React.ReactNode,
    collapsed: boolean = true
  ) => {
    const [isCollapsed, setIsCollapsed] = useState(collapsed);

    if (applicants.length === 0) return null;

    return (
      <Card className="mb-4">
        <CardContent className="p-0">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              {icon}
              <div className="text-left">
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">
                  All remaining candidates (rejected candidates at bottom)
                </p>
              </div>
            </div>
            <Badge variant="secondary">{count}</Badge>
          </button>

          {!isCollapsed && (
            <div className="border-t">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applicants.map((applicant) => renderApplicantRow(applicant))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className={needsAttention.length > 0 ? "bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900" : ""}>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Needs Attention</p>
                <p className="text-2xl font-bold">{needsAttention.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Interviews</p>
                <p className="text-2xl font-bold">{interviews.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Star className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Qualified</p>
                <p className="text-2xl font-bold">{qualified.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-gray-500/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Others</p>
                <p className="text-2xl font-bold">{others.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {uniqueStatuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Grouped Sections */}
      {renderSection(
        "Needs Attention",
        needsAttention.length,
        needsAttention,
        <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />,
        false
      )}

      {renderSection(
        "Interviews",
        interviews.length,
        interviews,
        <Users className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />,
        false
      )}

      {renderSection(
        "Qualified",
        qualified.length,
        qualified,
        <Star className="h-5 w-5 text-green-600 dark:text-green-400" />,
        false
      )}

      {renderSection(
        "Other Candidates",
        others.length,
        others,
        <Users className="h-5 w-5 text-gray-600 dark:text-gray-400" />,
        true
      )}

      {filteredApplicants.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No applicants found</h3>
            <p className="text-muted-foreground">
              {searchQuery || statusFilter !== "all"
                ? "Try adjusting your filters"
                : "No applicants have applied to this job yet"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

