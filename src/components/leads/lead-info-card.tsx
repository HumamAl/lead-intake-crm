"use client";

import { Mail, Phone, Building2, DollarSign, UserCheck, Tag } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Lead, TeamMember } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

interface LeadInfoCardProps {
  lead: Lead;
  assignedMember: TeamMember | null;
}

export function LeadInfoCard({ lead, assignedMember }: LeadInfoCardProps) {
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
    <Card>
      <CardHeader>
        <CardTitle>Lead Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Contact Info */}
        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Contact
          </h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50">
                <Mail size={16} className="text-indigo-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500">Email</p>
                <a
                  href={`mailto:${lead.email}`}
                  className="text-sm text-gray-900 hover:text-indigo-600 transition-colors truncate block"
                >
                  {lead.email}
                </a>
              </div>
            </div>

            {lead.phone && (
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-50">
                  <Phone size={16} className="text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">Phone</p>
                  <a
                    href={`tel:${lead.phone}`}
                    className="text-sm text-gray-900 hover:text-green-600 transition-colors truncate block"
                  >
                    {lead.phone}
                  </a>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50">
                <Building2 size={16} className="text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500">Company</p>
                <p className="text-sm text-gray-900 truncate">{lead.company}</p>
                {lead.jobTitle && (
                  <p className="text-xs text-gray-500 truncate">{lead.jobTitle}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Lead Details */}
        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Details
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Source</span>
              <Badge variant="info">{formatSource(lead.source)}</Badge>
            </div>

            {lead.budget !== null && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Budget</span>
                <div className="flex items-center gap-1.5">
                  <DollarSign size={14} className="text-green-600" />
                  <span className="text-sm font-medium text-gray-900">
                    {formatCurrency(lead.budget)}
                  </span>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Assigned To</span>
              {assignedMember ? (
                <div className="flex items-center gap-2">
                  <Avatar name={assignedMember.name} size="sm" />
                  <span className="text-sm text-gray-900">{assignedMember.name}</span>
                </div>
              ) : (
                <span className="text-sm text-gray-400">Unassigned</span>
              )}
            </div>
          </div>
        </div>

        {/* Tags */}
        {lead.tags.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Tag size={12} />
              Tags
            </h4>
            <div className="flex flex-wrap gap-2">
              {lead.tags.map((tag) => (
                <Badge key={tag} variant="default">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Message */}
        {lead.message && (
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Initial Message
            </h4>
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{lead.message}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
