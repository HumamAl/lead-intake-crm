"use client";

import { ImgHTMLAttributes } from "react";
import { cn, getInitials } from "@/lib/utils";

export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'size'> {
  name: string;
  size?: "sm" | "md" | "lg";
}

export function Avatar({ name, src, size = "md", className, ...props }: AvatarProps) {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  const initials = getInitials(name);

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-medium bg-indigo-600 text-white overflow-hidden",
        sizes[size],
        className
      )}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover"
          {...props}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
