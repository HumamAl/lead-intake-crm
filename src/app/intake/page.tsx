"use client";

import { useEffect } from "react";
import { Zap } from "lucide-react";
import { IntakeForm } from "@/components/intake/intake-form";
import { initializeStorage } from "@/lib/storage";

export default function IntakePage() {
  useEffect(() => {
    initializeStorage();
  }, []);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header / Branding */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <div className="p-3 bg-indigo-600 rounded-xl shadow-lg">
              <Zap className="text-white" size={32} />
            </div>
            <span className="text-3xl font-bold text-gray-900">LeadFlow CRM</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Start Your Project
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tell us about your needs and we'll get back to you within 24 hours.
          </p>
        </div>

        {/* Form */}
        <IntakeForm />

        {/* Footer */}
        <footer className="mt-12 text-center">
          <div className="border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} LeadFlow CRM. All rights reserved.
            </p>
            <div className="flex items-center justify-center gap-6 mt-3">
              <a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">
                Contact Support
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
