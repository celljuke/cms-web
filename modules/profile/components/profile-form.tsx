"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { updateProfileSchema, type UpdateProfileInput } from "../schemas";
import { useUpdateProfile } from "../hooks/use-update-profile";
import { useUploadImage } from "../hooks/use-upload-image";
import type { UserProfile } from "../types";

interface ProfileFormProps {
  profile: UserProfile | undefined;
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const { updateProfile, isUpdating } = useUpdateProfile();
  const { uploadImage, isUploading } = useUploadImage();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      job_title: "",
      calendly_link: "",
      profile_image_url: "",
    },
  });

  // Update form when profile loads
  useEffect(() => {
    if (profile) {
      form.reset({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        job_title: profile.job_title || "",
        calendly_link: profile.calendly_link || "",
        profile_image_url: profile.profile_image_url || "",
      });
      setImagePreview(profile.profile_image_url);
    }
  }, [profile, form]);

  const onSubmit = async (data: UpdateProfileInput) => {
    await updateProfile(data);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload image
    const imageUrl = await uploadImage(file);
    if (imageUrl) {
      // Update form field
      form.setValue("profile_image_url", imageUrl);

      // Automatically save the profile with the new image
      await updateProfile({
        first_name: form.getValues("first_name"),
        last_name: form.getValues("last_name"),
        job_title: form.getValues("job_title") || undefined,
        calendly_link: form.getValues("calendly_link") || undefined,
        profile_image_url: imageUrl,
      });
    }
  };

  const initials = profile
    ? profile.first_name && profile.last_name
      ? `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase()
      : profile.email.substring(0, 2).toUpperCase()
    : "U";

  return (
    <Card className="p-6 shadow-none">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Profile Information
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Update your personal details and professional information
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Avatar Upload */}
            <div className="space-y-2">
              <FormLabel>Profile Picture</FormLabel>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="h-20 w-20 border-2 border-gray-200 dark:border-gray-700">
                    <AvatarImage
                      src={imagePreview || undefined}
                      alt="Profile"
                    />
                    <AvatarFallback className="text-xl bg-primary/5 text-primary">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                      <Loader2 className="h-6 w-6 text-white animate-spin" />
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleImageClick}
                    disabled={isUploading}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Upload Photo
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG or GIF. Max 5MB.
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Job Title */}
            <FormField
              control={form.control}
              name="job_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Senior Recruiter" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your current role or position
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Calendly Link */}
            <FormField
              control={form.control}
              name="calendly_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Calendly Link</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://calendly.com/your-link"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Share your scheduling link with candidates
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button type="submit" disabled={isUpdating || isUploading}>
                {isUpdating && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Card>
  );
}
