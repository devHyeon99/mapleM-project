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
  actionText?: string;
  cancelText?: string;
  isActionPending?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onAction?: () => void | Promise<void>;
  hideCancel?: boolean;
  form?: string;
}

export const ActionDialog = ({
  trigger,
  title,
  description,
  children,
  actionText = "확인",
  cancelText = "취소",
  isActionPending = false,
  open,
  onOpenChange,
  onAction,
  hideCancel = false,
  form,
}: ActionDialogProps) => {
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
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <fieldset disabled={isActionPending}>{children}</fieldset>

        <DialogFooter className="mt-4">
          {!hideCancel && (
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                disabled={isActionPending}
              >
                {cancelText}
              </Button>
            </DialogClose>
          )}
          <Button
            type={onAction ? "button" : "submit"}
            form={form}
            disabled={isActionPending}
            onClick={onAction}
          >
            {isActionPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {actionText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
