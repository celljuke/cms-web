import { router } from "./trpc";
import { jobRouter } from "./routers/job";
import { recruitingRouter } from "./routers/recruiting";
import { authRouter } from "./routers/auth";
import { profileRouter } from "./routers/profile";

export const appRouter = router({
  auth: authRouter,
  job: jobRouter,
  recruiting: recruitingRouter,
  profile: profileRouter,
});

export type AppRouter = typeof appRouter;
