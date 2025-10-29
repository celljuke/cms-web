"use client";

import {
  Settings,
  LogOut,
  Moon,
  Sun,
  ExternalLink,
  BarChart3,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useAuth, useSignOut } from "@/modules/auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Notifications } from "./notifications";
import { Logo } from "./logo";
import Link from "next/link";
import type { UserProfile } from "@/modules/profile/types";

interface HeaderProps {
  profile: UserProfile | null;
}

export function Header({ profile }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();
  const { handleSignOut } = useSignOut();

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/recruiting" className="flex items-center gap-4">
          <div className="text-primary dark:text-white w-20">
            <Logo />
          </div>

          <span className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Career Match Solutions
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Notifications */}
          <Notifications />

          {/* Theme Switcher */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="cursor-pointer"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Profile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar>
                  <AvatarImage
                    src={profile?.profile_image_url || undefined}
                    alt={profile?.first_name || "Profile"}
                  />
                  <AvatarFallback>
                    {profile?.first_name && profile?.last_name
                      ? `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase()
                      : user?.email?.substring(0, 2).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {(profile || user) && (
                <>
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {profile?.first_name && profile?.last_name
                          ? `${profile.first_name} ${profile.last_name}`
                          : user?.email.split("@")[0] || "User"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {profile?.email || user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Account Settings</span>
                </Link>
              </DropdownMenuItem>
              {(profile?.role === "admin" ||
                profile?.role === "super_admin") && (
                <DropdownMenuItem asChild>
                  <Link href="/admin">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    <span>Admin Dashboard</span>
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem asChild>
                <Link href="https://match.catsone.com" target="_blank">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  <span>Access ATS</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleSignOut}
                className="text-destructive focus:text-destructive"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
