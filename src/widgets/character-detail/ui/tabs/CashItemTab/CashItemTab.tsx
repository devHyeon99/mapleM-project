"use client";

import { useMemo, useState } from "react";

// Shared & UI
import { LoadingCard } from "@/shared/ui/LoadingCard";

// Entities
import { useCharacterCashEquipment } from "@/entities/cash-item/model/hooks/useCharacterCashEquipment";
import type { CashItemEquipment } from "@/entities/cash-item/model/types";
import { sortCashItems } from "@/entities/cash-item/lib/sortCashItems";
import { convertBeautyToCashItem } from "@/entities/cash-item/lib/convertBeautyToCashItem";

// Local Components
import { CashItemGrid } from "./CashItemGrid";
import { CashItemList } from "./CashItemList";
import {
  CashItemTabHeader,
  type CashItemLookMode,
} from "./CashItemTabHeader";
import { TabMessageSection } from "@/shared/ui/TabMessageSection";
import { CHARACTER_TAB_LOADING_MESSAGE } from "../loading";

interface CashItemTabProps {
  ocid: string;
}

const DRESS_UP_SLOT_SUFFIX = " (드레스업 슬롯)";

const normalizeDressUpCashItems = (
  items: CashItemEquipment[],
): CashItemEquipment[] => {
  return items.map((item) => ({
    ...item,
    cash_item_equipment_slot_name:
      item.cash_item_equipment_slot_name.endsWith(DRESS_UP_SLOT_SUFFIX)
        ? item.cash_item_equipment_slot_name.slice(
            0,
            -DRESS_UP_SLOT_SUFFIX.length,
          )
        : item.cash_item_equipment_slot_name,
  }));
};

export const CashItemTab = ({ ocid }: CashItemTabProps) => {
  const { data, isLoading, isError, error } = useCharacterCashEquipment(ocid);
  const [selectedPreset, setSelectedPreset] = useState<number | null>(
    () => data?.use_preset_no ?? null,
  );
  const [selectedLookMode, setSelectedLookMode] =
    useState<CashItemLookMode | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const hasDressUpData =
    (data?.additional_cash_item_equipment?.length ?? 0) > 0 ||
    (data?.additional_cash_equipment_preset?.length ?? 0) > 0;
  const canUseDressUpMode =
    data?.character_class === "엔젤릭버스터" && hasDressUpData;
  const effectiveLookMode: CashItemLookMode =
    selectedLookMode ??
    (data?.character_look_mode === "1" && canUseDressUpMode
      ? "dressUp"
      : "normal");
  const isDressUpMode = effectiveLookMode === "dressUp";

  const activePresetNo = isDressUpMode
    ? data?.use_additional_preset_no
    : data?.use_preset_no;
  const presetNos = isDressUpMode
    ? data?.additional_cash_equipment_preset?.map((preset) => preset.preset_no)
    : data?.cash_equipment_preset?.map((preset) => preset.preset_no);
  const effectiveSelectedPreset = selectedPreset ?? activePresetNo ?? null;

  const handleChangeLookMode = (mode: CashItemLookMode) => {
    setSelectedLookMode(mode);
    setSelectedPreset(null);
  };

  // 현재 선택된 프리셋의 아이템 목록 추출
  const currentPresetItems = useMemo(() => {
    if (isDressUpMode) {
      const presetData = data?.additional_cash_equipment_preset?.find(
        (preset) => preset.preset_no === effectiveSelectedPreset,
      );

      return (
        normalizeDressUpCashItems(
          presetData?.additional_cash_item_equipment ??
            (effectiveSelectedPreset === activePresetNo
              ? (data?.additional_cash_item_equipment ?? [])
              : []),
        )
      );
    }

    const presetData = data?.cash_equipment_preset?.find(
      (preset) => preset.preset_no === effectiveSelectedPreset,
    );

    return (
      presetData?.cash_item_equipment ??
      (effectiveSelectedPreset === activePresetNo
        ? (data?.cash_item_equipment ?? [])
        : [])
    );
  }, [activePresetNo, data, effectiveSelectedPreset, isDressUpMode]);

  const beautyItems = useMemo(() => {
    return convertBeautyToCashItem(
      data?.beauty_data,
      isDressUpMode ? "1" : "0",
    );
  }, [data?.beauty_data, isDressUpMode]);

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

  if (
    !data ||
    (data.cash_item_equipment.length === 0 &&
      data.additional_cash_item_equipment.length === 0)
  ) {
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
              activePresetNo={activePresetNo}
              canUseDressUpMode={canUseDressUpMode}
              lookMode={effectiveLookMode}
              selectedPreset={effectiveSelectedPreset}
              presets={presetNos}
              viewMode={viewMode}
              onChangeLookMode={handleChangeLookMode}
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
              activePresetNo={activePresetNo}
              canUseDressUpMode={canUseDressUpMode}
              lookMode={effectiveLookMode}
              selectedPreset={effectiveSelectedPreset}
              presets={presetNos}
              viewMode={viewMode}
              onChangeLookMode={handleChangeLookMode}
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
