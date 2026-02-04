"use client";

import { useState } from "react";
import { Mail, Plus, Edit, Trash2, ChevronDown } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Lead, LeadStatus } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface LeadDetailHeaderProps {
  lead: Lead;
  onStatusChange: (status: LeadStatus) => void;
  onDelete: () => void;
}

export function LeadDetailHeader({ lead, onStatusChange, onDelete }: LeadDetailHeaderProps) {
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  const statusOptions: { value: LeadStatus; label: string }[] = [
    { value: "new", label: "New" },
    { value: "contacted", label: "Contacted" },
    { value: "qualified", label: "Qualified" },
    { value: "proposal", label: "Proposal" },
    { value: "won", label: "Won" },
    { value: "lost", label: "Lost" },
  ];

  const formatSource = (source: string) => {
    const sourceMap: Record<string, string> = {
      website: "Website",
      referral: "Referral",
      linkedin: "LinkedIn",
      cold_outreach: "Cold Outreach",
      partner: "Partner",
      event: "Event",
      other: "Other"
    };
    return sourceMap[source] || source;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <Avatar name={`${lead.firstName} ${lead.lastName}`} size="lg" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {lead.firstName} {lead.lastName}
            </h1>
            <p className="text-gray-600 mt-1">{lead.email}</p>
            <div className="mt-2 text-sm text-gray-500">
              <span>{lead.jobTitle}</span>
              {lead.jobTitle && lead.company && <span className="mx-2">•</span>}
              <span className="font-medium text-gray-700">{lead.company}</span>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <div className="relative">
                <button
                  onClick={() => setShowStatusMenu(!showStatusMenu)}
                  className="flex items-center gap-1 hover:opacity-80 transition-opacity"
                >
                  <Badge status={lead.status}>{lead.status}</Badge>
                  <ChevronDown size={14} className="text-gray-500" />
                </button>

                {showStatusMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowStatusMenu(false)}
                    />
                    <div className="absolute left-0 top-full mt-2 z-20 bg-white border border-gray-200 rounded-lg shadow-lg py-1 w-40">
                      {statusOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            onStatusChange(option.value);
                            setShowStatusMenu(false);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                        >
                          <Badge status={option.value}>{option.label}</Badge>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <Badge priority={lead.priority}>{lead.priority}</Badge>
              <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-200 rounded-full">
                <span className="text-xs font-medium text-indigo-700">Score:</span>
                <span className="text-sm font-bold text-indigo-900">{lead.score}</span>
              </div>
            </div>
            {lead.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {lead.tags.map((tag) => (
                  <Badge key={tag} variant="default">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Mail size={16} />
            Send Email
          </Button>
          <Button variant="outline" size="sm">
            <Plus size={16} />
            Add Note
          </Button>
          <Button variant="outline" size="sm">
            <Edit size={16} />
            Edit
          </Button>
          <Button variant="danger" size="sm" onClick={onDelete}>
            <Trash2 size={16} />
            Delete
          </Button>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-3 gap-6 text-sm">
        <div>
          <span className="text-gray-500">Source:</span>
          <span className="ml-2 font-medium text-gray-900">{formatSource(lead.source)}</span>
        </div>
        <div>
          <span className="text-gray-500">Created:</span>
          <span className="ml-2 font-medium text-gray-900">{formatDate(lead.createdAt)}</span>
        </div>
        <div>
          <span className="text-gray-500">Last Updated:</span>
          <span className="ml-2 font-medium text-gray-900">{formatDate(lead.updatedAt)}</span>
        </div>
      </div>
    </div>
  );
}
