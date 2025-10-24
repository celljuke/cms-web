"use client";

import { useState } from "react";
import { toast } from "sonner";

/**
 * Hook for uploading profile image
 * Note: This uses direct fetch since tRPC doesn't handle FormData well
 */
export function useUploadImage() {
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage = async (file: File): Promise<string | null> => {
    setIsUploading(true);

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const formData = new FormData();
      formData.append("file", file);

      const API_BASE_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://54.176.184.13:5006";

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
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      toast.success("Image uploaded successfully");
      return data.image_url;
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to upload image"
      );
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadImage,
    isUploading,
  };
}
