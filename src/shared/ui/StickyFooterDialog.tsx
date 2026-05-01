"use client";

import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "lucide-react";
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
  /** 화면에는 노출되지 않는 스크린리더용 제목 */
  title: ReactNode;
  /** 화면에는 노출되지 않는 스크린리더용 설명 */
  description?: ReactNode;
  children: ReactNode;
  contentClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  closeButtonClassName?: string;
  /** 본문에 스크롤이 남아 있을 때 푸터 위에 아래 화살표를 표시 */
  showScrollAffordance?: boolean;
}

const hasRemainingScroll = (element: HTMLDivElement | null) => {
  if (!element) return false;
  const remainingScroll =
    element.scrollHeight - element.clientHeight - element.scrollTop;
  return remainingScroll > 8;
};

export const StickyFooterDialog = ({
  trigger,
  title,
  description,
  children,
  contentClassName,
  bodyClassName,
  footerClassName,
  closeButtonClassName,
  showScrollAffordance = false,
}: StickyFooterDialogProps) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const bodyContentRef = useRef<HTMLDivElement>(null); // 내부 콘텐츠 크기 변화 감지용
  const frameRef = useRef<number | null>(null);
  const [open, setOpen] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);

  const syncCanScrollDown = useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
    }
    frameRef.current = requestAnimationFrame(() => {
      setCanScrollDown(hasRemainingScroll(scrollAreaRef.current));
      frameRef.current = null;
    });
  }, []);

  useEffect(() => {
    if (!showScrollAffordance || !open) return;

    const scrollElement = scrollAreaRef.current;
    const contentElement = bodyContentRef.current;
    if (!scrollElement || !contentElement) return;

    // 스크롤 영역(창 크기 변화)과 내부 콘텐츠(내용물 증가) 모두 관찰
    const resizeObserver = new ResizeObserver(() => syncCanScrollDown());
    resizeObserver.observe(scrollElement);
    resizeObserver.observe(contentElement);
    syncCanScrollDown();

    return () => {
      resizeObserver.disconnect();
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [open, showScrollAffordance, syncCanScrollDown]);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setCanScrollDown(false);
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        onOpenAutoFocus={() => {
          if (showScrollAffordance) syncCanScrollDown();
        }}
        className={cn(
          "flex max-h-[calc(100dvh-8rem)] w-full flex-col gap-0 overflow-hidden p-0 sm:max-w-md",
          contentClassName,
        )}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div
          ref={scrollAreaRef}
          onScroll={showScrollAffordance ? syncCanScrollDown : undefined}
          className={cn(
            "min-h-0 flex-1 overflow-y-auto px-4 py-4",
            bodyClassName,
          )}
        >
          {showScrollAffordance ? (
            <div ref={bodyContentRef}>{children}</div>
          ) : (
            children
          )}
        </div>

        <DialogFooter
          className={cn(
            "bg-secondary relative m-0 flex-row items-stretch justify-center p-0 sm:justify-center",
            footerClassName,
          )}
        >
          {canScrollDown && (
            <ChevronDownIcon
              aria-hidden="true"
              className="absolute -top-7 left-1/2 size-5 -translate-x-1/2 animate-pulse text-orange-400"
            />
          )}
          <DialogClose asChild>
            <Button
              variant="ghost"
              className={cn(
                "h-10 w-full touch-manipulation rounded-none hover:bg-black/10 active:bg-black/20 dark:hover:bg-white/10 dark:active:bg-white/20",
                closeButtonClassName,
              )}
            >
              닫기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
