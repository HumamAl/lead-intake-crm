export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost';
export type LeadPriority = 'high' | 'medium' | 'low';
export type LeadSource = 'website' | 'referral' | 'linkedin' | 'cold_outreach' | 'partner' | 'event' | 'other';

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  source: LeadSource;
  status: LeadStatus;
  priority: LeadPriority;
  tags: string[];
  budget: number | null;
  message: string;
  assignedTo: string | null;
  score: number;
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  id: string;
  leadId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
}

export interface AutomationRule {
  id: string;
  name: string;
  description: string;
  trigger: string;
  conditions: { field: string; operator: string; value: string }[];
  actions: { type: string; config: Record<string, string> }[];
  enabled: boolean;
  lastTriggered: string | null;
  triggerCount: number;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'member';
  avatar: string | null;
  leadsAssigned: number;
}

export interface Activity {
  id: string;
  type: 'lead_created' | 'status_changed' | 'note_added' | 'email_sent' | 'lead_assigned' | 'tag_added' | 'automation_triggered';
  leadId: string;
  leadName: string;
  description: string;
  performedBy: string;
  timestamp: string;
}

export interface DashboardStats {
  totalLeads: number;
  newLeadsToday: number;
  qualifiedLeads: number;
  conversionRate: number;
  averageResponseTime: string;
  totalRevenuePipeline: number;
}

export interface IntakeFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  budget: string;
  source: LeadSource;
  message: string;
}
