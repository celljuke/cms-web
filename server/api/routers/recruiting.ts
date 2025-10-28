import { recruitingService } from "@/server/services/recruiting";
import { protectedProcedure, router } from "../trpc";
import { z } from "zod";
import {
  createJobSchema,
  updateJobSchema,
} from "@/modules/recruiting/schemas/job-creation";

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

  getLatestCandidates: protectedProcedure
    .input(
      z.object({
        limit: z.number().default(50),
        windowDays: z.number().default(2),
      })
    )
    .query(({ input, ctx }) => {
      return recruitingService.getLatestCandidates(
        input.limit,
        input.windowDays,
        ctx.token
      );
    }),

  // Job Creation Endpoints
  getAvailableUsers: protectedProcedure.query(({ ctx }) => {
    return recruitingService.getAvailableUsers(ctx.token);
  }),

  getWorkflows: protectedProcedure.query(({ ctx }) => {
    return recruitingService.getWorkflows(ctx.token);
  }),

  searchCompanies: protectedProcedure
    .input(
      z.object({
        query: z.string().min(1),
      })
    )
    .query(({ input, ctx }) => {
      return recruitingService.searchCompanies(input.query, ctx.token);
    }),

  getCompanyDepartments: protectedProcedure
    .input(
      z.object({
        companyId: z.number(),
      })
    )
    .query(({ input, ctx }) => {
      return recruitingService.getCompanyDepartments(
        input.companyId,
        ctx.token
      );
    }),

  getCompanyContacts: protectedProcedure
    .input(
      z.object({
        companyId: z.number(),
      })
    )
    .query(({ input, ctx }) => {
      return recruitingService.getCompanyContacts(input.companyId, ctx.token);
    }),

  createJob: protectedProcedure
    .input(createJobSchema)
    .mutation(({ input, ctx }) => {
      return recruitingService.createJob(input, ctx.token);
    }),

  updateJob: protectedProcedure
    .input(
      z.object({
        jobId: z.number(),
        data: updateJobSchema,
      })
    )
    .mutation(({ input, ctx }) => {
      return recruitingService.updateJob(input.jobId, input.data, ctx.token);
    }),

  getNotifications: protectedProcedure
    .input(
      z.object({
        unreadOnly: z.boolean().optional().default(false),
        limit: z.number().optional().default(50),
      })
    )
    .query(({ input, ctx }) => {
      return recruitingService.getNotifications(
        ctx.token,
        input.unreadOnly,
        input.limit
      );
    }),

  markNotificationAsRead: protectedProcedure
    .input(z.object({ notificationId: z.number() }))
    .mutation(({ input, ctx }) => {
      return recruitingService.markNotificationAsRead(
        input.notificationId,
        ctx.token
      );
    }),

  markAllNotificationsAsRead: protectedProcedure.mutation(({ ctx }) => {
    return recruitingService.markAllNotificationsAsRead(ctx.token);
  }),

  rephraseField: protectedProcedure
    .input(
      z.object({
        fieldName: z.enum([
          "description",
          "criteria",
          "screening_email",
          "notes",
        ]),
        fieldData: z.string().min(1, "Field data is required"),
      })
    )
    .mutation(({ input, ctx }) => {
      return recruitingService.rephraseField(
        input.fieldName,
        input.fieldData,
        ctx.token
      );
    }),

  getJobSubmissions: protectedProcedure.query(({ ctx }) => {
    return recruitingService.getJobSubmissions(ctx.token);
  }),

  getJobSubmission: protectedProcedure
    .input(z.object({ jobId: z.number() }))
    .query(({ input, ctx }) => {
      return recruitingService.getJobSubmission(input.jobId, ctx.token);
    }),
});
