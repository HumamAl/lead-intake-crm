import type { Activity } from '@/lib/types';

export const mockActivities: Activity[] = [
  // Recent activities (last 3 days)
  {
    id: "act-001",
    type: "lead_created",
    leadId: "lead-001",
    leadName: "Aisha Kamara",
    description: "New lead submitted via website form",
    performedBy: "System",
    timestamp: "2025-11-06T09:23:15Z"
  },
  {
    id: "act-002",
    type: "email_sent",
    leadId: "lead-001",
    leadName: "Aisha Kamara",
    description: "Automated welcome email sent",
    performedBy: "System",
    timestamp: "2025-11-06T09:23:18Z"
  },
  {
    id: "act-003",
    type: "automation_triggered",
    leadId: "lead-001",
    leadName: "Aisha Kamara",
    description: "Auto-qualify high-budget leads - Priority set to high",
    performedBy: "System",
    timestamp: "2025-11-06T09:23:20Z"
  },
  {
    id: "act-004",
    type: "tag_added",
    leadId: "lead-001",
    leadName: "Aisha Kamara",
    description: "Added tag: high-value",
    performedBy: "System",
    timestamp: "2025-11-06T09:23:22Z"
  },
  {
    id: "act-005",
    type: "note_added",
    leadId: "lead-001",
    leadName: "Aisha Kamara",
    description: "Initial lead submission received via website form. High budget and clear requirements.",
    performedBy: "Sarah Chen",
    timestamp: "2025-11-06T09:45:22Z"
  },
  {
    id: "act-006",
    type: "lead_created",
    leadId: "lead-002",
    leadName: "Carlos Mendoza",
    description: "New lead submitted via referral",
    performedBy: "System",
    timestamp: "2025-11-05T14:18:32Z"
  },
  {
    id: "act-007",
    type: "automation_triggered",
    leadId: "lead-002",
    leadName: "Carlos Mendoza",
    description: "Auto-qualify high-budget leads - Priority set to high",
    performedBy: "System",
    timestamp: "2025-11-05T14:18:35Z"
  },
  {
    id: "act-008",
    type: "tag_added",
    leadId: "lead-002",
    leadName: "Carlos Mendoza",
    description: "Added tag: high-value",
    performedBy: "System",
    timestamp: "2025-11-05T14:18:37Z"
  },
  {
    id: "act-009",
    type: "note_added",
    leadId: "lead-002",
    leadName: "Carlos Mendoza",
    description: "Warm referral from Jennifer at HealthTech Partners",
    performedBy: "Marcus Johnson",
    timestamp: "2025-11-05T15:30:18Z"
  },
  {
    id: "act-010",
    type: "lead_created",
    leadId: "lead-003",
    leadName: "Yuki Tanaka",
    description: "New lead submitted via LinkedIn",
    performedBy: "System",
    timestamp: "2025-11-04T16:42:09Z"
  },
  {
    id: "act-011",
    type: "lead_assigned",
    leadId: "lead-003",
    leadName: "Yuki Tanaka",
    description: "Assigned to Sarah Chen",
    performedBy: "Sarah Chen",
    timestamp: "2025-11-04T16:50:15Z"
  },
  {
    id: "act-012",
    type: "note_added",
    leadId: "lead-003",
    leadName: "Yuki Tanaka",
    description: "Interesting opportunity for bulk licensing",
    performedBy: "Sarah Chen",
    timestamp: "2025-11-04T17:15:42Z"
  },

  // Activities from 4-7 days ago
  {
    id: "act-013",
    type: "lead_created",
    leadId: "lead-004",
    leadName: "Fatima Al-Rashid",
    description: "New lead submitted from event",
    performedBy: "System",
    timestamp: "2025-11-03T11:05:47Z"
  },
  {
    id: "act-014",
    type: "automation_triggered",
    leadId: "lead-004",
    leadName: "Fatima Al-Rashid",
    description: "Auto-qualify high-budget leads - Priority set to high",
    performedBy: "System",
    timestamp: "2025-11-03T11:05:50Z"
  },
  {
    id: "act-015",
    type: "lead_assigned",
    leadId: "lead-004",
    leadName: "Fatima Al-Rashid",
    description: "Assigned to Marcus Johnson",
    performedBy: "Marcus Johnson",
    timestamp: "2025-11-03T11:20:33Z"
  },
  {
    id: "act-016",
    type: "note_added",
    leadId: "lead-004",
    leadName: "Fatima Al-Rashid",
    description: "Strong connection from Dubai event",
    performedBy: "Marcus Johnson",
    timestamp: "2025-11-03T14:20:18Z"
  },
  {
    id: "act-017",
    type: "lead_created",
    leadId: "lead-005",
    leadName: "Jamal Washington",
    description: "New lead submitted via partner",
    performedBy: "System",
    timestamp: "2025-11-02T08:30:21Z"
  },
  {
    id: "act-018",
    type: "lead_assigned",
    leadId: "lead-005",
    leadName: "Jamal Washington",
    description: "Assigned to Elena Rodriguez",
    performedBy: "Elena Rodriguez",
    timestamp: "2025-11-02T09:15:08Z"
  },
  {
    id: "act-019",
    type: "lead_created",
    leadId: "lead-006",
    leadName: "Raj Patel",
    description: "New lead submitted via website form",
    performedBy: "System",
    timestamp: "2025-11-01T13:15:08Z"
  },
  {
    id: "act-020",
    type: "email_sent",
    leadId: "lead-006",
    leadName: "Raj Patel",
    description: "Automated welcome email sent",
    performedBy: "System",
    timestamp: "2025-11-01T13:15:11Z"
  },
  {
    id: "act-021",
    type: "lead_assigned",
    leadId: "lead-006",
    leadName: "Raj Patel",
    description: "Assigned to James O'Brien",
    performedBy: "James O'Brien",
    timestamp: "2025-11-01T14:22:45Z"
  },

  // Activities from 1-2 weeks ago
  {
    id: "act-022",
    type: "status_changed",
    leadId: "lead-007",
    leadName: "Maria Gonzalez",
    description: "Status changed from 'new' to 'contacted'",
    performedBy: "Sarah Chen",
    timestamp: "2025-10-31T15:22:11Z"
  },
  {
    id: "act-023",
    type: "note_added",
    leadId: "lead-007",
    leadName: "Maria Gonzalez",
    description: "Initial discovery call completed",
    performedBy: "Sarah Chen",
    timestamp: "2025-10-31T15:22:11Z"
  },
  {
    id: "act-024",
    type: "status_changed",
    leadId: "lead-008",
    leadName: "Chen Wei",
    description: "Status changed from 'new' to 'contacted'",
    performedBy: "Marcus Johnson",
    timestamp: "2025-10-30T14:08:27Z"
  },
  {
    id: "act-025",
    type: "note_added",
    leadId: "lead-008",
    leadName: "Chen Wei",
    description: "First call went well. They're currently using a mix of WeChat, Excel, and email",
    performedBy: "Marcus Johnson",
    timestamp: "2025-10-30T14:08:27Z"
  },
  {
    id: "act-026",
    type: "status_changed",
    leadId: "lead-009",
    leadName: "Anastasia Volkov",
    description: "Status changed from 'new' to 'contacted'",
    performedBy: "Sarah Chen",
    timestamp: "2025-10-29T11:45:52Z"
  },
  {
    id: "act-027",
    type: "note_added",
    leadId: "lead-009",
    leadName: "Anastasia Volkov",
    description: "Had intro call. Logistics sales cycles are 6-12 months",
    performedBy: "Sarah Chen",
    timestamp: "2025-10-29T11:45:52Z"
  },
  {
    id: "act-028",
    type: "status_changed",
    leadId: "lead-010",
    leadName: "Kwame Osei",
    description: "Status changed from 'new' to 'contacted'",
    performedBy: "Elena Rodriguez",
    timestamp: "2025-10-28T09:30:15Z"
  },
  {
    id: "act-029",
    type: "note_added",
    leadId: "lead-010",
    leadName: "Kwame Osei",
    description: "Kwame is exploring multiple options. Not in a rush.",
    performedBy: "Elena Rodriguez",
    timestamp: "2025-10-28T09:30:15Z"
  },
  {
    id: "act-030",
    type: "status_changed",
    leadId: "lead-011",
    leadName: "Sophie Dubois",
    description: "Status changed from 'new' to 'contacted'",
    performedBy: "James O'Brien",
    timestamp: "2025-10-27T16:18:33Z"
  },
  {
    id: "act-031",
    type: "note_added",
    leadId: "lead-011",
    leadName: "Sophie Dubois",
    description: "Sophie wants a creative agency-specific demo",
    performedBy: "James O'Brien",
    timestamp: "2025-10-27T16:18:33Z"
  },

  // Activities from 2-4 weeks ago
  {
    id: "act-032",
    type: "status_changed",
    leadId: "lead-012",
    leadName: "Mohammed Hassan",
    description: "Status changed from 'contacted' to 'qualified'",
    performedBy: "Marcus Johnson",
    timestamp: "2025-10-26T13:45:19Z"
  },
  {
    id: "act-033",
    type: "note_added",
    leadId: "lead-012",
    leadName: "Mohammed Hassan",
    description: "Had deep-dive technical call with their IT team",
    performedBy: "Marcus Johnson",
    timestamp: "2025-10-26T13:45:19Z"
  },
  {
    id: "act-034",
    type: "automation_triggered",
    leadId: "lead-012",
    leadName: "Mohammed Hassan",
    description: "Score update on activity - Lead score recalculated",
    performedBy: "System",
    timestamp: "2025-10-26T13:45:22Z"
  },
  {
    id: "act-035",
    type: "status_changed",
    leadId: "lead-013",
    leadName: "Isabella Romano",
    description: "Status changed from 'contacted' to 'qualified'",
    performedBy: "Sarah Chen",
    timestamp: "2025-10-25T10:22:48Z"
  },
  {
    id: "act-036",
    type: "note_added",
    leadId: "lead-013",
    leadName: "Isabella Romano",
    description: "Demo completed with Isabella and her project managers",
    performedBy: "Sarah Chen",
    timestamp: "2025-10-25T10:22:48Z"
  },
  {
    id: "act-037",
    type: "status_changed",
    leadId: "lead-014",
    leadName: "Dmitri Petrov",
    description: "Status changed from 'contacted' to 'qualified'",
    performedBy: "Marcus Johnson",
    timestamp: "2025-10-24T14:55:03Z"
  },
  {
    id: "act-038",
    type: "note_added",
    leadId: "lead-014",
    leadName: "Dmitri Petrov",
    description: "Dmitri's team is very technical. They want to see our API documentation",
    performedBy: "Marcus Johnson",
    timestamp: "2025-10-24T14:55:03Z"
  },
  {
    id: "act-039",
    type: "status_changed",
    leadId: "lead-015",
    leadName: "Amara Okafor",
    description: "Status changed from 'contacted' to 'qualified'",
    performedBy: "Elena Rodriguez",
    timestamp: "2025-10-23T11:20:37Z"
  },
  {
    id: "act-040",
    type: "note_added",
    leadId: "lead-015",
    leadName: "Amara Okafor",
    description: "Education sector is new for us but their needs align well",
    performedBy: "Elena Rodriguez",
    timestamp: "2025-10-23T11:20:37Z"
  },
  {
    id: "act-041",
    type: "status_changed",
    leadId: "lead-016",
    leadName: "Lucas Silva",
    description: "Status changed from 'contacted' to 'qualified'",
    performedBy: "Sarah Chen",
    timestamp: "2025-10-22T09:42:25Z"
  },
  {
    id: "act-042",
    type: "note_added",
    leadId: "lead-016",
    leadName: "Lucas Silva",
    description: "Marketing agency managing 40+ clients. Main challenge is client communication tracking",
    performedBy: "Sarah Chen",
    timestamp: "2025-10-22T09:42:25Z"
  },
  {
    id: "act-043",
    type: "status_changed",
    leadId: "lead-017",
    leadName: "Priya Sharma",
    description: "Status changed from 'qualified' to 'proposal'",
    performedBy: "Marcus Johnson",
    timestamp: "2025-10-20T15:33:18Z"
  },
  {
    id: "act-044",
    type: "note_added",
    leadId: "lead-017",
    leadName: "Priya Sharma",
    description: "Sent comprehensive proposal including enterprise features",
    performedBy: "Marcus Johnson",
    timestamp: "2025-10-20T15:33:18Z"
  },
  {
    id: "act-045",
    type: "status_changed",
    leadId: "lead-018",
    leadName: "Henrik Andersson",
    description: "Status changed from 'qualified' to 'proposal'",
    performedBy: "Sarah Chen",
    timestamp: "2025-10-19T12:08:44Z"
  },
  {
    id: "act-046",
    type: "note_added",
    leadId: "lead-018",
    leadName: "Henrik Andersson",
    description: "Proposal sent for $56.8K including custom fields for renewable energy",
    performedBy: "Sarah Chen",
    timestamp: "2025-10-19T12:08:44Z"
  },
  {
    id: "act-047",
    type: "status_changed",
    leadId: "lead-019",
    leadName: "Kenji Yamamoto",
    description: "Status changed from 'qualified' to 'proposal'",
    performedBy: "Marcus Johnson",
    timestamp: "2025-10-18T10:15:52Z"
  },
  {
    id: "act-048",
    type: "note_added",
    leadId: "lead-019",
    leadName: "Kenji Yamamoto",
    description: "Multilingual CRM proposal sent. They need Japanese, English, and Mandarin interfaces",
    performedBy: "Marcus Johnson",
    timestamp: "2025-10-18T10:15:52Z"
  },
  {
    id: "act-049",
    type: "status_changed",
    leadId: "lead-020",
    leadName: "Zainab Khan",
    description: "Status changed from 'qualified' to 'proposal'",
    performedBy: "Elena Rodriguez",
    timestamp: "2025-10-17T14:42:09Z"
  },
  {
    id: "act-050",
    type: "note_added",
    leadId: "lead-020",
    leadName: "Zainab Khan",
    description: "Pharmaceutical industry has specific compliance needs",
    performedBy: "Elena Rodriguez",
    timestamp: "2025-10-17T14:42:09Z"
  },

  // Won deals
  {
    id: "act-051",
    type: "status_changed",
    leadId: "lead-021",
    leadName: "Emma O'Connor",
    description: "Status changed from 'proposal' to 'won'",
    performedBy: "Marcus Johnson",
    timestamp: "2025-10-15T16:28:41Z"
  },
  {
    id: "act-052",
    type: "note_added",
    leadId: "lead-021",
    leadName: "Emma O'Connor",
    description: "Deal closed! Emma signed contract for $67.4K",
    performedBy: "Marcus Johnson",
    timestamp: "2025-10-15T16:28:41Z"
  },
  {
    id: "act-053",
    type: "status_changed",
    leadId: "lead-022",
    leadName: "David Kim",
    description: "Status changed from 'proposal' to 'won'",
    performedBy: "Sarah Chen",
    timestamp: "2025-10-12T13:55:19Z"
  },
  {
    id: "act-054",
    type: "note_added",
    leadId: "lead-022",
    leadName: "David Kim",
    description: "Contract signed for $29.8K! David was impressed by our portfolio company management features",
    performedBy: "Sarah Chen",
    timestamp: "2025-10-12T13:55:19Z"
  },
  {
    id: "act-055",
    type: "status_changed",
    leadId: "lead-023",
    leadName: "Gabriela Torres",
    description: "Status changed from 'proposal' to 'won'",
    performedBy: "Elena Rodriguez",
    timestamp: "2025-10-08T11:22:47Z"
  }
];
