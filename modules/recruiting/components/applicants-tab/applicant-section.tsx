import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { ApplicantRow } from "./applicant-row";
import { SectionPagination } from "./section-pagination";
import type { Applicant } from "../../types";

interface ApplicantSectionProps {
  value: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
  applicants: Applicant[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onViewActivities: (applicant: Applicant) => void;
}

export function ApplicantSection({
  value,
  title,
  description,
  icon: Icon,
  iconColor,
  bgColor,
  applicants,
  totalItems,
  totalPages,
  currentPage,
  onPageChange,
  onViewActivities,
}: ApplicantSectionProps) {
  if (totalItems === 0) return null;

  return (
    <AccordionItem
      value={value}
      className="border border-border rounded-lg bg-card !border-b"
    >
      <AccordionTrigger className="px-6 hover:no-underline">
        <div className="flex items-center gap-3">
          <Icon className={`h-5 w-5 ${iconColor}`} />
          <div className="text-left">
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <Badge variant="secondary" className="ml-auto mr-4">
            {totalItems}
          </Badge>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <Card className="border-0 shadow-none">
          <CardContent className="p-0">
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
                {applicants.map((applicant) => (
                  <ApplicantRow
                    key={applicant.candidate_id}
                    applicant={applicant}
                    onViewActivities={onViewActivities}
                  />
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <SectionPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </AccordionContent>
    </AccordionItem>
  );
}
