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

interface ItemDialogFrameProps {
  trigger: ReactNode;
  title: string;
  children: ReactNode;
}

export const ItemDialogFrame = ({
  trigger,
  title,
  children,
}: ItemDialogFrameProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="text-primary-foreground dark:text-primary !top-1/2 !left-1/2 max-h-[calc(100dvh-12rem)] !w-72 !translate-x-[-50%] !translate-y-[-50%] gap-1 overflow-y-auto overscroll-contain border-[#3E3E3E] bg-[#232323] p-4 [-webkit-overflow-scrolling:touch] sm:max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="sr-only">{title}</DialogTitle>
          <DialogDescription className="sr-only">
            {title} 아이템 상세 정보입니다.
          </DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter className="bg-secondary -mx-4 mt-4 -mb-4 flex rounded-b-md border-t border-[#3E3E3E]">
          <DialogClose asChild>
            <Button
              type="button"
              className="w-full rounded-none border-none bg-[#323232] text-white shadow-none hover:bg-[#323232]/90 dark:hover:bg-white/10!"
            >
              닫기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
