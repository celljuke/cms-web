import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import type { OverallStats } from "../types";

interface FunnelChartProps {
  stats: OverallStats;
}

const chartConfig = {
  value: {
    label: "Candidates",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function FunnelChart({ stats }: FunnelChartProps) {
  const chartData = [
    {
      stage: "New Applicants",
      value: stats.new_applicants_this_week,
      fill: "hsl(217, 91%, 60%)", // blue
    },
    {
      stage: "Scored",
      value: stats.applicants_assigned_match_score,
      fill: "hsl(271, 91%, 65%)", // purple
    },
    {
      stage: "Screened",
      value: stats.applicants_sent_screening_emails,
      fill: "hsl(189, 85%, 55%)", // cyan
    },
    {
      stage: "Replied",
      value: stats.applicants_who_replied,
      fill: "hsl(239, 84%, 67%)", // indigo
    },
    {
      stage: "Qualified",
      value: stats.applicants_qualified,
      fill: "hsl(142, 76%, 36%)", // emerald
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recruitment Funnel</CardTitle>
        <CardDescription>
          Conversion rates through the recruitment pipeline
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ left: 20, right: 20, top: 10, bottom: 10 }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="stage"
              type="category"
              tickLine={false}
              axisLine={false}
              width={120}
              tick={{ fontSize: 12 }}
            />
            <XAxis type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="value" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
