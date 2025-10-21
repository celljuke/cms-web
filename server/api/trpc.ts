import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "./context";

const t = initTRPC.context<Context>().create();

/**
 * Middleware to check if user is authenticated
 */
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.token) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Not authenticated. Please sign in.",
    });
  }

  return next({
    ctx: {
      ...ctx,
      token: ctx.token, // Token is guaranteed to be present
    },
  });
});

export const router = t.router;

/**
 * Public procedure - no authentication required
 */
export const publicProcedure = t.procedure;

/**
 * Protected procedure - requires authentication
 */
export const protectedProcedure = t.procedure.use(isAuthed);
