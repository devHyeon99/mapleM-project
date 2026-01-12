"use client";

import { useMemo, useState } from "react";

import {
  sortItems,
  sortItemsForList,
} from "@/entities/item/lib/slots/sortItemSlots";
import type { CharacterItemTabData } from "./ItemTab";

export const useItemTab = (data: CharacterItemTabData) => {
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

  const availablePresetNos = useMemo(
    () => presetList?.map((preset) => preset.preset_no) ?? [],
    [presetList],
  );
  const availableAndroidPresetNos = useMemo(
    () => androidPresetList?.map((preset) => preset.preset_no) ?? [],
    [androidPresetList],
  );

  const effectiveSelectedPreset =
    selectedPreset !== null && availablePresetNos.includes(selectedPreset)
      ? selectedPreset
      : (activePresetNo ?? 1);

  const effectiveSelectedAndroidPreset =
    selectedAndroidPreset !== null &&
    availableAndroidPresetNos.includes(selectedAndroidPreset)
      ? selectedAndroidPreset
      : (activeAndroidPresetNo ?? availableAndroidPresetNos[0] ?? null);

  const currentPresetItems = useMemo(() => {
    return (
      presetList?.find((preset) => preset.preset_no === effectiveSelectedPreset)
        ?.item_equipment ??
      (effectiveSelectedPreset === activePresetNo ? data.item_equipment : [])
    );
  }, [
    activePresetNo,
    data.item_equipment,
    effectiveSelectedPreset,
    presetList,
  ]);

  const currentAndroidPreset = useMemo(() => {
    return androidPresetList?.find(
      (preset) => preset.preset_no === effectiveSelectedAndroidPreset,
    );
  }, [androidPresetList, effectiveSelectedAndroidPreset]);

  const currentAndroid =
    currentAndroidPreset?.android_equipment ??
    (effectiveSelectedAndroidPreset === activeAndroidPresetNo ? android : null);

  const currentHeart =
    currentAndroidPreset?.heart_equipment ??
    (effectiveSelectedAndroidPreset === activeAndroidPresetNo ? heart : null);

  const sortedItems = useMemo(() => {
    return viewMode === "grid"
      ? sortItems(currentPresetItems, currentAndroid ?? null, currentHeart ?? null)
      : sortItemsForList(
          currentPresetItems,
          currentAndroid ?? null,
          currentHeart ?? null,
        );
  }, [currentAndroid, currentHeart, currentPresetItems, viewMode]);

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
