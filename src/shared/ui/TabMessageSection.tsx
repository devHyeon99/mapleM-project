import { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

interface TabMessageSectionProps {
  className?: string;
  message?: string;
  children?: ReactNode;
}

export const TabMessageSection = ({
  className,
  message,
  children,
}: TabMessageSectionProps) => {
  return (
    <section
      className={cn(
        "bg-muted/50 flex min-h-91.5 flex-col items-center justify-center gap-2 rounded-md border p-6 text-center",
        className,
      )}
    >
      {message ? (
        <p className="text-muted-foreground text-sm whitespace-pre-line">
          {message}
        </p>
      ) : (
        children
      )}
    </section>
  );
};
