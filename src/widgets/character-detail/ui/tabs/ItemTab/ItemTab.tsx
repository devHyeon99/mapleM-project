"use client";

import { CharacterDetailData } from "@/entities/character";

import { ItemGrid } from "./ItemGrid";
import { ItemTabHeader } from "./ItemTabHeader";
import { ItemList } from "./ItemList";
import { ItemTabFooter } from "./ItemTabFooter";
import { useItemTab } from "./useItemTab";
import { TabMessageSection } from "@/shared/ui/TabMessageSection";

interface ItemTabProps {
  data: CharacterDetailData;
}

export const ItemTab = ({ data }: ItemTabProps) => {
  const {
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
  } = useItemTab(data);

  if (data.use_preset_no === null) {
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
            <ItemTabHeader
              activePresetNo={activePresetNo}
              activeAndroidPresetNo={activeAndroidPresetNo}
              selectedPreset={effectiveSelectedPreset}
              selectedAndroidPreset={effectiveSelectedAndroidPreset}
              equipmentPresets={availablePresetNos}
              androidPresets={availableAndroidPresetNos}
              viewMode={viewMode}
              onSelectPreset={setSelectedPreset}
              onSelectAndroidPreset={setSelectedAndroidPreset}
              onChangeViewMode={setViewMode}
            />
            <ItemGrid items={sortedItems} presetNo={effectiveSelectedPreset} />
          </div>
        ) : (
          <div className="pt-4">
            <ItemTabHeader
              activePresetNo={activePresetNo}
              activeAndroidPresetNo={activeAndroidPresetNo}
              selectedPreset={effectiveSelectedPreset}
              selectedAndroidPreset={effectiveSelectedAndroidPreset}
              equipmentPresets={availablePresetNos}
              androidPresets={availableAndroidPresetNos}
              viewMode={viewMode}
              onSelectPreset={setSelectedPreset}
              onSelectAndroidPreset={setSelectedAndroidPreset}
              onChangeViewMode={setViewMode}
              className="w-full px-4"
            />
            <ItemList
              items={sortedItems}
              presetNo={effectiveSelectedPreset}
              characterClass={data.character_class}
            />
          </div>
        )}
      </div>
      <div className="mx-auto w-full">
        <ItemTabFooter
          items={sortedItems}
          presetNo={effectiveSelectedPreset}
          characterClass={data.character_class}
        />
      </div>
    </div>
  );
};
