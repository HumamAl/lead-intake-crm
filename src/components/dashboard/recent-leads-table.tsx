"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import type { Lead } from "@/lib/types";
import { ArrowRight } from "lucide-react";

export interface RecentLeadsTableProps {
  leads: Lead[];
}

const sourceLabels: Record<string, string> = {
  website: "Website",
  referral: "Referral",
  linkedin: "LinkedIn",
  cold_outreach: "Cold Outreach",
  partner: "Partner",
  event: "Event",
  other: "Other",
};

export function RecentLeadsTable({ leads }: RecentLeadsTableProps) {
  // Get the 8 most recent leads
  const recentLeads = leads
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Leads</CardTitle>
        <Link href="/leads">
          <Button variant="ghost" size="sm">
            View All <ArrowRight size={16} />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentLeads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar
                      name={`${lead.firstName} ${lead.lastName}`}
                      size="sm"
                    />
                    <div>
                      <p className="font-medium text-gray-900">
                        {lead.firstName} {lead.lastName}
                      </p>
                      <p className="text-xs text-gray-500">{lead.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-gray-900">{lead.company}</p>
                    <p className="text-xs text-gray-500">{lead.jobTitle}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-700">
                    {sourceLabels[lead.source]}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge status={lead.status}>
                    {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge priority={lead.priority}>
                    {lead.priority.charAt(0).toUpperCase() + lead.priority.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 rounded-full"
                        style={{ width: `${lead.score}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {lead.score}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-600">
                    {formatDate(lead.createdAt)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
