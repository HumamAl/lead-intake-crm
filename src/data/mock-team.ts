import type { TeamMember } from '@/lib/types';

export const mockTeam: TeamMember[] = [
  {
    id: "user-001",
    name: "Sarah Chen",
    email: "sarah@leadflow.io",
    role: "admin",
    avatar: null,
    leadsAssigned: 8
  },
  {
    id: "user-002",
    name: "Marcus Johnson",
    email: "marcus@leadflow.io",
    role: "manager",
    avatar: null,
    leadsAssigned: 7
  },
  {
    id: "user-003",
    name: "Elena Rodriguez",
    email: "elena@leadflow.io",
    role: "member",
    avatar: null,
    leadsAssigned: 5
  },
  {
    id: "user-004",
    name: "James O'Brien",
    email: "james@leadflow.io",
    role: "member",
    avatar: null,
    leadsAssigned: 3
  },
  {
    id: "user-005",
    name: "Priya Patel",
    email: "priya@leadflow.io",
    role: "member",
    avatar: null,
    leadsAssigned: 2
  }
];
