"use client";

import { ReactNode, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/shared/ui/dialog";
import { Download, Loader2 } from "lucide-react";
import { CharacterDetailData } from "@/entities/character";
import { SpecCardHeader } from "./SpecCardHeader";
import { SpecCardContent } from "./SpecCardContent";

interface SpecCardDialogProps {
  data: CharacterDetailData;
  trigger?: ReactNode;
}

export const SpecCardDialog = ({ data, trigger }: SpecCardDialogProps) => {
  const ocid = data.ocid;
  const [isDownloading, setIsDownloading] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  // 이미지 저장 핸들러 (html-to-image 사용)
  const handleDownloadImage = async () => {
    if (!cardRef.current) return;

    try {
      setIsDownloading(true);

      // html-to-image를 사용하여 DOM을 PNG 데이터 URL로 변환
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true, // 이미지 캐시 문제 방지
        pixelRatio: 1, // 해상도
      });

      // 파일명 생성
      const date = new Date().toISOString().split("T")[0];
      const fileName = `${data.character_name || "캐릭터"}_스펙카드_${date}.png`;

      // 다운로드 트리거
      const link = document.createElement("a");
      link.download = fileName;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("이미지 저장 중 오류 발생:", error);
      alert("이미지 저장에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button
            className="absolute right-20 bottom-0 w-fit rounded-sm"
            variant="secondary"
          >
            스펙 카드
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="flex max-h-[80vh] flex-col items-center overflow-y-auto px-4 sm:max-h-[90vh] sm:!max-w-[600px] sm:px-6">
        <DialogHeader className="w-full">
          <DialogTitle>캐릭터 스펙 카드</DialogTitle>
          <DialogDescription>
            캐릭터의 장비와 스펙을 한눈에 확인 해보세요!
          </DialogDescription>
        </DialogHeader>

        {ocid ? (
          /* 캡처 대상 영역 */
          <div
            ref={cardRef}
            className="bg-card relative flex w-full max-w-[375px] flex-col gap-2 rounded-xl border p-4 shadow-sm sm:max-w-none"
          >
            <SpecCardHeader data={data} />
            <SpecCardContent ocid={ocid} initialData={data} />
          </div>
        ) : (
          <div className="text-muted-foreground p-10 text-center">
            캐릭터 식별 정보(OCID)가 없습니다.
          </div>
        )}

        <DialogFooter className="w-full max-w-[375px] gap-2 sm:max-w-none sm:justify-end">
          {/* <Button variant="secondary">
            <Share2 className="mr-2 h-4 w-4" /> 공유하기
          </Button> */}

          <Button
            onClick={handleDownloadImage}
            className="w-full gap-2 sm:w-auto"
            disabled={isDownloading || !ocid}
          >
            {isDownloading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                저장 중...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" /> 이미지 저장
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
