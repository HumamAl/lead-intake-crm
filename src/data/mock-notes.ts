import type { Note } from '@/lib/types';

export const mockNotes: Note[] = [
  // Notes for lead-001 (Aisha Kamara - NEW)
  {
    id: "note-001",
    leadId: "lead-001",
    authorId: "user-001",
    authorName: "Sarah Chen",
    content: "Initial lead submission received via website form. High budget and clear requirements. Need to reach out within 24 hours.",
    createdAt: "2025-11-06T09:45:22Z"
  },

  // Notes for lead-002 (Carlos Mendoza - NEW)
  {
    id: "note-002",
    leadId: "lead-002",
    authorId: "user-002",
    authorName: "Marcus Johnson",
    content: "Warm referral from Jennifer at HealthTech Partners. She mentioned they have budget approved and are moving quickly. Will call tomorrow morning.",
    createdAt: "2025-11-05T15:30:18Z"
  },

  // Notes for lead-003 (Yuki Tanaka - NEW)
  {
    id: "note-003",
    leadId: "lead-003",
    authorId: "user-001",
    authorName: "Sarah Chen",
    content: "Interesting opportunity for bulk licensing. No specific budget mentioned but could be significant deal if we can serve their portfolio companies well.",
    createdAt: "2025-11-04T17:15:42Z"
  },

  // Notes for lead-007 (Maria Gonzalez - CONTACTED)
  {
    id: "note-004",
    leadId: "lead-007",
    authorId: "user-001",
    authorName: "Sarah Chen",
    content: "Initial discovery call completed. Main pain point is project handoff between sales and delivery. They lose context and clients notice. Want demo of project management integrations.",
    createdAt: "2025-10-31T15:22:11Z"
  },
  {
    id: "note-005",
    leadId: "lead-007",
    authorId: "user-001",
    authorName: "Sarah Chen",
    content: "Maria is the decision maker but wants to involve her COO in next conversation. Scheduling demo for next week with both of them.",
    createdAt: "2025-10-31T15:35:47Z"
  },

  // Notes for lead-008 (Chen Wei - CONTACTED)
  {
    id: "note-006",
    leadId: "lead-008",
    authorId: "user-002",
    authorName: "Marcus Johnson",
    content: "First call went well. They're currently using a mix of WeChat, Excel, and email to track everything. Major expansion planned for next quarter.",
    createdAt: "2025-10-30T14:08:27Z"
  },
  {
    id: "note-007",
    leadId: "lead-008",
    authorId: "user-002",
    authorName: "Marcus Johnson",
    content: "Need to prepare materials in Mandarin for their sales team. Chen Wei speaks perfect English but wants training materials localized.",
    createdAt: "2025-10-30T14:22:53Z"
  },

  // Notes for lead-009 (Anastasia Volkov - CONTACTED)
  {
    id: "note-008",
    leadId: "lead-009",
    authorId: "user-001",
    authorName: "Sarah Chen",
    content: "Had intro call. Logistics sales cycles are 6-12 months with multiple touchpoints. They need better visibility into where deals are stuck.",
    createdAt: "2025-10-29T11:45:52Z"
  },
  {
    id: "note-009",
    leadId: "lead-009",
    authorId: "user-001",
    authorName: "Sarah Chen",
    content: "Anastasia is interested in our pipeline reporting features. Sending her case study from another logistics company we work with.",
    createdAt: "2025-10-29T12:08:15Z"
  },

  // Notes for lead-012 (Mohammed Hassan - QUALIFIED)
  {
    id: "note-010",
    leadId: "lead-012",
    authorId: "user-002",
    authorName: "Marcus Johnson",
    content: "Had deep-dive technical call with their IT team. Compliance requirements are strict but manageable. They need audit logs and data residency in Saudi Arabia.",
    createdAt: "2025-10-26T13:45:19Z"
  },
  {
    id: "note-011",
    leadId: "lead-012",
    authorId: "user-002",
    authorName: "Marcus Johnson",
    content: "Mohammed confirmed budget of $94.5K is approved. Moving to proposal stage. Need to include implementation timeline and training plan.",
    createdAt: "2025-10-26T14:12:33Z"
  },
  {
    id: "note-012",
    leadId: "lead-012",
    authorId: "user-002",
    authorName: "Marcus Johnson",
    content: "Security review completed by their team. All requirements met. Mohammed wants proposal by end of week.",
    createdAt: "2025-10-26T16:48:09Z"
  },

  // Notes for lead-013 (Isabella Romano - QUALIFIED)
  {
    id: "note-013",
    leadId: "lead-013",
    authorId: "user-001",
    authorName: "Sarah Chen",
    content: "Demo completed with Isabella and her project managers. They loved the visual pipeline and timeline features. Architecture projects have long lead times so visibility is critical.",
    createdAt: "2025-10-25T10:22:48Z"
  },
  {
    id: "note-014",
    leadId: "lead-013",
    authorId: "user-001",
    authorName: "Sarah Chen",
    content: "Isabella wants to see how we handle document management for construction permits and approvals. Will do technical deep-dive next week.",
    createdAt: "2025-10-25T10:45:21Z"
  },

  // Notes for lead-014 (Dmitri Petrov - QUALIFIED)
  {
    id: "note-015",
    leadId: "lead-014",
    authorId: "user-002",
    authorName: "Marcus Johnson",
    content: "Dmitri's team is very technical. They want to see our API documentation and discuss custom integrations with their product.",
    createdAt: "2025-10-24T14:55:03Z"
  },
  {
    id: "note-016",
    leadId: "lead-014",
    authorId: "user-002",
    authorName: "Marcus Johnson",
    content: "Strong fit. They need advanced automation for lead scoring and routing. Current tool can't handle their complexity. Moving fast.",
    createdAt: "2025-10-24T15:18:44Z"
  },
  {
    id: "note-017",
    leadId: "lead-014",
    authorId: "user-002",
    authorName: "Marcus Johnson",
    content: "Scheduled technical workshop with their engineering team for next Thursday. Dmitri is very engaged and asking smart questions.",
    createdAt: "2025-10-24T15:42:19Z"
  },

  // Notes for lead-015 (Amara Okafor - QUALIFIED)
  {
    id: "note-018",
    leadId: "lead-015",
    authorId: "user-003",
    authorName: "Elena Rodriguez",
    content: "Education sector is new for us but their needs align well with our product. Student recruitment is essentially a sales funnel.",
    createdAt: "2025-10-23T11:20:37Z"
  },
  {
    id: "note-019",
    leadId: "lead-015",
    authorId: "user-003",
    authorName: "Elena Rodriguez",
    content: "Amara wants to track students from inquiry through enrollment. Also managing alumni relations for fundraising. Could be good case study.",
    createdAt: "2025-10-23T11:38:52Z"
  },

  // Notes for lead-016 (Lucas Silva - QUALIFIED)
  {
    id: "note-020",
    leadId: "lead-016",
    authorId: "user-001",
    authorName: "Sarah Chen",
    content: "Marketing agency managing 40+ clients. Main challenge is client communication tracking across email, Slack, and meetings. Everything scattered.",
    createdAt: "2025-10-22T09:42:25Z"
  },
  {
    id: "note-021",
    leadId: "lead-016",
    authorId: "user-001",
    authorName: "Sarah Chen",
    content: "Lucas is price-conscious but understands value. Showed him ROI calculator with time saved on admin work. He's interested in annual contract for discount.",
    createdAt: "2025-10-22T10:15:08Z"
  },

  // Notes for lead-017 (Priya Sharma - PROPOSAL)
  {
    id: "note-022",
    leadId: "lead-017",
    authorId: "user-002",
    authorName: "Marcus Johnson",
    content: "Sent comprehensive proposal including enterprise features, implementation plan, and training for 60 consultants. Budget is $73.2K.",
    createdAt: "2025-10-20T15:33:18Z"
  },
  {
    id: "note-023",
    leadId: "lead-017",
    authorId: "user-002",
    authorName: "Marcus Johnson",
    content: "Priya confirmed they're reviewing our proposal alongside two other vendors. Decision expected within 2 weeks. We're their top choice based on demo.",
    createdAt: "2025-10-21T09:45:33Z"
  },
  {
    id: "note-024",
    leadId: "lead-017",
    authorId: "user-002",
    authorName: "Marcus Johnson",
    content: "Follow-up call scheduled for next Monday to answer any questions from their partners. Deal looks strong.",
    createdAt: "2025-10-21T14:22:47Z"
  },

  // Notes for lead-018 (Henrik Andersson - PROPOSAL)
  {
    id: "note-025",
    leadId: "lead-018",
    authorId: "user-001",
    authorName: "Sarah Chen",
    content: "Proposal sent for $56.8K including custom fields for renewable energy project types. Henrik needs approval from board next month.",
    createdAt: "2025-10-19T12:08:44Z"
  },
  {
    id: "note-026",
    leadId: "lead-018",
    authorId: "user-001",
    authorName: "Sarah Chen",
    content: "Henrik loves the product but concerned about data migration from their legacy system. Offered to include migration support in proposal.",
    createdAt: "2025-10-19T13:55:22Z"
  },
  {
    id: "note-027",
    leadId: "lead-018",
    authorId: "user-001",
    authorName: "Sarah Chen",
    content: "Board presentation scheduled for November 15th. Henrik asked for reference calls with 2 existing enterprise customers.",
    createdAt: "2025-10-20T08:30:15Z"
  },

  // Notes for lead-019 (Kenji Yamamoto - PROPOSAL)
  {
    id: "note-028",
    leadId: "lead-019",
    authorId: "user-002",
    authorName: "Marcus Johnson",
    content: "Multilingual CRM proposal sent. They need Japanese, English, and Mandarin interfaces. Contract tracking is critical for their international trade.",
    createdAt: "2025-10-18T10:15:52Z"
  },
  {
    id: "note-029",
    leadId: "lead-019",
    authorId: "user-002",
    authorName: "Marcus Johnson",
    content: "Kenji requested modifications to pricing structure. They want to phase implementation across regions. Preparing revised proposal.",
    createdAt: "2025-10-18T15:42:38Z"
  },

  // Notes for lead-020 (Zainab Khan - PROPOSAL)
  {
    id: "note-030",
    leadId: "lead-020",
    authorId: "user-003",
    authorName: "Elena Rodriguez",
    content: "Pharmaceutical industry has specific compliance needs. Proposal includes audit trails and documentation features. Budget is $48.9K.",
    createdAt: "2025-10-17T14:42:09Z"
  },
  {
    id: "note-031",
    leadId: "lead-020",
    authorId: "user-003",
    authorName: "Elena Rodriguez",
    content: "Zainab is comparing us with one other vendor. Our compliance features are stronger. Decision expected by month end.",
    createdAt: "2025-10-18T11:20:44Z"
  },

  // Notes for lead-021 (Emma O'Connor - WON)
  {
    id: "note-032",
    leadId: "lead-021",
    authorId: "user-002",
    authorName: "Marcus Johnson",
    content: "Deal closed! Emma signed contract for $67.4K. Implementation starts next week. Their 40 brokers will be onboarded in phases over 6 weeks.",
    createdAt: "2025-10-15T16:28:41Z"
  },
  {
    id: "note-033",
    leadId: "lead-021",
    authorId: "user-002",
    authorName: "Marcus Johnson",
    content: "Kickoff meeting scheduled for October 22nd. Emma is excited and already talking about expanding to their UK office next year.",
    createdAt: "2025-10-16T09:15:33Z"
  },
  {
    id: "note-034",
    leadId: "lead-021",
    authorId: "user-002",
    authorName: "Marcus Johnson",
    content: "Emma referred us to two other insurance brokers in Ireland. Strong testimonial potential here.",
    createdAt: "2025-10-17T10:42:18Z"
  },

  // Notes for lead-022 (David Kim - WON)
  {
    id: "note-035",
    leadId: "lead-022",
    authorId: "user-001",
    authorName: "Sarah Chen",
    content: "Contract signed for $29.8K! David was impressed by our portfolio company management features and investor reporting.",
    createdAt: "2025-10-12T13:55:19Z"
  },
  {
    id: "note-036",
    leadId: "lead-022",
    authorId: "user-001",
    authorName: "Sarah Chen",
    content: "Implementation in progress. David's team is highly engaged. They're already customizing dashboards for their investment committee.",
    createdAt: "2025-10-14T11:30:22Z"
  },

  // Notes for lead-023 (Gabriela Torres - WON)
  {
    id: "note-037",
    leadId: "lead-023",
    authorId: "user-003",
    authorName: "Elena Rodriguez",
    content: "Law firm deal closed at $34.6K. Gabriela appreciated our consultative approach and deep understanding of professional services.",
    createdAt: "2025-10-08T11:22:47Z"
  },
  {
    id: "note-038",
    leadId: "lead-023",
    authorId: "user-003",
    authorName: "Elena Rodriguez",
    content: "Training completed for all 20 attorneys. Gabriela mentioned they're seeing immediate time savings in client intake process.",
    createdAt: "2025-10-11T14:18:55Z"
  },

  // Notes for lead-024 (Ahmed Ibrahim - LOST)
  {
    id: "note-039",
    leadId: "lead-024",
    authorId: "user-004",
    authorName: "James O'Brien",
    content: "Ahmed decided to go with a construction-specific tool. Our product was too general for their needs. Budget was also a concern.",
    createdAt: "2025-09-25T10:15:33Z"
  },
  {
    id: "note-040",
    leadId: "lead-024",
    authorId: "user-004",
    authorName: "James O'Brien",
    content: "Good learning experience. We need better positioning for construction/project management verticals. Ahmed was polite and appreciative of our time.",
    createdAt: "2025-09-25T10:42:08Z"
  },

  // Notes for lead-025 (Nina Kowalski - LOST)
  {
    id: "note-041",
    leadId: "lead-025",
    authorId: "user-005",
    authorName: "Priya Patel",
    content: "Nina chose a retail-specific CRM with pre-built POS integrations. Price was competitive but they needed industry-specific features we don't have.",
    createdAt: "2025-09-20T09:08:22Z"
  },
  {
    id: "note-042",
    leadId: "lead-025",
    authorId: "user-005",
    authorName: "Priya Patel",
    content: "Asked for feedback. Nina said our product is excellent but not specialized enough for retail. She'd recommend us for professional services firms.",
    createdAt: "2025-09-20T09:30:45Z"
  },

  // Additional notes for active deals
  {
    id: "note-043",
    leadId: "lead-011",
    authorId: "user-004",
    authorName: "James O'Brien",
    content: "Sophie wants a creative agency-specific demo. Will prepare case study from similar agency client.",
    createdAt: "2025-10-27T16:18:33Z"
  },

  {
    id: "note-044",
    leadId: "lead-010",
    authorId: "user-003",
    authorName: "Elena Rodriguez",
    content: "Kwame is exploring multiple options. Not in a rush. Will check in again in 2 weeks.",
    createdAt: "2025-10-28T09:30:15Z"
  },

  {
    id: "note-045",
    leadId: "lead-004",
    authorId: "user-002",
    authorName: "Marcus Johnson",
    content: "Strong connection from Dubai event. Fatima is well-connected in Middle East consulting space. Could lead to more opportunities.",
    createdAt: "2025-11-03T14:20:18Z"
  }
];
