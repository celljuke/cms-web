/**
 * Authentication Service
 * Handles authentication with the Career Match Solutions API
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://54.176.184.13:5006";

export interface SignInCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface DecodedToken {
  sub: string;
  id: number;
  role: string;
  exp: number;
}

export class AuthService {
  /**
   * Sign in with username and password
   */
  async signIn(credentials: SignInCredentials): Promise<AuthResponse> {
    const formData = new FormData();
    formData.append("grant_type", "password");
    formData.append("username", credentials.username);
    formData.append("password", credentials.password);
    formData.append("scope", "");
    formData.append("client_id", "string");
    formData.append("client_secret", "string");

    const response = await fetch(`${API_BASE_URL}/auth/token`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        detail: "Invalid credentials",
      }));
      throw new Error(errorData.detail || "Authentication failed");
    }

    return response.json();
  }

  /**
   * Decode JWT token to extract user information
   */
  decodeToken(token: string): DecodedToken | null {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }

  /**
   * Validate token expiration
   */
  isTokenValid(token: string): boolean {
    const decoded = this.decodeToken(token);
    if (!decoded) return false;

    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  }
}

export const authService = new AuthService();

