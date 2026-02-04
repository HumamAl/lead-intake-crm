"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { UserPlus, ArrowRightLeft, MessageSquare, Mail, UserCog, Tag, Zap } from "lucide-react";
import { getRelativeTime } from "@/lib/utils";
import type { Activity } from "@/lib/types";

export interface ActivityFeedProps {
  activities: Activity[];
}

const activityIcons = {
  lead_created: UserPlus,
  status_changed: ArrowRightLeft,
  note_added: MessageSquare,
  email_sent: Mail,
  lead_assigned: UserCog,
  tag_added: Tag,
  automation_triggered: Zap,
};

const activityColors = {
  lead_created: "bg-blue-100 text-blue-600",
  status_changed: "bg-purple-100 text-purple-600",
  note_added: "bg-green-100 text-green-600",
  email_sent: "bg-indigo-100 text-indigo-600",
  lead_assigned: "bg-yellow-100 text-yellow-600",
  tag_added: "bg-pink-100 text-pink-600",
  automation_triggered: "bg-orange-100 text-orange-600",
};

export function ActivityFeed({ activities }: ActivityFeedProps) {
  // Show latest 10 activities
  const recentActivities = activities.slice(0, 10);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {recentActivities.map((activity) => {
            const Icon = activityIcons[activity.type];
            const colorClass = activityColors[activity.type];

            return (
              <div key={activity.id} className="flex gap-3">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${colorClass}`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    {activity.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-gray-500">
                      {activity.leadName}
                    </p>
                    <span className="text-xs text-gray-400">•</span>
                    <p className="text-xs text-gray-500">
                      {getRelativeTime(activity.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          {recentActivities.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">No recent activity</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
