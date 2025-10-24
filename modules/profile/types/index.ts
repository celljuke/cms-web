/**
 * Profile related types
 */

export interface UserProfile {
  id: number;
  email: string;
  first_name: string | null;
  last_name: string | null;
  job_title: string | null;
  role: string;
  calendly_link: string | null;
  profile_image_url: string | null;
  org_id: number;
  created_at: string;
}

export interface AssignedJob {
  job_id: number;
  title: string;
  status: string;
  date_created: string;
  company: {
    id: string;
    name: string;
    state: string;
    postal_code: string;
  };
}

export interface UpdateProfilePayload {
  first_name?: string;
  last_name?: string;
  job_title?: string;
  calendly_link?: string;
  profile_image_url?: string;
}

export interface ChangePasswordPayload {
  current_password: string;
  new_password: string;
}

export interface UploadImageResponse {
  message: string;
  image_url: string;
}
