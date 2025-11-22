"use client";

import { ReactNode } from "react";
import { CircleAlert, CircleHelp } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

interface HelpPopoverItem {
  title: ReactNode;
  description: ReactNode;
}

interface HelpPopoverProps {
  ariaLabel: string;
  items: readonly HelpPopoverItem[];
  iconType?: "help" | "exclamation";
  triggerClassName?: string;
  iconClassName?: string;
  contentClassName?: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}

export const HelpPopover = ({
  ariaLabel,
  items,
  iconType = "help",
  triggerClassName,
  iconClassName,
  contentClassName,
  side = "bottom",
  align = "end",
}: HelpPopoverProps) => {
  const Icon = iconType === "exclamation" ? CircleAlert : CircleHelp;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={ariaLabel}
          className={cn(
            "text-muted-foreground hover:text-foreground transition-colors",
            triggerClassName,
          )}
        >
          <Icon className={cn("size-5", iconClassName)} />
        </button>
      </PopoverTrigger>

      <PopoverContent
        side={side}
        align={align}
        className={cn("w-80 rounded-xs p-3", contentClassName)}
      >
        <div className="flex flex-col gap-2 text-xs leading-relaxed">
          {items.map((item, index) => (
            <p key={index}>
              <span className="text-foreground font-semibold">
                {item.title}
              </span>
              <br />
              {item.description}
            </p>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
