"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadDetailHeader } from "@/components/leads/lead-detail-header";
import { LeadTimeline } from "@/components/leads/lead-timeline";
import { LeadNotes } from "@/components/leads/lead-notes";
import { LeadInfoCard } from "@/components/leads/lead-info-card";
import type { Lead, Note, Activity, TeamMember, LeadStatus } from "@/lib/types";
import {
  initializeStorage,
  getLead,
  getNotes,
  getActivities,
  getTeam,
  updateLead,
  deleteLead as deleteLeadFromStorage,
  addActivity,
} from "@/lib/storage";

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const leadId = params.id as string;

  const [lead, setLead] = useState<Lead | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeStorage();
    loadData();
  }, [leadId]);

  const loadData = () => {
    setIsLoading(true);

    const leadData = getLead(leadId);
    if (!leadData) {
      setIsLoading(false);
      return;
    }

    const notesData = getNotes(leadId);
    const activitiesData = getActivities();
    const teamData = getTeam();

    setLead(leadData);
    setNotes(notesData);
    setActivities(activitiesData);
    setTeamMembers(teamData);
    setIsLoading(false);
  };

  const handleStatusChange = (status: LeadStatus) => {
    if (!lead) return;

    const oldStatus = lead.status;
    updateLead(leadId, { status });

    // Add activity
    addActivity({
      id: `activity-${Date.now()}`,
      type: "status_changed",
      leadId,
      leadName: `${lead.firstName} ${lead.lastName}`,
      description: `Status changed from ${oldStatus} to ${status}`,
      performedBy: "Current User",
      timestamp: new Date().toISOString(),
    });

    loadData();
  };

  const handleDelete = () => {
    if (!lead) return;

    if (confirm(`Are you sure you want to delete ${lead.firstName} ${lead.lastName}? This action cannot be undone.`)) {
      deleteLeadFromStorage(leadId);
      router.push("/leads");
    }
  };

  const getAssignedMember = () => {
    if (!lead?.assignedTo) return null;
    return teamMembers.find(m => m.id === lead.assignedTo) || null;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-10 bg-gray-200 rounded animate-pulse" />
        <div className="h-48 bg-gray-200 rounded animate-pulse" />
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 h-96 bg-gray-200 rounded animate-pulse" />
          <div className="h-96 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => router.push("/leads")}>
          <ArrowLeft size={18} />
          Back to Leads
        </Button>
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Lead Not Found</h2>
          <p className="text-gray-600 mb-6">
            The lead you're looking for doesn't exist or has been deleted.
          </p>
          <Button variant="primary" onClick={() => router.push("/leads")}>
            View All Leads
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => router.push("/leads")}>
        <ArrowLeft size={18} />
        Back to Leads
      </Button>

      {/* Header */}
      <LeadDetailHeader
        lead={lead}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Timeline and Notes */}
        <div className="lg:col-span-2 space-y-6">
          {/* Timeline */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <LeadTimeline activities={activities} leadId={leadId} />
          </div>

          {/* Notes */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <LeadNotes
              notes={notes}
              leadId={leadId}
              leadName={`${lead.firstName} ${lead.lastName}`}
              onNoteAdded={loadData}
            />
          </div>
        </div>

        {/* Right Column - Info Card */}
        <div className="lg:col-span-1">
          <LeadInfoCard lead={lead} assignedMember={getAssignedMember()} />
        </div>
      </div>
    </div>
  );
}
