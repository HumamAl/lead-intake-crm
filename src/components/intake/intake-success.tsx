"use client";

import { CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface IntakeSuccessProps {
  name: string;
  onReset: () => void;
}

export function IntakeSuccess({ name, onReset }: IntakeSuccessProps) {
  return (
    <Card className="max-w-2xl mx-auto shadow-lg">
      <CardContent className="p-12 text-center">
        {/* Success Animation */}
        <div className="mb-6 inline-flex">
          <div className="relative">
            <CheckCircle2 size={80} className="text-green-500 animate-scale-in" />
            <div className="absolute inset-0 rounded-full bg-green-500 opacity-20 animate-ping"></div>
          </div>
        </div>

        {/* Success Message */}
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Thank you, {name}!
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          We've received your inquiry and our team will review it shortly.
        </p>
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-8 max-w-md mx-auto">
          <p className="text-sm text-indigo-800">
            <span className="font-semibold">What happens next?</span>
            <br />
            You'll hear from us within 24 hours. Check your email for updates from our team.
          </p>
        </div>

        {/* Action Button */}
        <Button onClick={onReset} size="lg" variant="outline">
          Submit Another Inquiry
        </Button>

        {/* Additional Info */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need immediate assistance?{" "}
            <a href="mailto:support@leadflow.io" className="text-indigo-600 hover:text-indigo-700 font-medium underline">
              Contact us directly
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
