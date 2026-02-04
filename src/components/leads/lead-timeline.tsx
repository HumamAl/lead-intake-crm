"use client";

import { useState } from "react";
import {
  UserPlus,
  MessageSquare,
  Mail,
  Tag,
  Activity as ActivityIcon,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";
import type { Activity } from "@/lib/types";
import { getRelativeTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";

interface LeadTimelineProps {
  activities: Activity[];
  leadId: string;
}

export function LeadTimeline({ activities, leadId }: LeadTimelineProps) {
  const [filterType, setFilterType] = useState<string>("all");

  const getActivityIcon = (type: Activity["type"]) => {
    const iconMap = {
      lead_created: UserPlus,
      status_changed: RefreshCw,
      note_added: MessageSquare,
      email_sent: Mail,
      lead_assigned: CheckCircle2,
      tag_added: Tag,
      automation_triggered: ActivityIcon,
    };
    const Icon = iconMap[type] || ActivityIcon;
    return <Icon size={16} />;
  };

  const getActivityColor = (type: Activity["type"]) => {
    const colorMap = {
      lead_created: "bg-green-100 text-green-600",
      status_changed: "bg-blue-100 text-blue-600",
      note_added: "bg-purple-100 text-purple-600",
      email_sent: "bg-indigo-100 text-indigo-600",
      lead_assigned: "bg-yellow-100 text-yellow-600",
      tag_added: "bg-pink-100 text-pink-600",
      automation_triggered: "bg-orange-100 text-orange-600",
    };
    return colorMap[type] || "bg-gray-100 text-gray-600";
  };

  const filteredActivities = activities.filter(activity => {
    if (activity.leadId !== leadId) return false;
    if (filterType === "all") return true;
    return activity.type === filterType;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Activity Timeline</h3>
        <Select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="w-48"
        >
          <option value="all">All Activity</option>
          <option value="lead_created">Lead Created</option>
          <option value="status_changed">Status Changes</option>
          <option value="note_added">Notes</option>
          <option value="email_sent">Emails</option>
          <option value="lead_assigned">Assignments</option>
          <option value="tag_added">Tags</option>
          <option value="automation_triggered">Automations</option>
        </Select>
      </div>

      {filteredActivities.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <ActivityIcon size={48} className="mx-auto mb-4 text-gray-300" />
          <p>No activity found</p>
        </div>
      ) : (
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

          <div className="space-y-6">
            {filteredActivities.map((activity, index) => (
              <div key={activity.id} className="relative flex gap-4">
                {/* Icon */}
                <div
                  className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full ${getActivityColor(
                    activity.type
                  )}`}
                >
                  {getActivityIcon(activity.type)}
                </div>

                {/* Content */}
                <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.description}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-gray-500">
                          by {activity.performedBy}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">
                          {getRelativeTime(activity.timestamp)}
                        </span>
                      </div>
                    </div>
                    <Badge variant="default" className="text-xs">
                      {activity.type.replace(/_/g, " ")}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
