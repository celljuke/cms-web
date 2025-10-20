import { recruitingService } from "@/server/services/recruiting";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";

export const recruitingRouter = router({
  getJobs: publicProcedure.query(() => {
    return recruitingService.getJobs();
  }),

  getJobDetail: publicProcedure
    .input(
      z.object({
        jobId: z.number(),
      })
    )
    .query(({ input }) => {
      return recruitingService.getJobDetail(input.jobId);
    }),
});
