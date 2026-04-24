import { useMemo, useState } from "react";

import { convertBeautyToCashItem } from "@/entities/cash-item/lib/convertBeautyToCashItem";
import { sortCashItems } from "@/entities/cash-item/lib/sortCashItems";
import type {
  CashItemEquipment,
  CharacterCashEquipmentData,
} from "@/entities/cash-item/model/types";

import type { CashItemLookMode } from "./CashItemTabHeader";

const DRESS_UP_SLOT_SUFFIX = " (드레스업 슬롯)";

const normalizeDressUpCashItems = (
  items: CashItemEquipment[],
): CashItemEquipment[] => {
  return items.map((item) => ({
    ...item,
    cash_item_equipment_slot_name: item.cash_item_equipment_slot_name.endsWith(
      DRESS_UP_SLOT_SUFFIX,
    )
      ? item.cash_item_equipment_slot_name.slice(
          0,
          -DRESS_UP_SLOT_SUFFIX.length,
        )
      : item.cash_item_equipment_slot_name,
  }));
};

export const useCashItemTab = (data?: CharacterCashEquipmentData) => {
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
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
  const presetNos =
    (isDressUpMode
      ? data?.additional_cash_equipment_preset
      : data?.cash_equipment_preset
    )?.map((preset) => preset.preset_no) ?? [];
  const fallbackPresetNo = activePresetNo ?? presetNos[0] ?? null;
  const effectiveSelectedPreset =
    selectedPreset !== null && presetNos.includes(selectedPreset)
      ? selectedPreset
      : fallbackPresetNo;

  const handleChangeLookMode = (mode: CashItemLookMode) => {
    setSelectedLookMode(mode);
    setSelectedPreset(null);
  };

  const currentPresetItems = useMemo(() => {
    if (isDressUpMode) {
      const presetData = data?.additional_cash_equipment_preset?.find(
        (preset) => preset.preset_no === effectiveSelectedPreset,
      );

      return normalizeDressUpCashItems(
        presetData?.additional_cash_item_equipment ??
          (effectiveSelectedPreset === activePresetNo
            ? (data?.additional_cash_item_equipment ?? [])
            : []),
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

  const sortedItems = useMemo(() => {
    return sortCashItems([...beautyItems, ...currentPresetItems]);
  }, [beautyItems, currentPresetItems]);

  const hasCashItemContent = sortedItems.some((slot) => slot.item !== null);

  const headerProps = {
    activePresetNo,
    canUseDressUpMode,
    lookMode: effectiveLookMode,
    selectedPreset: effectiveSelectedPreset,
    presets: presetNos,
    viewMode,
    onChangeLookMode: handleChangeLookMode,
    onSelectPreset: setSelectedPreset,
    onChangeViewMode: setViewMode,
  };

  return {
    effectiveSelectedPreset,
    headerProps,
    hasCashItemContent,
    sortedItems,
    viewMode,
  } as const;
};
