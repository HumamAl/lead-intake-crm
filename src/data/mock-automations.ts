import type { AutomationRule } from '@/lib/types';

export const mockAutomations: AutomationRule[] = [
  {
    id: "rule-001",
    name: "Auto-qualify high-budget leads",
    description: "Automatically set priority to high when lead budget exceeds $10,000",
    trigger: "lead_created",
    conditions: [
      { field: "budget", operator: "greater_than", value: "10000" }
    ],
    actions: [
      { type: "update_priority", config: { priority: "high" } },
      { type: "add_tag", config: { tag: "high-value" } }
    ],
    enabled: true,
    lastTriggered: "2025-11-06T09:23:15Z",
    triggerCount: 142
  },
  {
    id: "rule-002",
    name: "Welcome email on submission",
    description: "Send automated confirmation email when new lead submits contact form",
    trigger: "lead_created",
    conditions: [
      { field: "source", operator: "equals", value: "website" }
    ],
    actions: [
      { type: "send_email", config: { template: "welcome", to: "lead_email" } },
      { type: "add_activity", config: { type: "email_sent", description: "Welcome email sent" } }
    ],
    enabled: true,
    lastTriggered: "2025-11-06T09:23:18Z",
    triggerCount: 287
  },
  {
    id: "rule-003",
    name: "Notify team on new lead",
    description: "Send Slack notification to #leads channel when new lead arrives",
    trigger: "lead_created",
    conditions: [],
    actions: [
      { type: "slack_notification", config: { channel: "#leads", message: "New lead: {{lead.name}} from {{lead.company}}" } }
    ],
    enabled: true,
    lastTriggered: "2025-11-06T09:23:15Z",
    triggerCount: 389
  },
  {
    id: "rule-004",
    name: "Follow-up reminder",
    description: "Send reminder to assigned rep if no contact activity within 24 hours of lead creation",
    trigger: "time_based",
    conditions: [
      { field: "status", operator: "equals", value: "new" },
      { field: "hours_since_created", operator: "greater_than", value: "24" },
      { field: "assignedTo", operator: "not_null", value: "" }
    ],
    actions: [
      { type: "send_email", config: { template: "follow_up_reminder", to: "assigned_rep" } },
      { type: "create_task", config: { title: "Follow up with {{lead.name}}", priority: "high" } }
    ],
    enabled: true,
    lastTriggered: "2025-11-05T10:15:42Z",
    triggerCount: 67
  },
  {
    id: "rule-005",
    name: "Score update on activity",
    description: "Recalculate lead score when status changes to better stage",
    trigger: "status_changed",
    conditions: [
      { field: "new_status", operator: "in", value: "qualified,proposal,won" }
    ],
    actions: [
      { type: "update_score", config: { method: "recalculate" } },
      { type: "add_activity", config: { type: "score_updated", description: "Lead score recalculated" } }
    ],
    enabled: true,
    lastTriggered: "2025-11-04T16:22:08Z",
    triggerCount: 234
  },
  {
    id: "rule-006",
    name: "Auto-assign round robin",
    description: "Assign new leads to team members in rotation based on current workload",
    trigger: "lead_created",
    conditions: [
      { field: "assignedTo", operator: "is_null", value: "" }
    ],
    actions: [
      { type: "assign_lead", config: { method: "round_robin", pool: "all_members" } },
      { type: "add_activity", config: { type: "lead_assigned", description: "Lead auto-assigned" } }
    ],
    enabled: false,
    lastTriggered: "2025-10-28T14:33:21Z",
    triggerCount: 156
  },
  {
    id: "rule-007",
    name: "Tag enterprise leads",
    description: "Automatically tag leads from companies with 100+ employees as enterprise",
    trigger: "lead_created",
    conditions: [
      { field: "company_size", operator: "greater_than", value: "100" }
    ],
    actions: [
      { type: "add_tag", config: { tag: "enterprise" } },
      { type: "notify_user", config: { user_id: "user-002", message: "New enterprise lead assigned" } }
    ],
    enabled: true,
    lastTriggered: "2025-11-03T11:05:47Z",
    triggerCount: 89
  },
  {
    id: "rule-008",
    name: "Lost lead feedback",
    description: "Send feedback request email when lead status is changed to lost",
    trigger: "status_changed",
    conditions: [
      { field: "new_status", operator: "equals", value: "lost" }
    ],
    actions: [
      { type: "send_email", config: { template: "feedback_request", to: "lead_email" } },
      { type: "create_task", config: { title: "Document loss reason for {{lead.name}}", assignee: "assigned_rep" } }
    ],
    enabled: false,
    lastTriggered: "2025-09-25T10:15:33Z",
    triggerCount: 18
  }
];
