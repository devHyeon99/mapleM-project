"use client";

import { useId, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { IdCard, ImageDown, LoaderCircle } from "lucide-react";
import type { CharacterDetailData } from "@/entities/character";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { SegmentedToggle } from "@/shared/ui/SegmentedToggle";
import {
  DEFAULT_PHOTO_CARD_BACKGROUND,
  PHOTO_CARD_BACKGROUNDS,
} from "../model/backgrounds";
import { PhotoCard, formatCardDate } from "./PhotoCard";

/**
 * iOS 는 `<a download>` 을 무시해서 눌러도 아무 일이 없다. 아이폰 크롬도 속은
 * WebKit 이라 똑같다. 대신 공유 시트를 띄우면 "이미지 저장" 으로 앨범에 넣을 수 있다.
 *
 * OS 를 UA 로 찍지 않고, 공유 시트가 자연스러운 환경(손가락으로 쓰는 기기)인지로
 * 고른다. 데스크톱은 기존처럼 바로 내려받는다.
 */
const prefersShareSheet = (file: File): boolean => {
  if (typeof navigator === "undefined") return false;
  if (!navigator.canShare?.({ files: [file] })) return false;

  return window.matchMedia("(pointer: coarse)").matches;
};

/**
 * iOS 판별. `<a download>` 무시는 기능 탐지로 알아낼 방법이 없어서 UA 를 본다.
 * (아이패드는 UA 가 맥으로 나와서 터치 지원까지 같이 확인한다.)
 *
 * 공유 시트는 HTTPS 에서만 쓸 수 있다. 사내망 IP(http://172.x.x.x) 로 열어보면
 * navigator.share 가 아예 없어서, iOS 에서는 저장할 방법이 하나도 남지 않는다.
 * 그때는 완성 이미지를 띄워 길게 눌러 저장하게 한다.
 */
const isIOS = (): boolean => {
  if (typeof navigator === "undefined") return false;

  return (
    /iP(hone|od|ad)/.test(navigator.userAgent) ||
    (navigator.maxTouchPoints > 1 && /Macintosh/.test(navigator.userAgent))
  );
};

const MESSAGE_MAX_LENGTH = 24;

interface PhotoCardDialogProps {
  data: CharacterDetailData;
}

export const PhotoCardDialog = ({ data }: PhotoCardDialogProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const messageId = useId();
  const [backgroundId, setBackgroundId] = useState(
    DEFAULT_PHOTO_CARD_BACKGROUND.id,
  );
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  /** 내려받기가 막힌 기기에서 길게 눌러 저장하도록 보여주는 완성 이미지 */
  const [savedImage, setSavedImage] = useState<string | null>(null);

  const background =
    PHOTO_CARD_BACKGROUNDS.find((item) => item.id === backgroundId) ??
    DEFAULT_PHOTO_CARD_BACKGROUND;

  const handleSave = async () => {
    setError(null);
    setIsSaving(true);

    try {
      if (!cardRef.current) return;

      // 캐릭터 이미지는 useInlinedImage 가 이미 data URL 로 바꿔 두므로
      // html-to-image 가 외부로 fetch 할 리소스는 남지 않는다.
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 3 });
      const fileName = `${data.character_name}_포토카드_${formatCardDate(new Date()).replaceAll(".", "-")}.png`;

      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], fileName, { type: "image/png" });

      if (prefersShareSheet(file)) {
        try {
          await navigator.share({ files: [file] });
          return;
        } catch (cause) {
          // 사용자가 공유 시트를 닫은 건 실패가 아니다
          if (cause instanceof DOMException && cause.name === "AbortError") {
            return;
          }

          console.warn("공유 시트를 열지 못했습니다.", cause);
        }
      }

      // iOS 는 <a download> 를 눌러도 아무 일이 일어나지 않는다.
      if (isIOS()) {
        setSavedImage(dataUrl);
        return;
      }

      const link = document.createElement("a");
      link.download = fileName;
      link.href = dataUrl;
      link.click();
    } catch (cause) {
      console.error("포토 카드 저장 실패:", cause);
      setError("이미지를 만들지 못했어요. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="mt-1 w-44 max-w-full">
          <IdCard className="size-4" />
          포토카드 만들기
        </Button>
      </DialogTrigger>

      <DialogContent className="flex max-h-[calc(100dvh-4rem)] flex-col gap-4 overflow-hidden sm:!max-w-[420px]">
        <DialogHeader>
          <DialogTitle>포토 카드</DialogTitle>
          <DialogDescription>
            배경을 고르고 포토 카드 이미지를 저장하세요.
          </DialogDescription>
        </DialogHeader>

        <div className="-mx-2 flex min-h-0 flex-1 items-start justify-center overflow-y-auto px-2 py-1">
          {savedImage ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={savedImage}
              alt={`${data.character_name} 포토 카드`}
              className="w-80 rounded-2xl"
            />
          ) : (
            <PhotoCard
              ref={cardRef}
              data={data}
              background={background}
              message={message}
            />
          )}
        </div>

        <SegmentedToggle
          label="배경 선택"
          options={PHOTO_CARD_BACKGROUNDS.map((item) => ({
            value: item.id,
            content: item.label,
          }))}
          value={backgroundId}
          onChange={(next) => {
            setSavedImage(null);
            setBackgroundId(next);
          }}
        />

        <div className="flex flex-col gap-1.5">
          <Label htmlFor={messageId} className="text-muted-foreground text-xs">
            말풍선
          </Label>
          <Input
            id={messageId}
            value={message}
            onChange={(event) => {
              setSavedImage(null);
              setMessage(event.target.value);
            }}
            maxLength={MESSAGE_MAX_LENGTH}
            placeholder="텍스트를 입력하면 캐릭터 위에 표시돼요."
          />
        </div>

        {error && (
          <p className="text-destructive text-xs" role="alert">
            {error}
          </p>
        )}

        <DialogFooter>
          {savedImage ? (
            <p className="text-muted-foreground w-full text-center text-xs">
              포토 카드 이미지를 길게 눌러{" "}
              <b className="text-foreground">이미지 저장</b>을 하세요.
            </p>
          ) : (
            <Button onClick={handleSave} disabled={isSaving} className="w-full">
              {isSaving ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" />
                  저장 중...
                </>
              ) : (
                <>
                  <ImageDown className="size-4" />
                  이미지 저장
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
