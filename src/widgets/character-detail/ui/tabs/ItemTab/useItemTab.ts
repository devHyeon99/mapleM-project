"use client";

import { useState } from "react";

import { CharacterDetailData } from "@/entities/character";
import { sortItems, sortItemsForList } from "@/entities/item/lib";

export const useItemTab = (data: CharacterDetailData) => {
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [selectedAndroidPreset, setSelectedAndroidPreset] = useState<number | null>(
    null,
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const {
    equipment_preset: presetList,
    android_preset: androidPresetList,
    android_equipment: android,
    heart_equipment: heart,
    use_preset_no: activePresetNo,
    android_use_preset_no: activeAndroidPresetNo,
  } = data;

  const availablePresetNos = presetList?.map((preset) => preset.preset_no) ?? [];
  const availableAndroidPresetNos =
    androidPresetList?.map((preset) => preset.preset_no) ?? [];

  const effectiveSelectedPreset =
    selectedPreset !== null && availablePresetNos.includes(selectedPreset)
      ? selectedPreset
      : (activePresetNo ?? 1);

  const effectiveSelectedAndroidPreset =
    selectedAndroidPreset !== null &&
    availableAndroidPresetNos.includes(selectedAndroidPreset)
      ? selectedAndroidPreset
      : (activeAndroidPresetNo ?? availableAndroidPresetNos[0] ?? null);

  const currentPresetItems =
    presetList?.find((preset) => preset.preset_no === effectiveSelectedPreset)
      ?.item_equipment ??
    (effectiveSelectedPreset === activePresetNo ? data.item_equipment : []);

  const currentAndroidPreset = androidPresetList?.find(
    (preset) => preset.preset_no === effectiveSelectedAndroidPreset,
  );

  const currentAndroid =
    currentAndroidPreset?.android_equipment ??
    (effectiveSelectedAndroidPreset === activeAndroidPresetNo ? android : null);

  const currentHeart =
    currentAndroidPreset?.heart_equipment ??
    (effectiveSelectedAndroidPreset === activeAndroidPresetNo ? heart : null);

  const sortedItems =
    viewMode === "grid"
      ? sortItems(currentPresetItems, currentAndroid ?? null, currentHeart ?? null)
      : sortItemsForList(
          currentPresetItems,
          currentAndroid ?? null,
          currentHeart ?? null,
        );

  return {
    activeAndroidPresetNo,
    activePresetNo,
    availableAndroidPresetNos,
    availablePresetNos,
    effectiveSelectedAndroidPreset,
    effectiveSelectedPreset,
    setSelectedAndroidPreset,
    setSelectedPreset,
    setViewMode,
    sortedItems,
    viewMode,
  } as const;
};
