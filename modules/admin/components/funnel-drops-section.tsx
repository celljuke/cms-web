import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, FileX, FileWarning, MailX, BellOff } from "lucide-react";
import type { FunnelDrops } from "../types";

interface FunnelDropsSectionProps {
  drops: FunnelDrops;
}

export function FunnelDropsSection({ drops }: FunnelDropsSectionProps) {
  const dropItems = [
    {
      key: "attachment_errors" as keyof FunnelDrops,
      label: "Attachment Errors",
      description: "Failed resume/attachment downloads",
      icon: FileX,
      color: "red",
    },
    {
      key: "resume_parse_errors" as keyof FunnelDrops,
      label: "Resume Parse Errors",
      description: "Failed resume parsing attempts",
      icon: FileWarning,
      color: "orange",
    },
    {
      key: "screening_email_failures" as keyof FunnelDrops,
      label: "Screening Email Failures",
      description: "Failed screening email sends",
      icon: MailX,
      color: "amber",
    },
    {
      key: "reminder_failures" as keyof FunnelDrops,
      label: "Reminder Failures",
      description: "Failed reminder email sends",
      icon: BellOff,
      color: "yellow",
    },
  ];

  const totalDrops = Object.values(drops).reduce((acc, val) => acc + val, 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-orange-500" />
          <div>
            <CardTitle>Funnel Drops & Errors</CardTitle>
            <CardDescription>
              Issues preventing candidates from progressing
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {totalDrops === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">
              No errors or drops detected this period 🎉
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dropItems.map((item) => {
              const Icon = item.icon;
              const value = drops[item.key];

              return (
                <div
                  key={item.key}
                  className="flex items-start gap-3 p-4 rounded-lg border bg-card"
                >
                  <div
                    className={`h-10 w-10 rounded-lg bg-${item.color}-500/10 flex items-center justify-center shrink-0`}
                  >
                    <Icon className={`h-5 w-5 text-${item.color}-500`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-sm">{item.label}</p>
                      <span className="text-lg font-bold">{value}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
