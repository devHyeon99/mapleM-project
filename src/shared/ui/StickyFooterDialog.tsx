"use client";

import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { ChevronDownIcon, Download, Loader2 } from "lucide-react";
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
import {
  captureToPng,
  inlineRemoteImages,
  saveImageDataUrl,
} from "@/shared/lib/capture-image";

interface StickyFooterDialogProps {
  trigger: ReactNode;
  /** 화면에는 노출되지 않는 스크린리더용 제목 */
  title: ReactNode;
  /** 화면에는 노출되지 않는 스크린리더용 설명 */
  description?: ReactNode;
  /** 스크롤 영역 위에 고정되는 머리 영역. 본문만 스크롤됨 */
  header?: ReactNode;
  children: ReactNode;
  contentClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  closeButtonClassName?: string;
  /** 본문에 스크롤이 남아 있을 때 푸터 위에 아래 화살표를 표시 */
  showScrollAffordance?: boolean;
  /** 지정 시 푸터에 본문을 PNG로 저장하는 버튼 추가. 확장자 제외 파일명 */
  saveImageFileName?: string;
  saveButtonClassName?: string;
}

/** 캡처 이미지 가장자리 여백(px). 스크롤 영역 패딩과 동일 */
const CAPTURE_PADDING = 16;

/**
 * 저장 이미지 최소 가로/세로 비율. 포토 카드와 같은 5:7.
 * 세로로 긴 이미지는 폰 화면 비율과 비슷해 사진 앱이 꽉 채워 자르므로 양옆 여백으로 맞춤
 */
const CAPTURE_MIN_ASPECT = 5 / 7;

/** 저장 배율. 3배는 파일이 과하게 커서 2배로 낮춤 */
const CAPTURE_PIXEL_RATIO = 2;

/** 캡처 시 본문 최대 폭(px). 데스크톱 다이얼로그(max-w-md) 본문 폭과 동일 */
const CAPTURE_MAX_CONTENT_WIDTH = 416;

/**
 * 비율을 빈 여백 대신 본문 폭으로 맞춤. 폭을 넓히면 별 줄 등이 펴져 높이가 줄어드므로
 * 몇 번 반복해 5:7 에 수렴시킴. 최대 폭에 걸려도 모자라면 그때만 양옆 여백으로 채움.
 * 화면 밖 복제본(clone)의 폭을 바꿔 재므로 화면 변화 없음. 끝나면 clone 은 그 폭으로 남음
 */
const measureCaptureSize = (clone: HTMLElement, minWidth: number) => {
  const heightAt = (contentWidth: number) => {
    clone.style.width = `${contentWidth}px`;
    return clone.offsetHeight + CAPTURE_PADDING * 2;
  };

  let contentWidth = minWidth;
  for (let pass = 0; pass < 4; pass += 1) {
    const target =
      Math.floor(heightAt(contentWidth) * CAPTURE_MIN_ASPECT) -
      CAPTURE_PADDING * 2;
    contentWidth = Math.min(
      CAPTURE_MAX_CONTENT_WIDTH,
      Math.max(minWidth, target),
    );
  }

  const height = heightAt(contentWidth);
  const width = Math.max(
    contentWidth + CAPTURE_PADDING * 2,
    Math.ceil(height * CAPTURE_MIN_ASPECT),
  );
  return { contentWidth, width, height };
};

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
  header,
  children,
  contentClassName,
  bodyClassName,
  footerClassName,
  closeButtonClassName,
  showScrollAffordance = false,
  saveImageFileName,
  saveButtonClassName,
}: StickyFooterDialogProps) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const bodyContentRef = useRef<HTMLDivElement>(null); // 내부 콘텐츠 크기 변화 감지용
  const frameRef = useRef<number | null>(null);
  const [open, setOpen] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  /** 내려받기가 막힌 기기에서 길게 눌러 저장하도록 보여주는 완성 이미지 */
  const [savedImage, setSavedImage] = useState<string | null>(null);
  const canSave = !!saveImageFileName;

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
      setSaveError(null);
      setSavedImage(null);
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    }
  };

  const handleSaveImage = async () => {
    const node = bodyContentRef.current;
    if (!node || !saveImageFileName) return;

    setSaveError(null);
    setIsSaving(true);

    // 넥슨 이미지 서버 CORS 우회용. 캡처 직전 외부 이미지를 data URL로 교체 후 복원
    const restoreImages = await inlineRemoteImages(node);

    // html-to-image 는 자식의 계산된 폭까지 복사하므로 넓힌 레이아웃은 실제 DOM 이 필요함.
    // 같은 부모 안 화면 밖에 복제본을 두어 스타일 맥락 유지
    const clone = node.cloneNode(true) as HTMLElement;
    clone.setAttribute("aria-hidden", "true");
    Object.assign(clone.style, {
      position: "absolute",
      left: "-10000px",
      top: "0",
    });
    node.parentElement?.appendChild(clone);

    try {
      // 배경·여백은 바깥 요소에 있어 캡처 대상에 직접 지정. 스크롤로 가려진 부분까지 전체 캡처됨
      const dialog = node.closest<HTMLElement>("[role=dialog]");
      const backgroundColor = dialog
        ? getComputedStyle(dialog).backgroundColor
        : undefined;
      const { contentWidth, width, height } = measureCaptureSize(
        clone,
        node.offsetWidth,
      );
      const paddingX = (width - contentWidth) / 2;
      const dataUrl = await captureToPng(clone, {
        pixelRatio: CAPTURE_PIXEL_RATIO,
        backgroundColor,
        width,
        height,
        style: {
          padding: `${CAPTURE_PADDING}px ${paddingX}px`,
          // width·height 에 여백 포함. 본문 폭은 contentWidth 로 넓어짐
          boxSizing: "border-box",
          // 화면 밖 배치가 캡처 결과로 복사되지 않게 해제
          position: "static",
        },
      });

      const result = await saveImageDataUrl(
        dataUrl,
        `${saveImageFileName}.png`,
      );
      if (result === "long-press") setSavedImage(dataUrl);
    } catch (cause) {
      console.error("이미지 저장 실패:", cause);
      setSaveError("이미지를 만들지 못했어요. 잠시 후 다시 시도해 주세요.");
    } finally {
      clone.remove();
      restoreImages();
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(event) => {
          if (!showScrollAffordance) return;
          syncCanScrollDown();
          // 첫 포커스를 스크롤 영역 대신 다이얼로그 자체로 둠. 마우스로 열어도 포커스 링이 뜨던 문제 방지
          event.preventDefault();
          (event.currentTarget as HTMLElement | null)?.focus();
        }}
        className={cn(
          // --dialog-fade: 하단 스크롤 안내 그라데이션 색. 배경색을 바꾸는 스킨은 같은 색으로 덮어씀
          "flex max-h-[calc(100dvh-8rem)] w-full flex-col gap-0 overflow-hidden p-0 [--dialog-fade:var(--color-popover)] sm:max-w-md",
          contentClassName,
        )}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {header && <div className="shrink-0 px-4 pt-4">{header}</div>}

        {/* 화살표 표시 시 스크롤바는 숨기고, 키보드 사용자를 위해 영역에 포커스를 줄 수 있게 함 */}
        <div
          ref={scrollAreaRef}
          onScroll={showScrollAffordance ? syncCanScrollDown : undefined}
          tabIndex={showScrollAffordance ? 0 : undefined}
          className={cn(
            "min-h-0 flex-1 overflow-y-auto px-4 py-4",
            header && "pt-3",
            // 버튼 영역 위 패딩과 겹쳐 버튼 위만 넓어지는 것 방지
            canSave && "pb-0",
            showScrollAffordance &&
              "focus-visible:ring-ring [scrollbar-width:none] focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset [&::-webkit-scrollbar]:hidden",
            bodyClassName,
          )}
        >
          {savedImage ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={savedImage} alt="저장할 이미지" className="w-full" />
              <p className="text-caption mt-2 text-center opacity-70">
                이미지를 길게 눌러 <b>이미지 저장</b>을 하세요.
              </p>
            </>
          ) : showScrollAffordance || canSave ? (
            <div ref={bodyContentRef}>{children}</div>
          ) : (
            children
          )}
        </div>

        <DialogFooter
          className={cn(
            "bg-secondary relative m-0 flex-row items-stretch justify-center p-0 sm:justify-center",
            footerClassName,
            // 버튼 두 개일 땐 일반 확인/취소 다이얼로그처럼 여백을 두고 나란히 배치
            canSave && "flex-wrap gap-2 p-3",
          )}
        >
          {canScrollDown && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -top-12 flex h-12 items-end justify-center bg-linear-to-t from-(--dialog-fade) to-transparent pb-1"
            >
              <ChevronDownIcon className="size-5 text-orange-500 motion-safe:animate-bounce" />
            </div>
          )}
          {saveError && (
            <p
              className="text-caption w-full text-center text-red-400"
              role="alert"
            >
              {saveError}
            </p>
          )}
          {canSave && (
            <Button
              onClick={handleSaveImage}
              disabled={isSaving || !!savedImage}
              className={cn(
                "h-9 flex-1 touch-manipulation",
                saveButtonClassName,
              )}
            >
              {isSaving ? <Loader2 className="animate-spin" /> : <Download />}
              이미지 저장
            </Button>
          )}
          <DialogClose asChild>
            <Button
              variant="ghost"
              className={cn(
                "h-10 w-full touch-manipulation rounded-none hover:bg-black/10 active:bg-black/20 dark:hover:bg-white/10 dark:active:bg-white/20",
                closeButtonClassName,
                canSave && "rounded-control h-9 w-auto flex-1",
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
