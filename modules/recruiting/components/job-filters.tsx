"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Filter, SortAsc } from "lucide-react";

interface JobFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

export function JobFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  sortBy,
  onSortChange,
}: JobFiltersProps) {
  const getSortLabel = () => {
    switch (sortBy) {
      case "newest":
        return "Newest First";
      case "oldest":
        return "Oldest First";
      case "title":
        return "By Title (A-Z)";
      case "status":
        return "By Status";
      default:
        return "Sort";
    }
  };
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search jobs by title, location, or ID..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Status Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            {statusFilter === "all" ? "All Status" : statusFilter}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onStatusChange("all")}>
            All Status
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onStatusChange("Active")}>
            Active
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onStatusChange("OnHold")}>
            On Hold
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onStatusChange("Closed")}>
            Closed
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onStatusChange("Inactive")}>
            Inactive
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sort */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <SortAsc className="h-4 w-4" />
            {getSortLabel()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onSortChange("newest")}>
            Newest First
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSortChange("oldest")}>
            Oldest First
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSortChange("title")}>
            By Title (A-Z)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSortChange("status")}>
            By Status
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
