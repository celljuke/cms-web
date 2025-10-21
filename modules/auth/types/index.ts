/**
 * Authentication related types
 */

export interface AuthTokens {
  accessToken: string;
  tokenType: string;
}

export interface AuthUser {
  id: number;
  email: string;
  role: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  tokens: AuthTokens | null;
}
