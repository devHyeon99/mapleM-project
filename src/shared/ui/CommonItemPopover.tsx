import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { X } from "lucide-react";
import { ReactNode } from "react";

interface CommonItemPopoverProps {
  trigger: ReactNode; // 아이콘 (Trigger)
  children: ReactNode; // 팝오버 내부 내용
}

export const CommonItemPopover = ({
  trigger,
  children,
}: CommonItemPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        side="right"
        align="center"
        className="popover-center bg-popover/98 relative w-72 rounded-lg border-2 p-4 font-medium shadow-lg"
      >
        <PopoverPrimitive.Close className="absolute top-2 right-2 opacity-70 hover:opacity-100">
          <X className="size-5" />
        </PopoverPrimitive.Close>
        {children}
      </PopoverContent>
    </Popover>
  );
};
