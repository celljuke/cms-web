import { recruitingService } from "@/server/services/recruiting";
import { publicProcedure, router } from "../trpc";

export const recruitingRouter = router({
  getJobs: publicProcedure.query(() => {
    return recruitingService.getJobs();
  }),
});
