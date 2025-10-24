/**
 * Profile Service
 * Handles user profile operations
 */

import type {
  UserProfile,
  AssignedJob,
  UpdateProfilePayload,
  ChangePasswordPayload,
  UploadImageResponse,
} from "@/modules/profile/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://54.176.184.13:5006";

export class ProfileService {
  /**
   * Get user profile
   */
  async getProfile(token: string): Promise<UserProfile> {
    const response = await fetch(`${API_BASE_URL}/recruiting/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch profile: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    return response.json();
  }

  /**
   * Get assigned jobs
   */
  async getAssignedJobs(token: string): Promise<AssignedJob[]> {
    const response = await fetch(
      `${API_BASE_URL}/recruiting/profile/assigned-jobs`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch assigned jobs: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    return response.json();
  }

  /**
   * Update user profile
   */
  async updateProfile(
    payload: UpdateProfilePayload,
    token: string
  ): Promise<UserProfile> {
    const response = await fetch(`${API_BASE_URL}/recruiting/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to update profile: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    return response.json();
  }

  /**
   * Upload profile image
   */
  async uploadProfileImage(
    file: File,
    token: string
  ): Promise<UploadImageResponse> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(
      `${API_BASE_URL}/recruiting/profile/upload-image`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to upload image: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    return response.json();
  }

  /**
   * Change password
   */
  async changePassword(
    payload: ChangePasswordPayload,
    token: string
  ): Promise<{ message: string }> {
    const response = await fetch(
      `${API_BASE_URL}/recruiting/profile/change-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to change password: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    return response.json();
  }
}

export const profileService = new ProfileService();
