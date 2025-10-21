import { router } from "./trpc";
import { jobRouter } from "./routers/job";
import { recruitingRouter } from "./routers/recruiting";
import { authRouter } from "./routers/auth";

export const appRouter = router({
  auth: authRouter,
  job: jobRouter,
  recruiting: recruitingRouter,
});

export type AppRouter = typeof appRouter;
