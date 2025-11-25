"use client";

import { ReactNode } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

interface StickyFooterDialogProps {
  trigger: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  closeLabel?: string;
  hideHeaderText?: boolean;
  contentClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  fullWidthCloseButton?: boolean;
  closeButtonClassName?: string;
}

export const StickyFooterDialog = ({
  trigger,
  title,
  description,
  children,
  closeLabel = "닫기",
  hideHeaderText = false,
  contentClassName,
  bodyClassName,
  footerClassName,
  fullWidthCloseButton = true,
  closeButtonClassName,
}: StickyFooterDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className={cn(
          "flex max-h-[calc(100dvh-8rem)] w-full flex-col gap-0 overflow-hidden p-0 sm:max-w-md",
          contentClassName,
        )}
      >
        <DialogHeader
          className={cn("gap-1 px-4 pt-4 text-left", hideHeaderText && "sr-only")}
        >
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <DialogDescription>{description}</DialogDescription>
          )}
        </DialogHeader>

        <div
          className={cn(
            "min-h-0 flex-1 overflow-y-auto px-4 py-4",
            bodyClassName,
          )}
        >
          {children}
        </div>

        <DialogFooter
          className={cn(
            "bg-secondary m-0 flex-row items-stretch justify-center border-t p-0 sm:justify-center",
            footerClassName,
          )}
        >
          <DialogClose asChild>
            <Button
              variant="ghost"
              className={cn(
                fullWidthCloseButton &&
                  "h-10 w-full touch-manipulation rounded-none hover:bg-black/10 active:bg-black/20 dark:hover:bg-white/10 dark:active:bg-white/20",
                closeButtonClassName,
              )}
            >
              {closeLabel}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
