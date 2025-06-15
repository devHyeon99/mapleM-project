"use client";

import { ReactNode } from "react";

interface InfoRowProps {
  label: string;
  children: ReactNode;
}

export const InfoRow = ({ label, children }: InfoRowProps) => {
  return (
    <div className="flex gap-2">
      <dt className="text-muted-foreground font-medium">{label}</dt>
      <dd className="self-center">{children}</dd>
    </div>
  );
};
