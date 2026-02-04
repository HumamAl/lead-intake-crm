"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Note } from "@/lib/types";
import { getRelativeTime } from "@/lib/utils";
import { addNote, addActivity } from "@/lib/storage";

interface LeadNotesProps {
  notes: Note[];
  leadId: string;
  leadName: string;
  onNoteAdded: () => void;
}

export function LeadNotes({ notes, leadId, leadName, onNoteAdded }: LeadNotesProps) {
  const [noteContent, setNoteContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim() || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const newNote: Note = {
        id: `note-${Date.now()}`,
        leadId,
        authorId: "user-current",
        authorName: "Current User",
        content: noteContent.trim(),
        createdAt: new Date().toISOString(),
      };

      addNote(newNote);

      // Add activity
      addActivity({
        id: `activity-${Date.now()}`,
        type: "note_added",
        leadId,
        leadName,
        description: `Added a note to ${leadName}`,
        performedBy: "Current User",
        timestamp: new Date().toISOString(),
      });

      setNoteContent("");
      onNoteAdded();
    } catch (error) {
      console.error("Error adding note:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const sortedNotes = [...notes].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Notes</h3>

      {/* Add Note Form */}
      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-4">
        <Textarea
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder="Add a note about this lead..."
          rows={3}
          showCharCount
          maxLength={1000}
        />
        <div className="flex justify-end mt-3">
          <Button
            type="submit"
            variant="primary"
            size="sm"
            loading={isSubmitting}
            disabled={!noteContent.trim()}
          >
            <Send size={14} />
            Add Note
          </Button>
        </div>
      </form>

      {/* Notes List */}
      <div className="space-y-4">
        {sortedNotes.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-500">No notes yet</p>
            <p className="text-sm text-gray-400 mt-1">
              Be the first to add a note about this lead
            </p>
          </div>
        ) : (
          sortedNotes.map((note) => (
            <div
              key={note.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <Avatar name={note.authorName} size="sm" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-gray-900">{note.authorName}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">
                      {getRelativeTime(note.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{note.content}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
