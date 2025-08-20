"use client";

import { LayoutGrid, List } from "lucide-react";
import { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/tooltip";
import { SegmentedButton } from "./SegmentedButton";

interface CommonTabHeaderProps {
  /** 현재 활성화된(인게임 적용 중인) 프리셋 번호 */
  activePresetNo?: number | null;
  /** 현재 사용자가 보고 있는(선택한) 프리셋 번호 */
  selectedPreset?: number | null;
  /** 표시할 프리셋 목록 (기본값: [1, 2, 3]) */
  presets?: number[];
  /** 현재 뷰 모드 */
  viewMode: "grid" | "list";
  /** 프리셋 변경 핸들러 */
  onSelectPreset: (preset: number) => void;
  /** 뷰 모드 변경 핸들러 */
  onChangeViewMode: (mode: "grid" | "list") => void;
  /**
   * 추가 액션 버튼들 (스펙카드, 세트효과 등), 뷰 모드 버튼 좌측에 구분선과 함께 배치
   */
  actions?: ReactNode;
}

export const CommonTabHeader = ({
  activePresetNo,
  selectedPreset,
  presets = [1, 2, 3],
  viewMode,
  onSelectPreset,
  onChangeViewMode,
  actions,
}: CommonTabHeaderProps) => {
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
          {/* 액션 버튼들 (스펙카드, 세트효과 등) */}
          {actions}

          {/* 구분선 (액션 버튼이 있을 때만 표시) */}
          {actions && (
            <div className="bg-border mx-1 h-3 w-[1px]" aria-hidden="true" />
          )}

          {/* 그리드 */}
          <Tooltip>
            <TooltipTrigger asChild>
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
