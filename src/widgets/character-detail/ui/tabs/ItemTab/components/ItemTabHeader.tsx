"use client";

import { LayoutGrid, List, Layers, IdCard } from "lucide-react";
import { SegmentedButton } from "./SegmentedButton";
import { EquipmentSetInfo } from "@/entities/character";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/tooltip";
import { SpecCardDialog } from "../dialogs/SpecCardDialog";
import { SetEffectDialog } from "../dialogs/SetEffectDialog";

interface ItemTabHeaderProps {
  presets: number[];
  selectedPreset: number;
  activePresetNo?: number;
  viewMode: "grid" | "list";
  onSelectPreset: (preset: number) => void;
  onChangeViewMode: (mode: "grid" | "list") => void;
  characterName: string;
  setEffect: EquipmentSetInfo[] | null;
}

export const ItemTabHeader = ({
  presets,
  selectedPreset,
  activePresetNo,
  viewMode,
  onSelectPreset,
  onChangeViewMode,
  characterName,
  setEffect,
}: ItemTabHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      {/* 좌측: 프리셋 선택 */}
      <div
        role="group"
        aria-label="장비 프리셋 선택"
        className="bg-muted flex items-center gap-0.5 rounded-xs border px-0.5 py-1 md:gap-1 md:px-[5px]"
      >
        {presets.map((num) => {
          const isActiveInGame = activePresetNo === num;
          const isSelected = selectedPreset === num;

          return (
            <SegmentedButton
              key={num}
              isSelected={isSelected}
              onClick={() => onSelectPreset(num)}
              className={
                isActiveInGame && !isSelected ? "text-primary font-bold" : ""
              }
              title={`${num}번 프리셋${isActiveInGame ? " (현재 적용 중)" : ""}`}
            >
              {num}
              {isActiveInGame && (
                <span className="bg-primary absolute top-1 right-1 h-1 w-1 rounded-full" />
              )}
            </SegmentedButton>
          );
        })}
      </div>

      {/* 우측: 뷰 모드 + 액션 버튼 (통합 툴바) */}
      <div className="bg-muted flex items-center gap-0.5 rounded-xs border px-1.5 py-1 md:px-3.5">
        <TooltipProvider delayDuration={300}>
          {/* 스펙 카드 */}
          <SpecCardDialog
            characterName={characterName}
            trigger={
              <span className="inline-flex">
                {/* DialogTrigger asChild 호환용 */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SegmentedButton isSelected={false}>
                      <IdCard className="size-5.5" />
                    </SegmentedButton>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>스펙 카드 저장</p>
                  </TooltipContent>
                </Tooltip>
              </span>
            }
          />

          {/* 세트 효과 */}
          <SetEffectDialog
            setEffect={setEffect}
            activePresetNo={activePresetNo ?? 1}
            trigger={
              <span className="inline-flex">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SegmentedButton isSelected={false}>
                      <Layers className="size-4" />
                    </SegmentedButton>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>세트 효과 보기</p>
                  </TooltipContent>
                </Tooltip>
              </span>
            }
          />

          {/* 구분선  */}
          <div className="bg-border mx-1 h-3 w-[1px]" aria-hidden="true" />

          {/* 그리드 */}
          <Tooltip>
            <TooltipTrigger asChild>
              {/* TooltipTrigger는 반드시 자식에게 ref를 전달해야 하므로 div로 감싸거나 forwardRef 필요 */}
              {/* SegmentedButton이 forwardRef를 지원하지 않는다면 span으로 감싸는 게 안전함 */}
              <span>
                <SegmentedButton
                  isSelected={viewMode === "grid"}
                  onClick={() => onChangeViewMode("grid")}
                >
                  <LayoutGrid className="size-4" />
                </SegmentedButton>
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>그리드 보기</p>
            </TooltipContent>
          </Tooltip>

          {/* 리스트 */}
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <SegmentedButton
                  isSelected={viewMode === "list"}
                  onClick={() => onChangeViewMode("list")}
                >
                  <List className="size-4" />
                </SegmentedButton>
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>리스트 보기</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
