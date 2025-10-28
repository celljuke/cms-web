import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { JobLevelFunnel } from "../types";

interface JobFunnelTableProps {
  jobs: JobLevelFunnel[];
}

export function JobFunnelTable({ jobs }: JobFunnelTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Job-Level Performance</CardTitle>
        <CardDescription>
          Detailed funnel metrics for each active job
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Job</TableHead>
                  <TableHead className="text-right">New</TableHead>
                  <TableHead className="text-right">Scored</TableHead>
                  <TableHead className="text-right">Screened</TableHead>
                  <TableHead className="text-right">Reminders</TableHead>
                  <TableHead className="text-right">Replied</TableHead>
                  <TableHead className="text-right">Qualified</TableHead>
                  <TableHead className="text-right">Manual</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center text-muted-foreground py-8"
                    >
                      No jobs found for this period
                    </TableCell>
                  </TableRow>
                ) : (
                  jobs.map((job) => (
                    <TableRow key={job.job_id}>
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span className="line-clamp-1">{job.job_name}</span>
                          <span className="text-xs text-muted-foreground">
                            ID: {job.job_id}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant="outline"
                          className="bg-blue-500/10 text-blue-700 border-0"
                        >
                          {job.new_applicants_this_week}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant="outline"
                          className="bg-purple-500/10 text-purple-700 border-0"
                        >
                          {job.scored_applicants}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant="outline"
                          className="bg-cyan-500/10 text-cyan-700 border-0"
                        >
                          {job.screening_emails_sent}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant="outline"
                          className="bg-yellow-500/10 text-yellow-700 border-0"
                        >
                          {job.reminders_sent}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant="outline"
                          className="bg-indigo-500/10 text-indigo-700 border-0"
                        >
                          {job.replies_received}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant="outline"
                          className="bg-emerald-500/10 text-emerald-700 border-0"
                        >
                          {job.total_qualified}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {job.manual_intervention_required > 0 && (
                          <Badge
                            variant="outline"
                            className="bg-orange-500/10 text-orange-700 border-0"
                          >
                            {job.manual_intervention_required}
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
