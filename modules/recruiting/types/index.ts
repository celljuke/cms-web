export interface AssignedUser {
  id: number;
  name: string;
  email: string;
}

export interface Job {
  display_name: string;
  description: string;
  screening_email: string;
  criteria: string;
  title: string | null;
  location: string | null;
  country_code: string | null;
  is_hot: number | null;
  salary: string | null;
  remote_type: string | null;
  max_rate: string | null;
  duration: string | null;
  start_date: string | null;
  openings: number | null;
  status: string | null;
  status_id: number | null;
  date_created: string | null;
  date_modified: string | null;
  category_name: string | null;
  type: string | null;
  company: string | null;
  application_forms: unknown[];
  owner: unknown | null;
  recruiter: unknown | null;
  job_id: number;
  is_active: number;
  created_at: string | null;
  updated_at: string | null;
  created_by: number | null;
  assigned_user: AssignedUser | null;
}
