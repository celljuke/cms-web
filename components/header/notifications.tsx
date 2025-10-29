"use client";

import {
  Bell,
  Users,
  CheckCircle,
  Clock,
  Mail,
  AlertCircle,
  EyeOff,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatDistanceToNow } from "date-fns";
import {
  useNotifications,
  useMarkNotificationRead,
  useMarkAllNotificationsRead,
} from "@/modules/recruiting/hooks/use-notifications";
import type {
  Notification,
  NotificationType,
  NotificationPriority,
} from "@/modules/recruiting/types/notifications";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";

function getNotificationIcon(type: NotificationType) {
  switch (type) {
    case "new_qualified_candidates":
      return <Users className="h-4 w-4" />;
    case "candidate_reply":
    case "email_attention":
      return <Mail className="h-4 w-4" />;
    case "application_processed":
      return <CheckCircle className="h-4 w-4" />;
    case "system_alert":
      return <AlertCircle className="h-4 w-4" />;
    case "daily_digest":
      return <Clock className="h-4 w-4" />;
    default:
      return <Bell className="h-4 w-4" />;
  }
}

function getNotificationIconColor(type: NotificationType) {
  switch (type) {
    case "new_qualified_candidates":
      return "text-blue-500";
    case "candidate_reply":
      return "text-green-500";
    case "email_attention":
      return "text-orange-500";
    case "application_processed":
      return "text-purple-500";
    case "system_alert":
      return "text-red-500";
    case "daily_digest":
      return "text-gray-500";
    default:
      return "text-gray-500";
  }
}

function getPriorityBadgeVariant(
  priority: NotificationPriority
): "destructive" | "warning" | "default" | "secondary" | "outline" {
  switch (priority) {
    case "urgent":
      return "destructive";
    case "high":
      return "warning";
    case "medium":
      return "secondary";
    case "low":
      return "outline";
    default:
      return "outline";
  }
}

function getPriorityLabel(priority: NotificationPriority) {
  switch (priority) {
    case "urgent":
      return "Urgent";
    case "high":
      return "High";
    case "medium":
      return "Medium";
    case "low":
      return "Low";
    default:
      return "";
  }
}

export function Notifications() {
  const {
    data: notifications,
    isLoading,
    isError,
  } = useNotifications({ limit: 100 });
  const { mutate: markAsRead } = useMarkNotificationRead();
  const { mutate: markAllAsRead } = useMarkAllNotificationsRead();
  const router = useRouter();
  const unreadNotifications = notifications?.filter((n) => !n.is_read) || [];
  const unreadCount = unreadNotifications.length;

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.is_read) {
      markAsRead({ notificationId: notification.id });
    }
    if (notification.action_url) {
      // Remove /analytics or /emails from the end of the URL
      const cleanUrl = notification.action_url
        .replace(/\/analytics$/, "")
        .replace(/\/emails$/, "");
      router.push(cleanUrl);
    }
  };

  const handleMarkAllRead = () => {
    markAllAsRead();
  };

  if (isLoading) {
    return (
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5 animate-pulse" />
      </Button>
    );
  }

  if (isError) {
    return (
      <Button variant="ghost" size="icon" className="relative text-destructive">
        <Bell className="h-5 w-5" />
        <Badge
          variant="destructive"
          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs rounded-full"
        >
          !
        </Badge>
      </Button>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative cursor-pointer">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs rounded-full"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-base">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground"
              onClick={handleMarkAllRead}
            >
              <EyeOff className="h-3 w-3 mr-1" /> Mark all as read
            </Button>
          )}
        </div>
        <ScrollArea className="h-[400px]">
          <div className="divide-y">
            {notifications && notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-accent/50 transition-colors cursor-pointer ${
                    !notification.is_read ? "bg-accent/20" : ""
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex gap-3">
                    <div
                      className={`mt-1 ${getNotificationIconColor(
                        notification.notification_type
                      )}`}
                    >
                      {getNotificationIcon(notification.notification_type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm leading-none">
                            {notification.title}
                          </p>
                          {getPriorityLabel(notification.priority) && (
                            <Badge
                              variant={getPriorityBadgeVariant(
                                notification.priority
                              )}
                              className="text-[10px] px-1.5 py-0 h-4 leading-tight"
                            >
                              {getPriorityLabel(notification.priority)}
                            </Badge>
                          )}
                        </div>
                        {!notification.is_read && (
                          <div className="h-2 w-2 rounded-full bg-blue-500 shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(
                          new Date(notification.created_at),
                          {
                            addSuffix: true,
                          }
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 px-4">
                <Bell className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-sm font-medium text-muted-foreground">
                  No notifications
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  You're all caught up!
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
