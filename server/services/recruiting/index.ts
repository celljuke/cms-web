import mockJobs from "./mock-jobs.json";
import mockJobDetail from "./mock-job-detail.json";

export class RecruitingService {
  /**
   * Main search method for jobs
   */
  async getJobs() {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500)); // 1.5 second delay
    return mockJobs;
  }

  /**
   * Get job detail by ID
   */
  async getJobDetail(jobId: number) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1200)); // 1.2 second delay

    // In a real implementation, this would fetch from the API
    // For now, return mock data for any job ID
    return {
      ...mockJobDetail,
      job_id: jobId,
    };
  }
}

export const recruitingService = new RecruitingService();
