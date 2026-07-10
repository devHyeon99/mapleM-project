"use client";

import Image from "next/image";
import { useHoverDevice } from "@/shared/lib/hooks/useHoverDevice";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";

interface SkillIconTooltipProps {
  src: string;
  alt: string;
  tooltip: string;
}

export const SkillIconTooltip = ({
  src,
  alt,
  tooltip,
}: SkillIconTooltipProps) => {
  const isHoverDevice = useHoverDevice();

  const iconTrigger = (
    <button type="button" className="inline-flex h-8 w-8">
      <Image
        src={src}
        alt={alt}
        width={32}
        height={32}
        unoptimized
        className="h-8 w-8 object-contain"
        style={{ imageRendering: "pixelated" }}
      />
    </button>
  );

  if (!isHoverDevice) {
    return (
      <Popover>
        <PopoverTrigger asChild>{iconTrigger}</PopoverTrigger>
        <PopoverContent
          side="bottom"
          align="center"
          sideOffset={6}
          className="bg-foreground text-background w-fit rounded-md border-0 px-3 py-1.5 text-xs shadow-none"
        >
          {tooltip}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{iconTrigger}</TooltipTrigger>
      <TooltipContent side="bottom" className="text-xs">
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
};
