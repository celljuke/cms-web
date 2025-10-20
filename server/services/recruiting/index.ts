import mockJobs from "./mock-jobs.json";

export class RecruitingService {
  /**
   * Main search method for jobs
   */
  async getJobs() {
    return mockJobs;
  }
}

export const recruitingService = new RecruitingService();
