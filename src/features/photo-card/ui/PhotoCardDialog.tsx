"use client";

import { useId, useRef, useState } from "react";
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
import { captureToPng, saveImageDataUrl } from "@/shared/lib/capture-image";
import {
  DEFAULT_PHOTO_CARD_BACKGROUND,
  PHOTO_CARD_BACKGROUNDS,
} from "../model/backgrounds";
import { PhotoCard, formatCardDate } from "./PhotoCard";

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
      const dataUrl = await captureToPng(cardRef.current, { pixelRatio: 3 });
      const fileName = `${data.character_name}_포토카드_${formatCardDate(new Date()).replaceAll(".", "-")}.png`;

      if ((await saveImageDataUrl(dataUrl, fileName)) === "long-press") {
        setSavedImage(dataUrl);
      }
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
        <Button variant="outline" size="sm" className="">
          <IdCard className="size-4" />
          포토카드
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
