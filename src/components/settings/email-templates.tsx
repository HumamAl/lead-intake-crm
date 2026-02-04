"use client";

import { useState } from "react";
import { Mail, Edit } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  trigger: string;
  body: string;
}

const defaultTemplates: EmailTemplate[] = [
  {
    id: "welcome",
    name: "Welcome Email",
    subject: "Thank you for your interest in LeadFlow CRM",
    trigger: "Sent to new leads on submission",
    body: `Hi {{firstName}},

Thank you for reaching out to us! We've received your inquiry and are excited to learn more about your needs.

Our team is reviewing your information and will get back to you within 24 hours with next steps. In the meantime, feel free to explore our resources at leadflow.io/resources.

We look forward to connecting with you soon!

Best regards,
The LeadFlow Team`
  },
  {
    id: "follow-up",
    name: "Follow-up Reminder",
    subject: "Following up on your inquiry",
    trigger: "Sent to leads after 3 days of no contact",
    body: `Hi {{firstName}},

I wanted to follow up on the inquiry you submitted about {{company}}. I know things can get busy, so I wanted to make sure this didn't slip through the cracks.

Are you still interested in exploring how LeadFlow CRM can help streamline your sales process? I'd love to schedule a quick 15-minute call to discuss your specific needs.

You can book time directly on my calendar: [calendar link]

Looking forward to hearing from you!

Best,
{{assignedRep}}`
  },
  {
    id: "feedback",
    name: "Lost Lead Feedback",
    subject: "We'd love your feedback",
    trigger: "Sent when lead is marked as lost",
    body: `Hi {{firstName}},

We noticed that you decided to go in a different direction, and we completely understand. Building the right partnership is important.

If you have a moment, we'd really appreciate your feedback on why we weren't the right fit this time. Your insights help us improve and better serve future clients.

[Feedback Survey Link]

If your needs change in the future, we'd love to reconnect. Wishing you all the best with your project!

Warm regards,
The LeadFlow Team`
  }
];

export function EmailTemplates() {
  const [templates, setTemplates] = useState<EmailTemplate[]>(defaultTemplates);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (template: EmailTemplate) => {
    setEditingTemplate({ ...template });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingTemplate) {
      setTemplates(templates.map(t =>
        t.id === editingTemplate.id ? editingTemplate : t
      ));
      setIsModalOpen(false);
      setEditingTemplate(null);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingTemplate(null);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Mail className="text-indigo-600" size={20} />
            <CardTitle>Email Templates</CardTitle>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Customize automated email templates sent to leads
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {templates.map((template) => (
              <div
                key={template.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{template.trigger}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(template)}
                  >
                    <Edit size={14} />
                    Edit
                  </Button>
                </div>
                <div className="bg-gray-50 rounded p-3 border border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">Subject:</div>
                  <div className="text-sm text-gray-900 font-medium">{template.subject}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Template Modal */}
      {editingTemplate && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCancel}
          title="Edit Email Template"
          description={`Customize the ${editingTemplate.name.toLowerCase()}`}
          size="lg"
        >
          <div className="space-y-4">
            <Input
              label="Template Name"
              value={editingTemplate.name}
              onChange={(e) => setEditingTemplate({ ...editingTemplate, name: e.target.value })}
            />
            <Input
              label="Email Subject"
              value={editingTemplate.subject}
              onChange={(e) => setEditingTemplate({ ...editingTemplate, subject: e.target.value })}
              placeholder="Subject line for the email"
            />
            <div>
              <div className="text-sm text-gray-700 mb-2">
                <span className="font-medium">Available variables:</span>
                <span className="text-gray-500 ml-2">
                  {"{{firstName}}, {{lastName}}, {{company}}, {{assignedRep}}"}
                </span>
              </div>
              <Textarea
                label="Email Body"
                value={editingTemplate.body}
                onChange={(e) => setEditingTemplate({ ...editingTemplate, body: e.target.value })}
                rows={12}
                placeholder="Email body content..."
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <Button variant="ghost" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Template
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
