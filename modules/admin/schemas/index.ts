import { z } from "zod";

export const weeklyReportQuerySchema = z.object({
  weeks_back: z.number().int().min(0).default(0),
  time_filter: z.enum(["today", "weekly"]).default("weekly"),
});

export type WeeklyReportQuery = z.infer<typeof weeklyReportQuerySchema>;
