"use client";

import { useMemo, useState } from "react";

// Shared & UI
import { LoadingCard } from "@/shared/ui/LoadingCard";

// Entities
import {
  useCharacterCashEquipment,
  sortCashItems,
  convertBeautyToCashItem,
} from "@/entities/cash-item";

// Local Components
import { CashItemGrid } from "./CashItemGrid";
import { CashItemList } from "./CashItemList";
import { CashItemTabHeader } from "./CashItemTabHeader";
import { TabMessageSection } from "@/shared/ui/TabMessageSection";
import { CHARACTER_TAB_LOADING_MESSAGE } from "../loading";

interface CashItemTabProps {
  ocid: string;
}

export const CashItemTab = ({ ocid }: CashItemTabProps) => {
  const { data, isLoading, isError, error } = useCharacterCashEquipment(ocid);
  const [selectedPreset, setSelectedPreset] = useState<number | null>(
    () => data?.use_preset_no ?? null,
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const effectiveSelectedPreset = selectedPreset ?? data?.use_preset_no ?? null;

  // 현재 선택된 프리셋의 아이템 목록 추출
  const currentPresetItems = useMemo(() => {
    const presetList = data?.cash_equipment_preset ?? [];
    const currentItemsRaw = data?.cash_item_equipment ?? [];
    const activePresetNo = data?.use_preset_no;

    // 프리셋 리스트에서 선택된 번호 찾기
    const presetData = presetList.find(
      (p) => p.preset_no === effectiveSelectedPreset,
    );

    // 프리셋 데이터가 있으면 사용, 없으면(현재 적용 중인 프리셋과 같다면) 메인 데이터 사용
    return (
      presetData?.cash_item_equipment ??
      (effectiveSelectedPreset === activePresetNo ? currentItemsRaw : [])
    );
  }, [data, effectiveSelectedPreset]);

  const beautyItems = useMemo(() => {
    return convertBeautyToCashItem(
      data?.beauty_data,
      data?.character_look_mode,
    );
  }, [data?.beauty_data, data?.character_look_mode]);

  // (뷰티 + 장비)
  const sortedItems = useMemo(() => {
    // 두 배열을 합친 뒤 정렬 함수로 전달
    const mergedItems = [...beautyItems, ...currentPresetItems];
    return sortCashItems(mergedItems);
  }, [currentPresetItems, beautyItems]);

  if (isLoading) {
    return <LoadingCard message={CHARACTER_TAB_LOADING_MESSAGE} />;
  }

  if (isError) {
    return (
      <div className="text-destructive flex h-40 items-center justify-center p-4 text-sm font-medium">
        오류 발생: {(error as Error).message}
      </div>
    );
  }

  if (!data || data.cash_item_equipment.length === 0) {
    return (
      <TabMessageSection
        message={`API 업데이트 이후 접속 기록이 없거나\n장착한 장비 정보를 불러올 수 없습니다.`}
      />
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="bg-card relative flex flex-col gap-4 rounded-xs shadow-sm">
        {viewMode === "grid" ? (
          <div className="mx-auto flex w-full flex-col items-center gap-4 py-4">
            <CashItemTabHeader
              activePresetNo={data.use_preset_no}
              selectedPreset={effectiveSelectedPreset}
              presets={data.cash_equipment_preset?.map(
                (preset) => preset.preset_no,
              )}
              viewMode={viewMode}
              onSelectPreset={setSelectedPreset}
              onChangeViewMode={setViewMode}
            />
            <CashItemGrid
              items={sortedItems}
              presetNo={effectiveSelectedPreset}
            />
          </div>
        ) : (
          <div className="pt-4">
            <CashItemTabHeader
              activePresetNo={data.use_preset_no}
              selectedPreset={effectiveSelectedPreset}
              presets={data.cash_equipment_preset?.map(
                (preset) => preset.preset_no,
              )}
              viewMode={viewMode}
              onSelectPreset={setSelectedPreset}
              onChangeViewMode={setViewMode}
              className="w-full px-4"
            />
            <CashItemList
              items={sortedItems}
              presetNo={effectiveSelectedPreset}
            />
          </div>
        )}
      </div>
    </div>
  );
};
