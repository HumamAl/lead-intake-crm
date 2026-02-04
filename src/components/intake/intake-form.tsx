"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createLead, addActivity } from "@/lib/storage";
import type { Lead, IntakeFormData } from "@/lib/types";
import { IntakeSuccess } from "./intake-success";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().min(1, "Company name is required"),
  jobTitle: z.string().optional(),
  budget: z.string().min(1, "Please select a budget range"),
  source: z.enum(["website", "referral", "linkedin", "cold_outreach", "partner", "event", "other"]),
  message: z.string().min(20, "Please provide at least 20 characters")
});

type FormData = z.infer<typeof formSchema>;

export function IntakeForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      source: "website"
    }
  });

  const onSubmit = async (data: FormData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Convert budget string to number
    const budgetMap: Record<string, number> = {
      "under_5k": 3500,
      "5k_10k": 7500,
      "10k_25k": 17500,
      "25k_50k": 37500,
      "50k_plus": 75000
    };

    // Create lead
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone || "",
      company: data.company,
      jobTitle: data.jobTitle || "",
      source: data.source,
      status: "new",
      priority: "medium",
      tags: [],
      budget: budgetMap[data.budget] || null,
      message: data.message,
      assignedTo: null,
      score: 50,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    createLead(newLead);

    // Add activity
    addActivity({
      id: `activity-${Date.now()}`,
      type: "lead_created",
      leadId: newLead.id,
      leadName: `${newLead.firstName} ${newLead.lastName}`,
      description: `New lead submitted via intake form from ${newLead.company}`,
      performedBy: "System",
      timestamp: new Date().toISOString()
    });

    setSubmittedName(data.firstName);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmittedName("");
    reset();
  };

  if (isSubmitted) {
    return <IntakeSuccess name={submittedName} onReset={handleReset} />;
  }

  return (
    <Card className="max-w-2xl mx-auto shadow-lg">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

          {/* Contact Information */}
          <Input
            label="Email Address"
            type="email"
            {...register("email")}
            error={errors.email?.message}
            placeholder="john@company.com"
          />

          <Input
            label="Phone Number (Optional)"
            type="tel"
            {...register("phone")}
            error={errors.phone?.message}
            placeholder="+1 (555) 123-4567"
          />

          {/* Company Information */}
          <Input
            label="Company Name"
            {...register("company")}
            error={errors.company?.message}
            placeholder="Acme Corporation"
          />

          <Input
            label="Job Title (Optional)"
            {...register("jobTitle")}
            error={errors.jobTitle?.message}
            placeholder="Marketing Director"
          />

          {/* Budget Range */}
          <Select
            label="Budget Range"
            {...register("budget")}
            error={errors.budget?.message}
          >
            <option value="">Select a budget range</option>
            <option value="under_5k">Under $5,000</option>
            <option value="5k_10k">$5,000 - $10,000</option>
            <option value="10k_25k">$10,000 - $25,000</option>
            <option value="25k_50k">$25,000 - $50,000</option>
            <option value="50k_plus">$50,000+</option>
          </Select>

          {/* Source */}
          <Select
            label="How did you hear about us?"
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

          {/* Message */}
          <Textarea
            label="Tell us about your project"
            {...register("message")}
            error={errors.message?.message}
            rows={6}
            placeholder="Please describe your needs, goals, and any specific requirements you have. The more detail you provide, the better we can help you."
            showCharCount
            maxLength={1000}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            loading={isSubmitting}
            className="w-full"
            size="lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Submitting...
              </>
            ) : (
              "Submit Inquiry"
            )}
          </Button>

          {/* Privacy Notice */}
          <p className="text-xs text-gray-500 text-center">
            By submitting this form, you agree to our privacy policy. We'll only use your information to respond to your inquiry.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
