"use client";

import { AlertCircle } from "lucide-react";
import { clsx } from "clsx";

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
      className={clsx(
        "animate-in slide-in-from-top-1 fade-in-0 flex items-center justify-end gap-1.5 px-1 text-xs font-bold md:text-sm",
        className,
      )}
      role="alert"
    >
      <AlertCircle className="size-4" />
      <span>{message}</span>
    </div>
  );
}
