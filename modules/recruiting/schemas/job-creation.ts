import { z } from "zod";

export const createJobSchema = z.object({
  // Basic Information
  title: z.string().min(1, "Job title is required"),
  description: z.string().min(1, "Job description is required"),
  external_id: z.string().optional().default(""),
  type: z.enum(["Hire", "Contract to Hire", "Contract", "Freelance"]),
  openings: z.number().min(1, "At least 1 opening is required"),
  remote_type: z.string().optional().default(""),
  is_hot: z.boolean().default(false),

  // Location
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postal_code: z.string().optional().default(""),
  country_code: z.string().min(1, "Country code is required"),

  // Company & Team
  company_id: z.number().min(1, "Company is required"),
  department_id: z.number().optional(),
  contact_id: z.number().optional(),
  recruiter_id: z.number().min(1, "Recruiter is required"),
  category: z.string().optional().default(""),
  workflow_id: z.number().optional(),

  // Job Details
  start_date: z.string().min(1, "Start date is required"),
  salary: z.string().optional().default(""),
  max_rate: z.string().optional().default(""),
  duration: z.string().optional().default(""),
  notes: z.string().optional().default(""),

  // Tags & Groups
  tags: z.array(z.string()).default([]),
  user_groups: z.array(z.string()).default([]),

  // Applications
  applications: z.array(z.object({ id: z.number() })).default([]),

  // Auto Close
  job_close_schedule_time: z.string().optional().default(""),
  time_zone: z.string().optional().default(""),

  // Custom Fields
  custom_fields: z
    .array(z.object({ id: z.string(), value: z.string() }))
    .default([]),

  // Assigned Users
  assigned_users: z.array(z.number()).default([]),

  // Portal
  portal_id: z.string().optional().default(""),
  company_job_id: z.string().optional().default(""),
});

export type CreateJobFormData = z.infer<typeof createJobSchema>;
