"use client";

import { useMemo, useState } from "react";

import {
  sortItems,
  sortItemsForList,
} from "@/entities/item/lib/slots/sortItemSlots";
import type { CharacterItemTabData } from "./types";

// API가 현재 장비 프리셋 번호를 내려주지 않을 때 사용할 기본 프리셋 번호
const DEFAULT_PRESET_NO = 1;

export const useItemTab = (data: CharacterItemTabData) => {
  // 사용자가 직접 선택한 장비/안드로이드 프리셋과 보기 방식
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [selectedAndroidPreset, setSelectedAndroidPreset] = useState<number | null>(
    null,
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // API 응답의 현재 적용 프리셋과 기본 장착 장비 데이터
  const {
    equipment_preset: presetList,
    android_preset: androidPresetList,
    android_equipment: android,
    heart_equipment: heart,
    item_equipment: equippedItems,
    use_preset_no: activePresetNo,
    android_use_preset_no: activeAndroidPresetNo,
  } = data;

  // 선택 가능한 장비/안드로이드 프리셋 번호 목록
  const availablePresetNos = presetList?.map((preset) => preset.preset_no) ?? [];
  const availableAndroidPresetNos =
    androidPresetList?.map((preset) => preset.preset_no) ?? [];

  // 사용자가 아직 선택하지 않았거나 선택값이 유효하지 않을 때 사용할 프리셋 번호
  const fallbackPresetNo = activePresetNo ?? DEFAULT_PRESET_NO;
  const fallbackAndroidPresetNo =
    activeAndroidPresetNo ?? availableAndroidPresetNos[0] ?? null;

  // 실제 화면에 표시할 장비 프리셋 번호
  const effectiveSelectedPreset =
    selectedPreset !== null && availablePresetNos.includes(selectedPreset)
      ? selectedPreset
      : fallbackPresetNo;

  // 실제 화면에 표시할 안드로이드 프리셋 번호
  const effectiveSelectedAndroidPreset =
    selectedAndroidPreset !== null &&
    availableAndroidPresetNos.includes(selectedAndroidPreset)
      ? selectedAndroidPreset
      : fallbackAndroidPresetNo;

  // 현재 선택된 장비 프리셋의 장비 목록
  const currentPresetItems = useMemo(() => {
    return (
      presetList?.find((preset) => preset.preset_no === effectiveSelectedPreset)
        ?.item_equipment ??
      (effectiveSelectedPreset === activePresetNo ? equippedItems : [])
    );
  }, [activePresetNo, effectiveSelectedPreset, equippedItems, presetList]);

  // 현재 선택된 안드로이드 프리셋 데이터
  const currentAndroidPreset = androidPresetList?.find(
    (preset) => preset.preset_no === effectiveSelectedAndroidPreset,
  );

  // 현재 선택된 안드로이드 장비
  const currentAndroid =
    currentAndroidPreset?.android_equipment ??
    (effectiveSelectedAndroidPreset === activeAndroidPresetNo ? android : null);

  // 현재 선택된 안드로이드 하트 장비
  const currentHeart =
    currentAndroidPreset?.heart_equipment ??
    (effectiveSelectedAndroidPreset === activeAndroidPresetNo ? heart : null);

  // 현재 보기 방식에 맞게 장비 슬롯 순서를 정렬
  const sortedItems = useMemo(() => {
    return viewMode === "grid"
      ? sortItems(currentPresetItems, currentAndroid ?? null, currentHeart ?? null)
      : sortItemsForList(
          currentPresetItems,
          currentAndroid ?? null,
          currentHeart ?? null,
        );
  }, [currentAndroid, currentHeart, currentPresetItems, viewMode]);

  // ItemTabHeader에 전달할 프리셋/보기 방식 제어 props
  const headerProps = {
    activePresetNo,
    activeAndroidPresetNo,
    selectedPreset: effectiveSelectedPreset,
    selectedAndroidPreset: effectiveSelectedAndroidPreset,
    equipmentPresets: availablePresetNos,
    androidPresets: availableAndroidPresetNos,
    viewMode,
    onSelectPreset: setSelectedPreset,
    onSelectAndroidPreset: setSelectedAndroidPreset,
    onChangeViewMode: setViewMode,
  };

  return {
    effectiveSelectedPreset,
    headerProps,
    sortedItems,
    viewMode,
  } as const;
};
