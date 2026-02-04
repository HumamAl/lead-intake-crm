"use client";

import { useState } from "react";
import { UserPlus, MoreVertical, Edit, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import type { TeamMember } from "@/lib/types";

interface TeamManagementProps {
  team: TeamMember[];
}

const roleColors: Record<TeamMember["role"], "purple" | "info" | "default"> = {
  admin: "purple",
  manager: "info",
  member: "default",
};

export function TeamManagement({ team }: TeamManagementProps) {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const handleInvite = () => {
    setShowInviteModal(true);
  };

  const handleEdit = (memberId: string) => {
    const member = team.find(m => m.id === memberId);
    if (member) {
      setSelectedMember(member);
      setShowEditModal(true);
    }
  };

  const handleRemove = (memberId: string) => {
    const member = team.find(m => m.id === memberId);
    if (member) {
      setSelectedMember(member);
      setShowRemoveModal(true);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Team Members</CardTitle>
          <p className="text-sm text-gray-500 mt-1">
            Manage your team and assign roles
          </p>
        </div>
        <Button onClick={handleInvite}>
          <UserPlus size={16} />
          Invite Member
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Leads Assigned</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {team.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar name={member.name} src={member.avatar || undefined} size="sm" />
                    <span className="font-medium text-gray-900">{member.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-600">{member.email}</TableCell>
                <TableCell>
                  <Badge variant={roleColors[member.role]}>
                    {member.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-gray-900 font-medium">{member.leadsAssigned}</span>
                  <span className="text-gray-500 text-sm ml-1">leads</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(member.id)}
                      className="h-8 px-2"
                    >
                      <Edit size={14} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemove(member.id)}
                      className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {team.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 mt-4">
            <UserPlus size={48} className="mx-auto text-gray-400 mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No team members yet</h3>
            <p className="text-sm text-gray-500 mb-4">
              Invite your first team member to get started
            </p>
            <Button onClick={handleInvite}>
              <UserPlus size={16} />
              Invite Team Member
            </Button>
          </div>
        )}
      </CardContent>

      {/* Invite Modal */}
      <Modal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        title="Invite Team Member"
        description="Add a new member to your team"
        size="sm"
      >
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              Team member invitations are available in the full version. This demo displays the current team roster.
            </p>
          </div>
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Current Team Summary:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Total Members: {team.length}</li>
                <li>Admins: {team.filter(m => m.role === "admin").length}</li>
                <li>Managers: {team.filter(m => m.role === "manager").length}</li>
                <li>Members: {team.filter(m => m.role === "member").length}</li>
              </ul>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button variant="outline" onClick={() => setShowInviteModal(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Member Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedMember(null);
        }}
        title="Edit Team Member"
        description="Modify member role and permissions"
        size="sm"
      >
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              Editing team members is available in the full version. This demo shows the current member details.
            </p>
          </div>
          {selectedMember && (
            <div className="space-y-3">
              <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                <Avatar name={selectedMember.name} src={selectedMember.avatar || undefined} size="md" />
                <div>
                  <p className="font-medium text-gray-900">{selectedMember.name}</p>
                  <p className="text-sm text-gray-600">{selectedMember.email}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Current Role</label>
                <p className="mt-1">
                  <Badge variant={roleColors[selectedMember.role]}>
                    {selectedMember.role}
                  </Badge>
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Leads Assigned</label>
                <p className="mt-1 text-gray-900">{selectedMember.leadsAssigned} leads</p>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button variant="outline" onClick={() => {
              setShowEditModal(false);
              setSelectedMember(null);
            }}>
              Close
            </Button>
          </div>
        </div>
      </Modal>

      {/* Remove Member Modal */}
      <Modal
        isOpen={showRemoveModal}
        onClose={() => {
          setShowRemoveModal(false);
          setSelectedMember(null);
        }}
        title="Remove Team Member"
        description="Remove a member from your team"
        size="sm"
      >
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              Removing team members is available in the full version. This demo preserves the current team structure.
            </p>
          </div>
          {selectedMember && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Avatar name={selectedMember.name} src={selectedMember.avatar || undefined} size="sm" />
                <div>
                  <p className="font-medium text-gray-900">{selectedMember.name}</p>
                  <p className="text-sm text-gray-600">{selectedMember.email}</p>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button variant="outline" onClick={() => {
              setShowRemoveModal(false);
              setSelectedMember(null);
            }}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </Card>
  );
}
