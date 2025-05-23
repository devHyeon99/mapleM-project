"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ActionDialogProps {
  trigger: React.ReactNode;
  title: string;
  description?: React.ReactNode;
  children: React.ReactNode;
  onAction: () => void;
  actionText?: string;
  isActionPending?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const ActionDialog = ({
  trigger,
  title,
  description,
  children,
  onAction,
  actionText = "확인",
  isActionPending = false,
  open,
  onOpenChange,
}: ActionDialogProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAction();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        onPointerDownOutside={(e) => {
          if (isActionPending) e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          if (isActionPending) e.preventDefault();
        }}
      >
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>

          <fieldset disabled={isActionPending}>{children}</fieldset>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                disabled={isActionPending}
              >
                취소
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isActionPending}>
              {isActionPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {actionText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
