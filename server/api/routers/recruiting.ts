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

  getJobActivities: protectedProcedure
    .input(
      z.object({
        jobId: z.number(),
        isCatId: z.boolean().default(true),
      })
    )
    .query(({ input, ctx }) => {
      return recruitingService.getJobActivities(
        input.jobId,
        input.isCatId,
        ctx.token
      );
    }),

  getActivityUser: protectedProcedure
    .input(
      z.object({
        userId: z.number(),
      })
    )
    .query(({ input, ctx }) => {
      return recruitingService.getActivityUser(input.userId, ctx.token);
    }),

  getJobAttachments: protectedProcedure
    .input(
      z.object({
        jobId: z.number(),
        isCatId: z.boolean().default(true),
      })
    )
    .query(({ input, ctx }) => {
      return recruitingService.getJobAttachments(
        input.jobId,
        input.isCatId,
        ctx.token
      );
    }),

  getJobRecommendations: protectedProcedure
    .input(
      z.object({
        jobId: z.number(),
        topK: z.number().default(50),
      })
    )
    .query(({ input, ctx }) => {
      return recruitingService.getJobRecommendations(
        input.jobId,
        input.topK,
        ctx.token
      );
    }),

  getSimilarCandidates: protectedProcedure
    .input(
      z.object({
        candidateId: z.string(),
        topK: z.number().default(50),
      })
    )
    .query(({ input, ctx }) => {
      return recruitingService.getSimilarCandidates(
        input.candidateId,
        input.topK,
        ctx.token
      );
    }),
});
