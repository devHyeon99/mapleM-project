"use client";

import { ChevronDownIcon } from "lucide-react";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
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

const hasRemainingScroll = (element: HTMLDivElement | null) => {
  if (!element) return false;
  const remainingScroll =
    element.scrollHeight - element.clientHeight - element.scrollTop;
  return remainingScroll > 8;
};

export const ItemDialogFrame = ({
  trigger,
  title,
  children,
}: ItemDialogFrameProps) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null); // 내부 콘텐츠 크기 변화 감지용 Ref 추가
  const frameRef = useRef<number | null>(null);
  const [open, setOpen] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);

  // useCallback으로 감싸서 불필요한 재생성 방지
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
    if (!open) return;

    const scrollElement = scrollAreaRef.current;
    const contentElement = contentRef.current;

    // 만약 아직 DOM에 마운트되지 않았다면 관찰을 시작하지 않음
    if (!scrollElement || !contentElement) return;

    const resizeObserver = new ResizeObserver(() => {
      syncCanScrollDown();
    });

    // 스크롤 컨테이너 영역(창 크기 변화 등)과 내부 콘텐츠 영역(내용물 증가 등) 모두 관찰
    resizeObserver.observe(scrollElement);
    resizeObserver.observe(contentElement);

    // 초기 마운트 시 체크
    syncCanScrollDown();

    return () => {
      resizeObserver.disconnect();
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [open, syncCanScrollDown]); // children 제거, syncCanScrollDown은 useCallback 처리됨

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
          // 다이얼로그가 완전히 열리고 포커스될 때 다시 한번 스크롤 동기화
          syncCanScrollDown();
        }}
        className="text-primary-foreground dark:text-primary !top-1/2 !left-1/2 flex max-h-[calc(100dvh-12rem)] !w-72 !translate-x-[-50%] !translate-y-[-50%] flex-col gap-1 overflow-hidden overscroll-contain border-[#3E3E3E] bg-[#232323] p-4 [-webkit-overflow-scrolling:touch] sm:max-h-[85vh]"
      >
        <DialogHeader>
          <DialogTitle className="sr-only">{title}</DialogTitle>
          <DialogDescription className="sr-only">
            {title} 아이템 상세 정보입니다.
          </DialogDescription>
        </DialogHeader>

        <div
          ref={scrollAreaRef}
          onScroll={() => syncCanScrollDown()}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* 내부 콘텐츠의 사이즈 변화를 감지하기 위한 래퍼(Wrapper) 추가 */}
          <div ref={contentRef}>{children}</div>
        </div>

        <DialogFooter className="bg-secondary relative -mx-4 mt-4 -mb-4 flex shrink-0 rounded-b-md border-t border-[#3E3E3E]">
          {canScrollDown && (
            <ChevronDownIcon
              aria-hidden="true"
              className="absolute -top-7 left-1/2 size-5 -translate-x-1/2 animate-pulse text-orange-400"
            />
          )}
          <DialogClose asChild>
            <Button
              type="button"
              className="w-full rounded-none border-none bg-[#323232] text-white shadow-none transition-none hover:bg-[#323232]/90! dark:hover:bg-white/10!"
            >
              닫기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
