import type { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

interface EffectRowProps {
  label: string;
  valueClassName?: string;
  children: ReactNode;
}

export function EffectRow({ label, valueClassName, children }: EffectRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={cn("font-medium text-orange-500", valueClassName)}>
        {children}
      </dd>
    </div>
  );
}
