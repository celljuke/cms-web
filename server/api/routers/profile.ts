import { profileService } from "@/server/services/profile";
import { protectedProcedure, router } from "../trpc";
import { z } from "zod";

export const profileRouter = router({
  getProfile: protectedProcedure.query(({ ctx }) => {
    return profileService.getProfile(ctx.token);
  }),

  getAssignedJobs: protectedProcedure.query(({ ctx }) => {
    return profileService.getAssignedJobs(ctx.token);
  }),

  updateProfile: protectedProcedure
    .input(
      z.object({
        first_name: z.string().optional(),
        last_name: z.string().optional(),
        job_title: z.string().optional(),
        calendly_link: z.string().optional(),
        profile_image_url: z.string().optional(),
      })
    )
    .mutation(({ input, ctx }) => {
      return profileService.updateProfile(input, ctx.token);
    }),

  changePassword: protectedProcedure
    .input(
      z.object({
        current_password: z.string(),
        new_password: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return profileService.changePassword(input, ctx.token);
    }),
});
