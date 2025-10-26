import { z } from "zod";

export const updateJobSchema = z
  .object({
    // Required fields by API
    display_name: z.string(),
    description: z.string(),
    screening_email: z.string(),
    criteria: z.string(),
    job_id: z.number(),
    is_active: z.number(),
    // Optional fields
    title: z.string().nullable().optional(),
    location: z.string().nullable().optional(),
    country_code: z.string().nullable().optional(),
    is_hot: z.number().nullable().optional(),
    salary: z.string().nullable().optional(),
    remote_type: z.string().nullable().optional(),
    max_rate: z.string().nullable().optional(),
    duration: z.string().nullable().optional(),
    start_date: z.string().nullable().optional(),
    openings: z.number().nullable().optional(),
    status: z.string().nullable().optional(),
    status_id: z.number().nullable().optional(),
    date_created: z.string().nullable().optional(),
    date_modified: z.string().nullable().optional(),
    category_name: z.string().nullable().optional(),
    type: z.string().nullable().optional(),
    company: z.string().nullable().optional(),
    created_at: z.string().nullable().optional(),
    updated_at: z.string().nullable().optional(),
    created_by: z.number().nullable().optional(),
  })
  .passthrough(); // Allow other fields like application_forms, owner, recruiter, assigned_user

export type UpdateJobData = z.infer<typeof updateJobSchema>;

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
