"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import {
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  UserPlus,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "order" | "delivery" | "system" | "user";
  timestamp: Date;
  read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "Order Confirmed",
    message: "Your order #1023 has been confirmed and will be prepared soon.",
    type: "order",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    read: false,
  },
  {
    id: "2",
    title: "Delivery Update",
    message: "Your delivery is on the way and will reach you in 20 mins.",
    type: "delivery",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    read: true,
  },
  {
    id: "3",
    title: "System Notice",
    message:
      "Scheduled maintenance at 2:00 AM tomorrow. Minimal downtime expected.",
    type: "system",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    read: false,
  },
  {
    id: "4",
    title: "New User Joined",
    message: "Welcome Jane Smith to the BD Healthcare community!",
    type: "user",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36),
    read: true,
  },
  {
    id: "5",
    title: "System Notice",
    message: "Database backup completed successfully.",
    type: "system",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    read: false,
  },
  {
    id: "6",
    title: "New User Joined",
    message: "Welcome Dr. Robert Chen to the platform!",
    type: "user",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 50),
    read: true,
  },
];

const TYPE_CONFIG = {
  order: {
    icon: Calendar,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    ring: "ring-amber-500/20",
    dot: "bg-amber-500",
    label: "Order",
  },
  delivery: {
    icon: Clock,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    ring: "ring-emerald-500/20",
    dot: "bg-emerald-500",
    label: "Delivery",
  },
  system: {
    icon: CheckCircle,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    ring: "ring-violet-500/20",
    dot: "bg-violet-500",
    label: "System",
  },
  user: {
    icon: UserPlus,
    color: "text-sky-500",
    bg: "bg-sky-500/10",
    ring: "ring-sky-500/20",
    dot: "bg-sky-500",
    label: "User",
  },
};

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markOneRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="outline"
          size="icon"
          className="relative h-9 w-9 rounded-xl border-border/60 bg-background hover:bg-accent transition-all duration-200"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-rose-500 flex items-center justify-center text-[9px] font-bold text-white ring-2 ring-background">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-[380px] p-0 rounded-2xl border border-border/60 shadow-xl shadow-black/10 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-border/60 bg-muted/30">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <Bell className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="font-semibold text-sm text-foreground">
              Notifications
            </span>
            {unreadCount > 0 && (
              <Badge
                variant="secondary"
                className="h-5 px-1.5 text-[10px] font-semibold bg-primary/10 text-primary border-0 rounded-full"
              >
                {unreadCount} new
              </Badge>
            )}
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <Sparkles className="h-3 w-3" />
              Mark all read
            </button>
          )}
        </div>

        {/* Notification List */}
        <ScrollArea className="h-[340px]">
          {notifications.length > 0 ? (
            <div className="p-2 space-y-0.5">
              {notifications.map((notification) => {
                const config = TYPE_CONFIG[notification.type];
                const Icon = config.icon;

                return (
                  <button
                    key={notification.id}
                    onClick={() => markOneRead(notification.id)}
                    className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all duration-150 group
                      ${
                        !notification.read
                          ? "bg-primary/5 hover:bg-primary/8"
                          : "hover:bg-muted/60"
                      }`}
                  >
                    {/* Icon */}
                    <div
                      className={`mt-0.5 h-8 w-8 rounded-xl ${config.bg} ring-1 ${config.ring} flex items-center justify-center shrink-0`}
                    >
                      <Icon className={`h-4 w-4 ${config.color}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <div className="flex items-start justify-between gap-2">
                        <p
                          className={`text-sm font-medium leading-tight ${!notification.read ? "text-foreground" : "text-foreground/80"}`}
                        >
                          {notification.title}
                        </p>
                        <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                          {!notification.read && (
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${config.dot} shrink-0`}
                            />
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {notification.message}
                      </p>

                      <div className="flex items-center gap-2 pt-0.5">
                        <span
                          className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md ${config.bg} ${config.color}`}
                        >
                          {config.label}
                        </span>
                        <span className="text-[10px] text-muted-foreground/70">
                          {formatDistanceToNow(notification.timestamp, {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-3 py-12">
              <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center">
                <Bell className="h-5 w-5 text-muted-foreground/50" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-foreground/70">
                  All caught up!
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  No new notifications
                </p>
              </div>
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        <div className="border-t border-border/60 bg-muted/20">
          <button className="w-full px-4 py-3 text-xs font-semibold text-primary hover:text-primary/80 hover:bg-primary/5 transition-all duration-150 flex items-center justify-center gap-1.5">
            View all notifications
            <span className="text-muted-foreground font-normal">→</span>
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
