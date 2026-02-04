"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadFilters } from "@/components/leads/lead-filters";
import { LeadsTable } from "@/components/leads/leads-table";
import { AddLeadModal } from "@/components/leads/add-lead-modal";
import type { Lead, TeamMember, LeadStatus, LeadPriority, LeadSource } from "@/lib/types";
import { initializeStorage, getLeads, getTeam, updateLead, deleteLead as deleteLeadFromStorage, addActivity } from "@/lib/storage";

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    priority: 'all',
    source: 'all',
    sort: 'newest'
  });

  useEffect(() => {
    initializeStorage();
    loadData();
  }, []);

  const loadData = () => {
    setIsLoading(true);
    const leadsData = getLeads();
    const teamData = getTeam();
    setLeads(leadsData);
    setTeamMembers(teamData);
    setIsLoading(false);
  };

  const handleStatusChange = (leadId: string, status: LeadStatus) => {
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return;

    updateLead(leadId, { status });

    // Add activity
    addActivity({
      id: `activity-${Date.now()}`,
      type: "status_changed",
      leadId,
      leadName: `${lead.firstName} ${lead.lastName}`,
      description: `Status changed to ${status}`,
      performedBy: "Current User",
      timestamp: new Date().toISOString(),
    });

    loadData();
  };

  const handleDelete = (leadId: string) => {
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return;

    if (confirm(`Are you sure you want to delete ${lead.firstName} ${lead.lastName}?`)) {
      deleteLeadFromStorage(leadId);
      loadData();
    }
  };

  const getFilteredAndSortedLeads = () => {
    let filtered = [...leads];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(lead =>
        lead.firstName.toLowerCase().includes(searchLower) ||
        lead.lastName.toLowerCase().includes(searchLower) ||
        lead.email.toLowerCase().includes(searchLower) ||
        lead.company.toLowerCase().includes(searchLower)
      );
    }

    // Status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(lead => lead.status === filters.status);
    }

    // Priority filter
    if (filters.priority !== 'all') {
      filtered = filtered.filter(lead => lead.priority === filters.priority);
    }

    // Source filter
    if (filters.source !== 'all') {
      filtered = filtered.filter(lead => lead.source === filters.source);
    }

    // Sort
    switch (filters.sort) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'score-high':
        filtered.sort((a, b) => b.score - a.score);
        break;
      case 'score-low':
        filtered.sort((a, b) => a.score - b.score);
        break;
      case 'name-asc':
        filtered.sort((a, b) => {
          const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
          const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
          return nameA.localeCompare(nameB);
        });
        break;
    }

    return filtered;
  };

  const filteredLeads = getFilteredAndSortedLeads();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-10 bg-gray-200 rounded animate-pulse" />
        <div className="h-96 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
          <p className="text-gray-600 mt-1">Manage and track all your leads</p>
        </div>
        <Button
          variant="primary"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus size={18} />
          Add Lead
        </Button>
      </div>

      {/* Filters */}
      <LeadFilters filters={filters} onFilterChange={setFilters} />

      {/* Table */}
      <LeadsTable
        leads={filteredLeads}
        teamMembers={teamMembers}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />

      {/* Add Lead Modal */}
      <AddLeadModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={loadData}
      />
    </div>
  );
}
