import { ElementType, ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

interface InfoRowProps {
  label: string;
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

export const InfoRow = ({
  label,
  children,
  className,
  as: Component = "div",
}: InfoRowProps) => {
  const LabelTag = Component === "div" ? "dt" : "span";
  const ValueTag = Component === "div" ? "dd" : "span";

  return (
    <Component className={cn("flex items-center gap-1 text-sm", className)}>
      <LabelTag className="text-muted-foreground shrink-0 font-medium">
        {label}
      </LabelTag>
      <ValueTag className="shrink-0 font-medium">{children}</ValueTag>
    </Component>
  );
};
