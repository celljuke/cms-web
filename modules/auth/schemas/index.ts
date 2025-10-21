import { z } from "zod";

/**
 * Sign in request schema
 */
export const signInSchema = z.object({
  username: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

/**
 * Type inference for sign in
 */
export type SignInRequest = z.infer<typeof signInSchema>;
