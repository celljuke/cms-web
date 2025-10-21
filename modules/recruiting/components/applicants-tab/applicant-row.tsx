import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Star, ExternalLink, Activity } from "lucide-react";
import { parsePhoneNumber, isValidPhoneNumber } from "libphonenumber-js";
import type { Applicant } from "../../types";

interface ApplicantRowProps {
  applicant: Applicant;
  onViewActivities: (applicant: Applicant) => void;
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
  if (
    lowerStatus.includes("not in consideration") ||
    lowerStatus.includes("no contact")
  ) {
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

const formatPhoneNumber = (phone: string | null): string => {
  if (!phone) return "—";

  try {
    if (isValidPhoneNumber(phone, "US")) {
      const phoneNumber = parsePhoneNumber(phone, "US");
      return phoneNumber.formatInternational();
    }
    if (phone.startsWith("+") && isValidPhoneNumber(phone)) {
      const phoneNumber = parsePhoneNumber(phone);
      return phoneNumber.formatInternational();
    }
    return phone;
  } catch {
    return phone;
  }
};

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

export function ApplicantRow({
  applicant,
  onViewActivities,
}: ApplicantRowProps) {
  return (
    <TableRow>
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
      <TableCell>{formatPhoneNumber(applicant.phone)}</TableCell>
      <TableCell>
        <Badge className={getStatusColor(applicant.status)} variant="outline">
          {applicant.status}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View in CATS</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => onViewActivities(applicant)}
                >
                  <Activity className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Applicant Activities</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </TableCell>
    </TableRow>
  );
}
