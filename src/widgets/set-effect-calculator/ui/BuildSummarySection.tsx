import type { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";

interface BuildSummarySectionProps {
  title: string;
  sectionId: string;
  className?: string;
  children: ReactNode;
}

export function BuildSummarySection({
  title,
  sectionId,
  className,
  children,
}: BuildSummarySectionProps) {
  return (
    <AccordionItem
      value={sectionId}
      className={cn(
        "bg-secondary/50 dark:bg-secondary w-full shadow-sm",
        className,
      )}
    >
      <AccordionTrigger className="px-4 py-4 hover:no-underline">
        <span id={sectionId} className="text-[15px] font-semibold md:text-base">
          {title}
        </span>
      </AccordionTrigger>
      <AccordionContent className="w-full px-4">{children}</AccordionContent>
    </AccordionItem>
  );
}
