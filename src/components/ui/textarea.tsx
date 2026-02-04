"use client";

import { TextareaHTMLAttributes, forwardRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  showCharCount?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, showCharCount, maxLength, value, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const [charCount, setCharCount] = useState(value?.toString().length || 0);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      props.onChange?.(e);
    };

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          value={value}
          maxLength={maxLength}
          onChange={handleChange}
          className={cn(
            "w-full px-3 py-2 border rounded-lg text-sm transition-colors resize-none",
            "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",
            "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
            error
              ? "border-red-300 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300",
            className
          )}
          {...props}
        />
        <div className="flex items-center justify-between mt-1.5">
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
          {showCharCount && maxLength && (
            <p className={cn(
              "text-xs ml-auto",
              charCount > maxLength * 0.9 ? "text-red-600" : "text-gray-500"
            )}>
              {charCount} / {maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
