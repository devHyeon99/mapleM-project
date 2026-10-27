"use client";

import { AlertCircle } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface SearchFormErrorProps {
  id: string;
  message: string;
  className?: string;
}

export function SearchFormError({
  id,
  message,
  className,
}: SearchFormErrorProps) {
  return (
    <div
      id={id}
      className={cn(
        "animate-in slide-in-from-top-1 fade-in-0 text-caption md:text-body flex items-center justify-end gap-1.5 px-1 font-medium",
        className,
      )}
      role="alert"
    >
      <AlertCircle className="size-4" />
      <span>{message}</span>
    </div>
  );
}
