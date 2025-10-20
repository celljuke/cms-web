import { router } from "./trpc";
import { jobRouter } from "./routers/job";
import { recruitingRouter } from "./routers/recruiting";

export const appRouter = router({
  job: jobRouter,
  recruiting: recruitingRouter,
});

export type AppRouter = typeof appRouter;
