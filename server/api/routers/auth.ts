import { authService } from "@/server/services/auth";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";

/**
 * Sign in input schema
 */
const signInInput = z.object({
  username: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

/**
 * Auth router
 */
export const authRouter = router({
  /**
   * Sign in procedure
   */
  signIn: publicProcedure.input(signInInput).mutation(async ({ input }) => {
    const response = await authService.signIn(input);
    
    // Decode token to get user info
    const userInfo = authService.decodeToken(response.access_token);
    
    return {
      accessToken: response.access_token,
      tokenType: response.token_type,
      user: userInfo
        ? {
            id: userInfo.id,
            email: userInfo.sub,
            role: userInfo.role,
          }
        : null,
    };
  }),

  /**
   * Validate token procedure
   */
  validateToken: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(({ input }) => {
      return {
        isValid: authService.isTokenValid(input.token),
        user: authService.decodeToken(input.token),
      };
    }),
});

