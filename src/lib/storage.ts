import type { Lead, Note, Activity, AutomationRule, TeamMember, DashboardStats } from './types';
import { mockLeads } from '@/data/mock-leads';
import { mockNotes } from '@/data/mock-notes';
import { mockActivities } from '@/data/mock-activities';
import { mockAutomations } from '@/data/mock-automations';
import { mockTeam } from '@/data/mock-team';

const STORAGE_KEYS = {
  LEADS: 'crm_leads',
  NOTES: 'crm_notes',
  ACTIVITIES: 'crm_activities',
  AUTOMATIONS: 'crm_automations',
  TEAM: 'crm_team',
  INITIALIZED: 'crm_initialized'
} as const;

// Helper to safely parse JSON from localStorage
function safeJsonParse<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;

  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error);
    return fallback;
  }
}

// Helper to safely set JSON in localStorage
function safeJsonSet(key: string, value: unknown): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
  }
}

// Initialize storage with mock data if empty
export function initializeStorage(): void {
  if (typeof window === 'undefined') return;

  const isInitialized = localStorage.getItem(STORAGE_KEYS.INITIALIZED);

  if (!isInitialized) {
    safeJsonSet(STORAGE_KEYS.LEADS, mockLeads);
    safeJsonSet(STORAGE_KEYS.NOTES, mockNotes);
    safeJsonSet(STORAGE_KEYS.ACTIVITIES, mockActivities);
    safeJsonSet(STORAGE_KEYS.AUTOMATIONS, mockAutomations);
    safeJsonSet(STORAGE_KEYS.TEAM, mockTeam);
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
  }
}

// Lead operations
export function getLeads(): Lead[] {
  return safeJsonParse<Lead[]>(STORAGE_KEYS.LEADS, []);
}

export function getLead(id: string): Lead | undefined {
  const leads = getLeads();
  return leads.find(lead => lead.id === id);
}

export function createLead(lead: Lead): void {
  const leads = getLeads();
  leads.unshift(lead); // Add to beginning for most recent first
  safeJsonSet(STORAGE_KEYS.LEADS, leads);
}

export function updateLead(id: string, updates: Partial<Lead>): void {
  const leads = getLeads();
  const index = leads.findIndex(lead => lead.id === id);

  if (index !== -1) {
    leads[index] = { ...leads[index], ...updates, updatedAt: new Date().toISOString() };
    safeJsonSet(STORAGE_KEYS.LEADS, leads);
  }
}

export function deleteLead(id: string): void {
  const leads = getLeads();
  const filtered = leads.filter(lead => lead.id !== id);
  safeJsonSet(STORAGE_KEYS.LEADS, filtered);

  // Also delete associated notes
  const notes = getNotes();
  const filteredNotes = notes.filter(note => note.leadId !== id);
  safeJsonSet(STORAGE_KEYS.NOTES, filteredNotes);
}

// Note operations
export function getNotes(leadId?: string): Note[] {
  const allNotes = safeJsonParse<Note[]>(STORAGE_KEYS.NOTES, []);

  if (leadId) {
    return allNotes.filter(note => note.leadId === leadId);
  }

  return allNotes;
}

export function addNote(note: Note): void {
  const notes = getNotes();
  notes.unshift(note); // Add to beginning for most recent first
  safeJsonSet(STORAGE_KEYS.NOTES, notes);
}

// Activity operations
export function getActivities(limit?: number): Activity[] {
  const activities = safeJsonParse<Activity[]>(STORAGE_KEYS.ACTIVITIES, []);

  // Sort by timestamp descending (most recent first)
  const sorted = activities.sort((a, b) =>
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  if (limit) {
    return sorted.slice(0, limit);
  }

  return sorted;
}

export function addActivity(activity: Activity): void {
  const activities = getActivities();
  activities.unshift(activity);
  safeJsonSet(STORAGE_KEYS.ACTIVITIES, activities);
}

// Automation operations
export function getAutomations(): AutomationRule[] {
  return safeJsonParse<AutomationRule[]>(STORAGE_KEYS.AUTOMATIONS, []);
}

export function updateAutomation(id: string, updates: Partial<AutomationRule>): void {
  const automations = getAutomations();
  const index = automations.findIndex(rule => rule.id === id);

  if (index !== -1) {
    automations[index] = { ...automations[index], ...updates };
    safeJsonSet(STORAGE_KEYS.AUTOMATIONS, automations);
  }
}

// Team operations
export function getTeam(): TeamMember[] {
  return safeJsonParse<TeamMember[]>(STORAGE_KEYS.TEAM, []);
}

// Dashboard stats computation
export function getStats(): DashboardStats {
  const leads = getLeads();
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Total leads
  const totalLeads = leads.length;

  // New leads today
  const newLeadsToday = leads.filter(lead => {
    const createdDate = new Date(lead.createdAt);
    return createdDate >= todayStart && lead.status === 'new';
  }).length;

  // Qualified leads
  const qualifiedLeads = leads.filter(lead =>
    lead.status === 'qualified' || lead.status === 'proposal'
  ).length;

  // Conversion rate (won / total leads that reached proposal or won/lost)
  const completedLeads = leads.filter(lead =>
    lead.status === 'won' || lead.status === 'lost'
  );
  const wonLeads = leads.filter(lead => lead.status === 'won');
  const conversionRate = completedLeads.length > 0
    ? Math.round((wonLeads.length / completedLeads.length) * 100)
    : 0;

  // Average response time (mock calculation based on contacted leads)
  const contactedLeads = leads.filter(lead =>
    lead.status !== 'new' && lead.status !== 'lost'
  );
  const avgHours = contactedLeads.length > 0 ? 18 : 0; // Mock: 18 hours average
  const averageResponseTime = avgHours < 24 ? `${avgHours}h` : `${Math.round(avgHours / 24)}d`;

  // Total revenue pipeline (sum of all budgets in qualified, proposal, and won stages)
  const totalRevenuePipeline = leads
    .filter(lead =>
      (lead.status === 'qualified' || lead.status === 'proposal' || lead.status === 'won')
      && lead.budget !== null
    )
    .reduce((sum, lead) => sum + (lead.budget || 0), 0);

  return {
    totalLeads,
    newLeadsToday,
    qualifiedLeads,
    conversionRate,
    averageResponseTime,
    totalRevenuePipeline
  };
}
