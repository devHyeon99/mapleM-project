"use client";

import { ReactNode } from "react";
import { cn } from "../lib/utils";

interface InfoRowProps {
  label: string;
  children: ReactNode;
  className?: string;
}

export const InfoRow = ({ label, children, className }: InfoRowProps) => {
  return (
    <div className={cn("flex gap-1 text-sm", className)}>
      <dt className="text-muted-foreground shrink-0 font-medium">{label}</dt>
      <dd className="shrink-0">{children}</dd>
    </div>
  );
};
