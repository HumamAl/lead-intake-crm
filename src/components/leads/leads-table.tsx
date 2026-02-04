"use client";

import { useState } from "react";
import Link from "next/link";
import { MoreVertical, Trash2, UserCog } from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { Lead, TeamMember, LeadStatus } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface LeadsTableProps {
  leads: Lead[];
  teamMembers: TeamMember[];
  onStatusChange: (leadId: string, status: LeadStatus) => void;
  onDelete: (leadId: string) => void;
}

export function LeadsTable({ leads, teamMembers, onStatusChange, onDelete }: LeadsTableProps) {
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const toggleSelectAll = () => {
    if (selectedLeads.size === leads.length) {
      setSelectedLeads(new Set());
    } else {
      setSelectedLeads(new Set(leads.map(l => l.id)));
    }
  };

  const toggleSelectLead = (id: string) => {
    const newSelected = new Set(selectedLeads);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedLeads(newSelected);
  };

  const getAssignedMember = (assignedToId: string | null) => {
    if (!assignedToId) return null;
    return teamMembers.find(m => m.id === assignedToId);
  };

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

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  if (leads.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
        <p className="text-gray-500 text-lg mb-2">No leads found</p>
        <p className="text-gray-400 text-sm">Try adjusting your filters or add a new lead</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {selectedLeads.size > 0 && (
        <div className="bg-indigo-50 border-b border-indigo-200 px-6 py-3 flex items-center justify-between">
          <span className="text-sm font-medium text-indigo-900">
            {selectedLeads.size} lead{selectedLeads.size !== 1 ? 's' : ''} selected
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Change Status
            </Button>
            <Button variant="outline" size="sm">
              Assign
            </Button>
            <Button variant="danger" size="sm">
              <Trash2 size={14} />
              Delete
            </Button>
          </div>
        </div>
      )}

      <div className="px-6 py-3 border-b border-gray-200 flex items-center justify-between">
        <span className="text-sm text-gray-600">
          Showing {leads.length} lead{leads.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="overflow-x-auto">
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <input
                type="checkbox"
                checked={selectedLeads.size === leads.length && leads.length > 0}
                onChange={toggleSelectAll}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
            </TableHead>
            <TableHead>Lead</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => {
            const assignedMember = getAssignedMember(lead.assignedTo);

            return (
              <TableRow key={lead.id} className="cursor-pointer">
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedLeads.has(lead.id)}
                    onChange={() => toggleSelectLead(lead.id)}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </TableCell>
                <TableCell>
                  <Link href={`/leads/${lead.id}`} className="block hover:text-indigo-600 transition-colors">
                    <div className="flex items-center gap-3">
                      <Avatar name={`${lead.firstName} ${lead.lastName}`} size="sm" />
                      <div>
                        <div className="font-medium text-gray-900">
                          {lead.firstName} {lead.lastName}
                        </div>
                        <div className="text-xs text-gray-500">{lead.email}</div>
                      </div>
                    </div>
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/leads/${lead.id}`} className="block hover:text-indigo-600 transition-colors">
                    <div className="font-medium">{lead.company}</div>
                    <div className="text-xs text-gray-500">{lead.jobTitle}</div>
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/leads/${lead.id}`} className="block">
                    <span className="text-sm text-gray-600">{formatSource(lead.source)}</span>
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/leads/${lead.id}`} className="block">
                    <Badge status={lead.status}>{lead.status}</Badge>
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/leads/${lead.id}`} className="block">
                    <Badge priority={lead.priority}>{lead.priority}</Badge>
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/leads/${lead.id}`} className="block">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getScoreColor(lead.score)}`}
                          style={{ width: `${lead.score}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{lead.score}</span>
                    </div>
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/leads/${lead.id}`} className="block">
                    {assignedMember ? (
                      <div className="flex items-center gap-2">
                        <Avatar name={assignedMember.name} size="sm" />
                        <span className="text-sm text-gray-700">{assignedMember.name}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">Unassigned</span>
                    )}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/leads/${lead.id}`} className="block">
                    <span className="text-sm text-gray-600">{formatDate(lead.createdAt)}</span>
                  </Link>
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <div className="relative">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === lead.id ? null : lead.id)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <MoreVertical size={16} className="text-gray-500" />
                    </button>

                    {openMenuId === lead.id && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setOpenMenuId(null)}
                        />
                        <div className="absolute right-0 top-8 z-20 bg-white border border-gray-200 rounded-lg shadow-lg py-1 w-48">
                          <button
                            onClick={() => {
                              setOpenMenuId(null);
                              // Handle assign action
                            }}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                          >
                            <UserCog size={14} />
                            Assign to me
                          </button>
                          <button
                            onClick={() => {
                              setOpenMenuId(null);
                              if (confirm(`Delete lead "${lead.firstName} ${lead.lastName}"?`)) {
                                onDelete(lead.id);
                              }
                            }}
                            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      </div>
    </div>
  );
}
