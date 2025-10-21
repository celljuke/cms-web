"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Users,
  Mail,
  MessageCircle,
  CheckCircle,
  Video,
  Trophy,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  LineChart,
} from "recharts";
import type { JobAnalytics } from "../types";

interface ConversionFunnelProps {
  analytics: JobAnalytics;
}

const funnelStages = [
  {
    key: "Total" as const,
    label: "Total",
    description: "Total applications received",
    icon: Users,
    color: "#93c5fd", // blue-300
    bgColor: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
  {
    key: "Contacted" as const,
    label: "Contacted",
    description: "Candidates contacted via screening email",
    icon: Mail,
    color: "#d8b4fe", // purple-300
    bgColor: "bg-purple-500/10",
    iconColor: "text-purple-500",
  },
  {
    key: "Replied" as const,
    label: "Replied",
    description: "Candidates who responded to screening",
    icon: MessageCircle,
    color: "#f9a8d4", // pink-300
    bgColor: "bg-pink-500/10",
    iconColor: "text-pink-500",
  },
  {
    key: "Qualified" as const,
    label: "Qualified",
    description: "Candidates meeting screening criteria",
    icon: CheckCircle,
    color: "#86efac", // green-300
    bgColor: "bg-green-500/10",
    iconColor: "text-green-500",
  },
  {
    key: "Interviewed" as const,
    label: "Interviewed",
    description: "Candidates who completed interviews",
    icon: Video,
    color: "#fdba74", // orange-300
    bgColor: "bg-orange-500/10",
    iconColor: "text-orange-500",
  },
  {
    key: "Hired" as const,
    label: "Hired",
    description: "Successfully hired candidates",
    icon: Trophy,
    color: "#fde047", // yellow-300
    bgColor: "bg-yellow-500/10",
    iconColor: "text-yellow-500",
  },
];

const chartConfig = {
  Total: { label: "Total", color: "#93c5fd" },
  Contacted: { label: "Contacted", color: "#d8b4fe" },
  Replied: { label: "Replied", color: "#f9a8d4" },
  Qualified: { label: "Qualified", color: "#86efac" },
  Interviewed: { label: "Interviewed", color: "#fdba74" },
  Hired: { label: "Hired", color: "#fde047" },
};

export function ConversionFunnel({ analytics }: ConversionFunnelProps) {
  // Prepare data for charts
  const chartData = funnelStages.map((stage) => ({
    stage: stage.label,
    count: analytics.values[stage.key],
    percentage: analytics.funnel[stage.key],
    fill: stage.color,
  }));

  return (
    <div className="space-y-6">
      {/* Stats Cards - Same style as dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {funnelStages.map((stage) => {
          const Icon = stage.icon;
          const value = analytics.values[stage.key];
          const percentage = analytics.funnel[stage.key];

          return (
            <div
              key={stage.key}
              className="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col gap-3">
                <div
                  className={`h-12 w-12 rounded-lg ${stage.bgColor} flex items-center justify-center`}
                >
                  <Icon className={`h-6 w-6 ${stage.iconColor}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {stage.label}
                  </p>
                  <p className="text-2xl font-bold">{value}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {percentage}%
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart - Candidate Count */}
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Candidate Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="stage"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  fontSize={12}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  fontSize={12}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => `${value} candidates`}
                    />
                  }
                />
                <Bar
                  dataKey="count"
                  radius={[8, 8, 0, 0]}
                  fill="var(--color-Total)"
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Line Chart - Conversion Rate */}
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Conversion Rate Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="stage"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  fontSize={12}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  fontSize={12}
                  domain={[0, 100]}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent formatter={(value) => `${value}%`} />
                  }
                />
                <Line
                  type="monotone"
                  dataKey="percentage"
                  stroke="var(--chart-1)"
                  strokeWidth={3}
                  dot={{ fill: "var(--chart-1)", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Funnel Visualization with Progress Bars */}
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Hiring Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {funnelStages.map((stage, index) => {
              const Icon = stage.icon;
              const value = analytics.values[stage.key];
              const percentage = analytics.funnel[stage.key];

              return (
                <div key={stage.key} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-10 w-10 rounded-lg ${stage.bgColor} flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className={`h-5 w-5 ${stage.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{stage.label}</p>
                        <p className="text-sm text-muted-foreground">
                          {stage.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <p className="text-2xl font-bold">{value}</p>
                      <p className="text-sm text-muted-foreground">
                        {percentage}%
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative">
                    <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full transition-all duration-500 rounded-full"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: stage.color,
                        }}
                      />
                    </div>
                  </div>

                  {/* Drop-off indicator */}
                  {index < funnelStages.length - 1 && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground pl-13">
                      {(() => {
                        const nextStage = funnelStages[index + 1];
                        const dropOff = value - analytics.values[nextStage.key];
                        const dropOffPercentage =
                          value > 0 ? ((dropOff / value) * 100).toFixed(1) : 0;

                        return dropOff > 0 ? (
                          <span className="text-xs">
                            ↓ {dropOff} candidates ({dropOffPercentage}%
                            drop-off to next stage)
                          </span>
                        ) : null;
                      })()}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
