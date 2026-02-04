"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { Lead, LeadSource, LeadPriority } from "@/lib/types";
import { createLead, addActivity } from "@/lib/storage";

const leadSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().min(1, "Company is required"),
  jobTitle: z.string().optional(),
  source: z.enum(["website", "referral", "linkedin", "cold_outreach", "partner", "event", "other"]),
  budget: z.string().optional(),
  priority: z.enum(["high", "medium", "low"]),
  message: z.string().optional(),
});

type LeadFormData = z.infer<typeof leadSchema>;

interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddLeadModal({ isOpen, onClose, onSuccess }: AddLeadModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      priority: "medium",
      source: "website",
    },
  });

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);

    try {
      const newLead: Lead = {
        id: `lead-${Date.now()}`,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone || "",
        company: data.company,
        jobTitle: data.jobTitle || "",
        source: data.source as LeadSource,
        status: "new",
        priority: data.priority as LeadPriority,
        tags: [],
        budget: data.budget ? parseFloat(data.budget) : null,
        message: data.message || "",
        assignedTo: null,
        score: Math.floor(Math.random() * 30) + 50, // Random score between 50-80 for new leads
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      createLead(newLead);

      // Add activity
      addActivity({
        id: `activity-${Date.now()}`,
        type: "lead_created",
        leadId: newLead.id,
        leadName: `${newLead.firstName} ${newLead.lastName}`,
        description: `New lead created: ${newLead.firstName} ${newLead.lastName} from ${newLead.company}`,
        performedBy: "Current User",
        timestamp: new Date().toISOString(),
      });

      reset();
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error creating lead:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add New Lead"
      description="Manually add a new lead to your CRM"
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            {...register("firstName")}
            error={errors.firstName?.message}
            placeholder="John"
          />
          <Input
            label="Last Name"
            {...register("lastName")}
            error={errors.lastName?.message}
            placeholder="Smith"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Email"
            type="email"
            {...register("email")}
            error={errors.email?.message}
            placeholder="john.smith@company.com"
          />
          <Input
            label="Phone"
            type="tel"
            {...register("phone")}
            error={errors.phone?.message}
            placeholder="+1-555-123-4567"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Company"
            {...register("company")}
            error={errors.company?.message}
            placeholder="Acme Corporation"
          />
          <Input
            label="Job Title"
            {...register("jobTitle")}
            error={errors.jobTitle?.message}
            placeholder="CEO"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Select
            label="Source"
            {...register("source")}
            error={errors.source?.message}
          >
            <option value="website">Website</option>
            <option value="referral">Referral</option>
            <option value="linkedin">LinkedIn</option>
            <option value="cold_outreach">Cold Outreach</option>
            <option value="partner">Partner</option>
            <option value="event">Event</option>
            <option value="other">Other</option>
          </Select>

          <Select
            label="Priority"
            {...register("priority")}
            error={errors.priority?.message}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </Select>

          <Input
            label="Budget (USD)"
            type="number"
            {...register("budget")}
            error={errors.budget?.message}
            placeholder="50000"
          />
        </div>

        <Textarea
          label="Message / Notes"
          {...register("message")}
          error={errors.message?.message}
          placeholder="Add any additional details about this lead..."
          rows={4}
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={isSubmitting}>
            Add Lead
          </Button>
        </div>
      </form>
    </Modal>
  );
}
