import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

/**
 * Create tRPC context with authentication
 */
export const createContext = async (opts: FetchCreateContextFnOptions) => {
  // Get token from cookie or authorization header
  const authHeader = opts.req.headers.get("authorization");
  const cookieHeader = opts.req.headers.get("cookie");

  let token: string | null = null;

  // Try to get token from Authorization header first
  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.substring(7);
  }
  // Fall back to cookie
  else if (cookieHeader) {
    const cookies = cookieHeader.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split("=");
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);

    token = cookies.access_token || null;
  }

  return {
    token,
    req: opts.req,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
