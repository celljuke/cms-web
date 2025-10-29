/**
 * Types for Enable AgentVIP feature
 */

export interface CatsJobDetail {
  id: number;
  title: string;
  description: string;
  location: {
    city: string;
    state: string;
    postal_code: string | null;
    country_code: string;
  } | null;
  country_code: string | null;
  is_hot: boolean;
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
  company: {
    id: string | number;
    name: string;
    state: string;
    postal_code: string;
  } | null;
  application_forms: Array<{
    id: string | number;
    description: string;
  }>;
  owner: {
    id: string | number;
    first_name: string;
    last_name: string;
  } | null;
  recruiter: {
    id: string | number;
    first_name: string;
    last_name: string;
  } | null;
}

export interface AIScreeningResponse {
  screening_email_html: string;
  criteria_html: string;
}

export interface EnableAgentVIPPayload {
  job_id: number;
  display_name: string;
  description: string;
  screening_email: string;
  criteria: string;
  title: string | null;
  location: {
    city: string;
    state: string;
    postal_code: string | null;
    country_code: string;
  } | null;
  country_code: string | null;
  is_hot: boolean;
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
  is_active: number;
  company: {
    id: string | number;
    name: string;
    state: string;
    postal_code: string;
  } | null;
  application_forms: Array<{
    id: string | number;
    description: string;
  }>;
  owner: {
    id: string | number;
    first_name: string;
    last_name: string;
  } | null;
  recruiter: {
    id: string | number;
    first_name: string;
    last_name: string;
  } | null;
  created_at: string | null;
  updated_at: string | null;
  created_by: number | null;
}

export interface EnableAgentVIPFormData {
  recruiter_id: number | null;
  description: string;
  screening_email: string;
  criteria: string;
}
