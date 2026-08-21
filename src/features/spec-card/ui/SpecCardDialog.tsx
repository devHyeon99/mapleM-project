"use client";

import { useEffect, useState } from "react";
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
import { Download, Loader2, Swords } from "lucide-react";
import type { CharacterDetailData } from "@/entities/character";
import { useCharacterStat } from "@/entities/character";
import { SegmentedToggle } from "@/shared/ui/SegmentedToggle";
import { SpecCardContent } from "./SpecCardContent";

/** 저장 이미지가 기기와 무관하게 같도록 고정한 캡처 영역 폭 */
const CARD_WIDTH = 784;

interface SpecCardDialogProps {
  data: CharacterDetailData;
}

export const SpecCardDialog = ({ data }: SpecCardDialogProps) => {
  const ocid = data.ocid;
  const [open, setOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // 다이얼로그를 열었을 때만 불러옴
  const { data: statData, isLoading: isHyperStatLoading } = useCharacterStat(
    open ? ocid : null,
    data.character_level,
  );
  const hyperStat = statData?.hyperStat ?? null;

  // 다이얼로그가 열릴 때 붙으므로 ref 대신 콜백 ref 로 받음
  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null);
  const [cardEl, setCardEl] = useState<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  const [cardHeight, setCardHeight] = useState(0);

  // 장비 프리셋. 고르기 전에는 인게임에서 적용 중인 프리셋을 보여줌
  // API 가 프리셋 순서를 보장하지 않음
  const presetNos =
    data.equipment_preset
      ?.map((preset) => preset.preset_no)
      .sort((a, b) => a - b) ?? [];
  const [selectedPresetNo, setSelectedPresetNo] = useState<number | null>(null);
  const presetNo =
    selectedPresetNo ?? data.use_preset_no ?? presetNos[0] ?? null;

  // 안드로이드 프리셋
  const androidPresetNos =
    data.android_preset
      ?.map((preset) => preset.preset_no)
      .sort((a, b) => a - b) ?? [];
  const [selectedAndroidPresetNo, setSelectedAndroidPresetNo] = useState<
    number | null
  >(null);
  const androidPresetNo =
    selectedAndroidPresetNo ??
    data.android_use_preset_no ??
    androidPresetNos[0] ??
    null;

  // 하이퍼 스탯 프리셋
  // 실제로 찍은 게 있는 프리셋만 (preset_count 에는 빈 프리셋도 포함됨)
  const hyperPresetNos =
    hyperStat?.hyper_stat
      .filter((preset) =>
        preset.hyper_stat_info?.some((info) => info.stat_level > 0),
      )
      .map((preset) => preset.preset_no)
      .sort((a, b) => a - b) ?? [];
  const [selectedHyperPresetNo, setSelectedHyperPresetNo] = useState<
    number | null
  >(null);
  const hyperPresetNo =
    selectedHyperPresetNo ??
    hyperStat?.use_preset_no ??
    hyperPresetNos[0] ??
    null;

  // 좁은 화면에서는 카드를 축소해서 보여줌. 캡처 대상은 그대로 CARD_WIDTH 라
  // 저장되는 이미지 레이아웃은 변하지 않음
  useEffect(() => {
    if (!containerEl || !cardEl) return;

    const measure = () => {
      const available = containerEl.clientWidth;
      // 레이아웃 전(0)에 재면 scale 이 0 이 돼서 카드가 사라짐
      if (available <= 0) return;

      setScale(Math.min(1, available / CARD_WIDTH));
      setCardHeight(cardEl.offsetHeight);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(containerEl);
    observer.observe(cardEl);

    return () => observer.disconnect();
  }, [containerEl, cardEl]);

  // 이미지 저장 핸들러 (html-to-image 사용)
  const handleDownloadImage = async () => {
    if (!cardEl) return;

    try {
      setIsDownloading(true);

      // html-to-image를 사용하여 DOM을 PNG 데이터 URL로 변환s
      const dataUrl = await toPng(cardEl, {
        cacheBust: true, // 이미지 캐시 문제 방지
        pixelRatio: 3, // 해상도
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Swords className="size-4" />
          스펙카드
        </Button>
      </DialogTrigger>

      <DialogContent className="flex max-h-[80vh] flex-col items-center gap-2 px-4 sm:max-h-[100vh] sm:!max-w-[800px] sm:px-6">
        <DialogHeader className="mb-4 w-full">
          <DialogTitle>캐릭터 스펙 카드</DialogTitle>
          <DialogDescription>
            캐릭터의 장비와 스펙을 한눈에 확인 해보세요!
          </DialogDescription>
        </DialogHeader>

        {ocid && (
          <div className="flex w-full gap-6">
            <SegmentedToggle
              label="장비 프리셋"
              value={presetNo}
              onChange={setSelectedPresetNo}
              options={presetNos.map((no) => ({
                value: no,
                marked: no === data.use_preset_no,
              }))}
            />
            <SegmentedToggle
              label="안드로이드 프리셋"
              value={androidPresetNo}
              onChange={setSelectedAndroidPresetNo}
              options={androidPresetNos.map((no) => ({
                value: no,
                marked: no === data.android_use_preset_no,
              }))}
            />
            <SegmentedToggle
              label="하이퍼 스탯 프리셋"
              value={hyperPresetNo}
              onChange={setSelectedHyperPresetNo}
              options={hyperPresetNos.map((no) => ({
                value: no,
                marked: no === hyperStat?.use_preset_no,
              }))}
            />
          </div>
        )}

        {ocid ? (
          /* 저장 이미지가 항상 같은 레이아웃이 되도록 캡처 영역은 고정 폭.
             좁은 화면에서는 가로로 밀어서 봄 */
          /* 폭 측정 기준 */
          <div ref={setContainerEl} className="w-full">
            {/* 축소된 만큼만 자리를 차지하도록 높이를 다시 잡아줌 */}
            <div
              className="overflow-hidden"
              style={cardHeight ? { height: cardHeight * scale } : undefined}
            >
              {/* 변환은 캡처 대상 바깥에만 걸어야 이미지에 섞이지 않음 */}
              <div
                className="origin-top-left"
                style={{ transform: `scale(${scale})` }}
              >
                <div
                  ref={setCardEl}
                  className="bg-card relative flex w-[784px] flex-col gap-2 rounded-xl border p-4 shadow-sm"
                >
                  <SpecCardContent
                    ocid={ocid}
                    initialData={data}
                    presetNo={presetNo}
                    androidPresetNo={androidPresetNo}
                    hyperStat={hyperStat}
                    hyperPresetNo={hyperPresetNo}
                    isHyperStatLoading={isHyperStatLoading}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-muted-foreground p-10 text-center">
            캐릭터 식별 정보(OCID)가 없습니다.
          </div>
        )}

        <DialogFooter className="w-full">
          <Button
            onClick={handleDownloadImage}
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
