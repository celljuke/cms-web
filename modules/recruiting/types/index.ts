export * from "./enable-agentvip";

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

export interface JobAttachment {
  id: string;
  filename: string;
  created: string;
}

export interface JobAttachmentsResponse {
  attachments: JobAttachment[];
}

export interface RecommendedCandidate {
  id: string;
  score: number;
  name: string;
  email: string;
  city: string;
  state: string;
  skills: string[];
  languages: string[];
  experience_years: number;
  roles: string[];
  education: string[];
  certifications: string[];
  industries: string[];
}

export interface JobRecommendationsResponse {
  job_id: number;
  job_title: string;
  job_description: string;
  candidates: RecommendedCandidate[];
  search_method: string;
  total_found: number;
}

export interface SimilarCandidate {
  id: string;
  score: number;
  name: string;
  email: string;
  city: string;
  state: string;
  skills: string[];
  languages: string[];
  experience_years: number;
  roles: string[];
  education: string[];
  certifications: string[];
  industries: string[];
}

export interface SimilarCandidatesResponse {
  source_candidate_id: string;
  source_candidate_name: string;
  similar_candidates: SimilarCandidate[];
  search_method: string;
  total_found: number;
}

export interface LatestCandidate {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  city: string | null;
  state: string | null;
  address: string | null;
  notes: string | null;
  date_created: string;
  date_modified: string;
}

export interface LatestCandidatesResponse {
  candidates: LatestCandidate[];
  count: number;
  since: string;
  until: string;
}

// Job Creation Types
export interface AvailableUser {
  id: number;
  name: string;
  email: string;
  job_title: string | null;
  role: string;
  profile_image_url: string | null;
}

export interface Workflow {
  id: number;
  title: string;
  is_default: boolean;
  date_modified: string;
}

export interface CompanySearchResult {
  id: number;
  owner_id: number;
  name: string;
  website: string | null;
  address: {
    street: string | null;
    city: string | null;
    state: string | null;
    postal_code: string | null;
  };
  country_code: string | null;
  phones: {
    primary: string | null;
    secondary: string | null;
    fax: string | null;
  };
  entered_by_id: number;
  social_media_urls: string[];
  notes: string;
  is_hot: boolean;
  key_technologies: string;
  billing_contact_id: number | null;
  date_created: string;
  date_modified: string;
  status_id: number;
  user_groups: string[];
}

export interface CompanyDepartment {
  id: number;
  name: string;
  company_id: number;
}

export interface CompanyContact {
  id: string;
  first_name: string;
  last_name: string;
  title: string | null;
  reports_to_id: number;
  owner_id: number;
  company_id: number;
  emails: {
    primary: string | null;
    secondary: string | null;
  };
  phones: {
    work: string | null;
    cell: string | null;
    other: string | null;
  };
  address: {
    street: string | null;
    city: string | null;
    state: string | null;
    postal_code: string | null;
  };
  country_code: string | null;
  social_media_urls: string[];
  is_hot: boolean;
  has_left_company: boolean;
  notes: string;
  entered_by_id: number;
  consent_status: string | null;
  date_created: string;
  date_modified: string;
  status_id: number;
}

export interface CreateJobPayload {
  title: string;
  description: string;
  city: string;
  state: string;
  postal_code: string;
  country_code: string;
  company_id: number;
  remote_type: string;
  recruiter_id: number;
  portal_id: string;
  type: string;
  is_hot: boolean;
  start_date: string;
  salary: string;
  max_rate: string;
  duration: string;
  openings: number;
  external_id: string;
  company_job_id: string;
  notes: string;
  custom_fields: Array<{ id: string; value: string }>;
  tags: string[];
  user_groups: string[];
  applications: Array<{ id: number }>;
  job_close_schedule_time: string;
  time_zone: string;
  assigned_users: number[];
  department_id?: number;
  contact_id?: number;
  workflow_id?: number;
  category?: string;
}

export interface CreateJobResponse {
  id: number;
  title: string;
  description: string;
  city: string;
  state: string;
  postal_code: string;
  country_code: string;
  company_id: number;
  remote_type: string;
  recruiter_id: number;
  portal_id: string | null;
  type: string;
  is_hot: boolean;
  start_date: string;
  salary: string;
  max_rate: string;
  duration: string;
  openings: number;
  external_id: string;
  company_job_id: string | null;
  notes: string;
  custom_fields: Array<{ id: string; value: string }>;
  tags: string[];
  user_groups: string[];
  applications: Array<{ id: number }>;
  job_close_schedule_time: string;
  time_zone: string;
  assigned_users: number[];
  department_id: number | null;
  contact_id: number | null;
  workflow_id: number | null;
  category: number | null;
  status: string;
  status_id: number | null;
  owner_id: number | null;
  cats_job_id: number | null;
  published_at: string | null;
  created_by: number;
  reviewed_by: number | null;
  created_at: string;
  updated_at: string;
}

export * from "./notifications";
export * from "./ai";
export * from "./job-submission";
