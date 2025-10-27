/**
 * Recruiting Service
 * Handles job listings and details from the Career Match Solutions API
 */

import type {
  Job,
  JobDetail,
  JobAnalyticsResponse,
  CandidateActivitiesResponse,
  JobActivitiesResponse,
  ActivityUser,
  JobAttachmentsResponse,
  JobRecommendationsResponse,
  SimilarCandidatesResponse,
  LatestCandidatesResponse,
  AvailableUser,
  Workflow,
  CompanySearchResult,
  CompanyDepartment,
  CompanyContact,
  CreateJobPayload,
  CreateJobResponse,
} from "@/modules/recruiting/types";
import type { Notification } from "@/modules/recruiting/types/notifications";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://54.176.184.13:5006";

export class RecruitingService {
  /**
   * Fetch all jobs from the API
   */
  async getJobs(token: string): Promise<Job[]> {
    const response = await fetch(`${API_BASE_URL}/recruiting/jobs/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store", // Disable caching for fresh data
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch jobs: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    return response.json();
  }

  /**
   * Get job detail by ID
   */
  async getJobDetail(jobId: number, token: string): Promise<JobDetail> {
    const response = await fetch(`${API_BASE_URL}/recruiting/jobs/${jobId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch job detail: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    return response.json();
  }

  /**
   * Get job analytics and applicants
   */
  async getJobAnalytics(
    jobId: number,
    token: string
  ): Promise<JobAnalyticsResponse> {
    const response = await fetch(
      `${API_BASE_URL}/recruiting/jobs/${jobId}/analytics`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch job analytics: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    return response.json();
  }

  /**
   * Get candidate activities
   */
  async getCandidateActivities(
    candidateId: number,
    token: string
  ): Promise<CandidateActivitiesResponse> {
    const response = await fetch(
      `${API_BASE_URL}/recruiting/jobs-submission/candidate/${candidateId}/activities`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch candidate activities: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    return response.json();
  }

  /**
   * Get job activities
   */
  async getJobActivities(
    jobId: number,
    isCatId: boolean,
    token: string
  ): Promise<JobActivitiesResponse> {
    const response = await fetch(
      `${API_BASE_URL}/recruiting/jobs-submission/${jobId}/activities/${isCatId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch job activities: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    return response.json();
  }

  /**
   * Get user information by ID
   */
  async getActivityUser(userId: number, token: string): Promise<ActivityUser> {
    const response = await fetch(
      `${API_BASE_URL}/recruiting/jobs-submission/user/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch user: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    return response.json();
  }

  /**
   * Get job attachments
   */
  async getJobAttachments(
    jobId: number,
    isCatId: boolean,
    token: string
  ): Promise<JobAttachmentsResponse> {
    const response = await fetch(
      `${API_BASE_URL}/recruiting/jobs-submission/${jobId}/attachments/${isCatId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch attachments: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    return response.json();
  }

  /**
   * Get AI-powered job recommendations
   */
  async getJobRecommendations(
    jobId: number,
    topK: number,
    token: string
  ): Promise<JobRecommendationsResponse> {
    const response = await fetch(
      `${API_BASE_URL}/recruiting/candidate-matching/job/${jobId}/candidates?top_k=${topK}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch job recommendations: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    return response.json();
  }

  /**
   * Get similar candidates for a given candidate
   */
  async getSimilarCandidates(
    candidateId: string,
    topK: number,
    token: string
  ): Promise<SimilarCandidatesResponse> {
    const response = await fetch(
      `${API_BASE_URL}/recruiting/candidate-matching/candidate/${candidateId}/similar?top_k=${topK}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch similar candidates: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    return response.json();
  }

  /**
   * Get latest candidates
   */
  async getLatestCandidates(
    limit: number,
    windowDays: number,
    token: string
  ): Promise<LatestCandidatesResponse> {
    const response = await fetch(
      `${API_BASE_URL}/recruiting/cats/candidates/latest?limit=${limit}&window_days=${windowDays}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch latest candidates: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    return response.json();
  }

  /**
   * Get available users (recruiters)
   */
  async getAvailableUsers(token: string): Promise<AvailableUser[]> {
    const response = await fetch(
      `${API_BASE_URL}/recruiting/jobs/users/available`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch available users: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    return response.json();
  }

  /**
   * Get workflows
   */
  async getWorkflows(token: string): Promise<Workflow[]> {
    const response = await fetch(`${API_BASE_URL}/recruiting/cats/workflows`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch workflows: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    return response.json();
  }

  /**
   * Search companies
   */
  async searchCompanies(
    query: string,
    token: string
  ): Promise<CompanySearchResult[]> {
    const response = await fetch(
      `${API_BASE_URL}/recruiting/cats/companies?query=${encodeURIComponent(
        query
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to search companies: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    return response.json();
  }

  /**
   * Get company departments
   */
  async getCompanyDepartments(
    companyId: number,
    token: string
  ): Promise<CompanyDepartment[]> {
    const response = await fetch(
      `${API_BASE_URL}/recruiting/cats/departments/${companyId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch company departments: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    return response.json();
  }

  /**
   * Get company contacts
   */
  async getCompanyContacts(
    companyId: number,
    token: string
  ): Promise<CompanyContact[]> {
    const response = await fetch(
      `${API_BASE_URL}/recruiting/cats/contacts/${companyId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch company contacts: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    return response.json();
  }

  /**
   * Create a new job
   */
  async createJob(
    payload: CreateJobPayload,
    token: string
  ): Promise<CreateJobResponse> {
    const response = await fetch(
      `${API_BASE_URL}/recruiting/jobs-submission/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to create job: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    return response.json();
  }

  /**
   * Update an existing job
   */
  async updateJob(
    jobId: number,
    payload: Partial<Job>,
    token: string
  ): Promise<Job> {
    const response = await fetch(`${API_BASE_URL}/recruiting/jobs/${jobId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to update job: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    return response.json();
  }

  /**
   * Get notifications
   */
  async getNotifications(
    token: string,
    unreadOnly: boolean = false,
    limit: number = 50
  ): Promise<Notification[]> {
    const params = new URLSearchParams({
      unread_only: unreadOnly.toString(),
      limit: limit.toString(),
    });

    const response = await fetch(
      `${API_BASE_URL}/recruiting/notifications?${params}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch notifications: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    return response.json();
  }

  /**
   * Mark notification as read
   */
  async markNotificationAsRead(
    notificationId: number,
    token: string
  ): Promise<Notification> {
    const response = await fetch(
      `${API_BASE_URL}/recruiting/notifications/${notificationId}/read`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to mark notification as read: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    return response.json();
  }

  /**
   * Mark all notifications as read
   */
  async markAllNotificationsAsRead(token: string): Promise<void> {
    const response = await fetch(
      `${API_BASE_URL}/recruiting/notifications/read-all`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to mark all notifications as read: ${response.status} ${response.statusText} - ${errorText}`
      );
    }
  }

  async rephraseField(
    fieldName: string,
    fieldData: string,
    token: string
  ): Promise<{ rephrased: string }> {
    const response = await fetch(`${API_BASE_URL}/recruiting/ai/rephrase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        field_name: fieldName,
        field_data: fieldData,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to rephrase field: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    return response.json();
  }
}

export const recruitingService = new RecruitingService();
