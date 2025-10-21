/**
 * Recruiting Service
 * Handles job listings and details from the Career Match Solutions API
 */

import type {
  Job,
  JobDetail,
  JobAnalyticsResponse,
} from "@/modules/recruiting/types";

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
}

export const recruitingService = new RecruitingService();
