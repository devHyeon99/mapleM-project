"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

export function LabeledSwitch({
  checked,
  onCheckedChange,
  className,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}) {
  return (
    <SwitchPrimitive.Root
      checked={checked}
      onCheckedChange={onCheckedChange}
      className={cn(
        "relative inline-flex h-8 w-22 items-center rounded-full border px-1 select-none",
        "focus-visible:ring-ring transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        // ✅ 상태별 배경색: A=주황 / B=파랑
        "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80 disabled:cursor-not-allowed disabled:opacity-50",
        "justify-start data-[state=checked]:justify-end",
        className,
      )}
    >
      {/* ✅ 상태별 텍스트 위치 */}
      <span
        className={cn(
          "text-primary pointer-events-none absolute top-1/2 -translate-y-1/2 text-sm font-semibold transition-all",
          checked ? "text-primary-foreground left-4" : "right-4",
        )}
      >
        {checked ? "타입 B" : "타입 A"}
      </span>

      {/* Thumb */}
      <SwitchPrimitive.Thumb
        className={cn(
          "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground z-[1] block size-5 rounded-full shadow transition-transform",
        )}
      />
    </SwitchPrimitive.Root>
  );
}
