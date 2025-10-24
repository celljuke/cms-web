export interface AssignedUser {
  id: number;
  name: string;
  email: string;
}

export interface Location {
  city: string;
  state: string;
  postal_code: string | null;
}

export interface Company {
  id: string;
  name: string;
  state: string;
  postal_code: string;
}

export interface ApplicationForm {
  id: string;
  description: string;
}

export interface Owner {
  id: string;
  first_name: string;
  last_name: string;
}

export interface Recruiter {
  id: string;
  first_name: string;
  last_name: string;
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
  application_forms?: unknown[];
  owner?: unknown | null;
  recruiter?: unknown | null;
  job_id: number;
  is_active: number;
  created_at: string | null;
  updated_at: string | null;
  created_by: number | null;
  assigned_user: AssignedUser | null;
}

export interface JobDetail {
  display_name: string;
  description: string;
  screening_email: string;
  criteria: string;
  title: string | null;
  location: Location | null;
  country_code: string;
  is_hot: boolean;
  salary: string;
  remote_type: string;
  max_rate: string;
  duration: string;
  start_date: string;
  openings: number;
  status: string;
  status_id: number;
  date_created: string;
  date_modified: string;
  category_name: string;
  type: string;
  company: Company | null;
  application_forms: ApplicationForm[];
  owner: Owner | null;
  recruiter: Recruiter | null;
  job_id: number;
  is_active: number;
  created_at: string | null;
  updated_at: string | null;
  created_by: number | null;
  assigned_user: AssignedUser | null;
}

export interface JobAnalytics {
  values: {
    Total: number;
    Contacted: number;
    Replied: number;
    Qualified: number;
    Interviewed: number;
    Hired: number;
  };
  funnel: {
    Total: number;
    Contacted: number;
    Replied: number;
    Qualified: number;
    Interviewed: number;
    Hired: number;
  };
}

export interface Applicant {
  full_name: string;
  email: string;
  phone: string | null;
  status: string;
  rating: number;
  candidate_id: number;
  attention_needed: boolean;
  attention_reason: string | null;
}

export interface JobAnalyticsResponse {
  analytics: JobAnalytics;
  applicants: Applicant[];
}

export interface CandidateActivity {
  id: number;
  data_item: {
    id: number;
    type: string;
  };
  date: string;
  regarding_id: number;
  type: string;
  notes: string | null;
  annotation: string | null;
  entered_by_id: number;
  date_created: string;
  date_modified: string;
}

export interface CandidateActivitiesResponse {
  activities: CandidateActivity[];
}

export interface JobActivity {
  id: number;
  data_item: {
    id: number;
    type: string;
  };
  date: string;
  regarding_id: number;
  type: string;
  notes: string | null;
  annotation: string | null;
  entered_by_id: number;
  date_created: string;
  date_modified: string;
}

export interface JobActivitiesResponse {
  activities: JobActivity[];
}

export interface ActivityUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  title: string | null;
  _links?: {
    self: { href: string };
    phones: { href: string };
  };
}
