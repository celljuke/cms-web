import { recruitingService } from "@/server/services/recruiting";
import { protectedProcedure, router } from "../trpc";
import { z } from "zod";

export const recruitingRouter = router({
  getJobs: protectedProcedure.query(({ ctx }) => {
    return recruitingService.getJobs(ctx.token);
  }),

  getJobDetail: protectedProcedure
    .input(
      z.object({
        jobId: z.number(),
      })
    )
    .query(({ input, ctx }) => {
      return recruitingService.getJobDetail(input.jobId, ctx.token);
    }),

  getJobAnalytics: protectedProcedure
    .input(
      z.object({
        jobId: z.number(),
      })
    )
    .query(({ input, ctx }) => {
      return recruitingService.getJobAnalytics(input.jobId, ctx.token);
    }),

  getCandidateActivities: protectedProcedure
    .input(
      z.object({
        candidateId: z.number(),
      })
    )
    .query(({ input, ctx }) => {
      return recruitingService.getCandidateActivities(
        input.candidateId,
        ctx.token
      );
    }),
});
