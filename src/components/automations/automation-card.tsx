"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Zap, Tag, Mail, Bell, UserPlus, Activity, Edit } from "lucide-react";
import { cn, formatDateTime } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import type { AutomationRule } from "@/lib/types";

interface AutomationCardProps {
  rule: AutomationRule;
  onToggle: (id: string, enabled: boolean) => void;
}

const triggerIcons: Record<string, typeof Zap> = {
  lead_created: Zap,
  status_changed: Activity,
  time_based: Bell,
};

const actionIcons: Record<string, typeof Mail> = {
  send_email: Mail,
  add_tag: Tag,
  slack_notification: Bell,
  update_priority: Activity,
  assign_lead: UserPlus,
  create_task: Activity,
  update_score: Activity,
  add_activity: Activity,
  notify_user: Bell,
};

export function AutomationCard({ rule, onToggle }: AutomationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const TriggerIcon = triggerIcons[rule.trigger] || Zap;

  const handleEdit = () => {
    setShowEditModal(true);
  };

  return (
    <Card className={cn(
      "transition-all",
      !rule.enabled && "opacity-60"
    )}>
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <TriggerIcon size={16} className="text-indigo-600" />
              <h3 className="font-semibold text-gray-900">{rule.name}</h3>
            </div>
            <p className="text-sm text-gray-600">{rule.description}</p>
          </div>

          {/* Toggle Switch */}
          <button
            onClick={() => onToggle(rule.id, !rule.enabled)}
            className={cn(
              "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex-shrink-0",
              rule.enabled ? "bg-indigo-600" : "bg-gray-300"
            )}
          >
            <span
              className={cn(
                "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                rule.enabled ? "translate-x-6" : "translate-x-1"
              )}
            />
          </button>
        </div>

        {/* Trigger Type */}
        <div className="mb-3">
          <Badge variant="info" className="text-xs">
            Trigger: {rule.trigger.replace(/_/g, " ")}
          </Badge>
        </div>

        {/* Conditions - Pills */}
        {rule.conditions.length > 0 && (
          <div className="mb-3">
            <div className="text-xs text-gray-500 mb-1.5">Conditions:</div>
            <div className="flex flex-wrap gap-1.5">
              {rule.conditions.map((condition, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-2 py-1 rounded text-xs bg-purple-50 text-purple-700 border border-purple-200"
                >
                  {condition.field} {condition.operator.replace(/_/g, " ")} {condition.value}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions - Icons */}
        <div className="mb-3">
          <div className="text-xs text-gray-500 mb-1.5">Actions:</div>
          <div className="flex flex-wrap gap-2">
            {rule.actions.map((action, idx) => {
              const ActionIcon = actionIcons[action.type] || Activity;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 px-2 py-1 rounded bg-green-50 text-green-700 border border-green-200 text-xs"
                >
                  <ActionIcon size={12} />
                  <span>{action.type.replace(/_/g, " ")}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-3">
          <div className="flex items-center gap-4">
            <span>Triggered {rule.triggerCount} times</span>
            {rule.lastTriggered && (
              <span>Last: {formatDateTime(rule.lastTriggered)}</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-auto py-1 px-2"
            >
              {isExpanded ? (
                <>
                  <ChevronUp size={14} />
                  Less
                </>
              ) : (
                <>
                  <ChevronDown size={14} />
                  Details
                </>
              )}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleEdit}
              className="h-auto py-1 px-2"
            >
              <Edit size={14} />
              Edit
            </Button>
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
            <div>
              <div className="text-xs font-semibold text-gray-700 mb-2">Trigger Configuration</div>
              <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded">
                When <span className="font-medium">{rule.trigger.replace(/_/g, " ")}</span> event occurs
              </div>
            </div>

            {rule.conditions.length > 0 && (
              <div>
                <div className="text-xs font-semibold text-gray-700 mb-2">Condition Details</div>
                <div className="space-y-1.5">
                  {rule.conditions.map((condition, idx) => (
                    <div key={idx} className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                      <span className="font-medium">{condition.field}</span>{" "}
                      <span className="text-purple-600">{condition.operator.replace(/_/g, " ")}</span>{" "}
                      <span className="font-medium">{condition.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="text-xs font-semibold text-gray-700 mb-2">Action Details</div>
              <div className="space-y-1.5">
                {rule.actions.map((action, idx) => (
                  <div key={idx} className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                    <div className="font-medium mb-1">{action.type.replace(/_/g, " ")}</div>
                    <div className="text-gray-500 pl-3">
                      {Object.entries(action.config).map(([key, value]) => (
                        <div key={key}>
                          {key}: <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Automation"
        description="Modify the configuration of this automation rule"
        size="md"
      >
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              Editing automation rules is available in the full version. This demo displays the current rule configuration.
            </p>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-700">Rule Name</label>
              <p className="mt-1 text-gray-900">{rule.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Description</label>
              <p className="mt-1 text-gray-600">{rule.description}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Status</label>
              <p className="mt-1">
                <Badge variant={rule.enabled ? "success" : "default"}>
                  {rule.enabled ? "Enabled" : "Disabled"}
                </Badge>
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button variant="outline" onClick={() => setShowEditModal(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </Card>
  );
}
