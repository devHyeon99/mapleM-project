"use client";

import { useMemo, useState } from "react";

import { CommonTabHeader } from "@/shared/ui/CommonTabHeader";

import { CharacterDetailData } from "@/entities/character";
import { sortItems, sortItemsForList } from "@/entities/item/lib";

import { ItemGrid } from "./ItemGrid";
import { ItemList } from "./ItemList";
import { ItemTabFooter } from "./ItemTabFooter";

interface ItemTabProps {
  data: CharacterDetailData;
}

export const ItemTab = ({ data }: ItemTabProps) => {
  const [selectedPreset, setSelectedPreset] = useState(data.use_preset_no ?? 1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const {
    equipment_preset: presetList,
    android_equipment: android,
    heart_equipment: heart,
    use_preset_no: activePresetNo,
  } = data;

  const currentPresetItems = useMemo(() => {
    return (
      presetList?.find((p) => p.preset_no === selectedPreset)?.item_equipment ??
      (selectedPreset === activePresetNo ? data.item_equipment : [])
    );
  }, [presetList, selectedPreset, activePresetNo, data.item_equipment]);

  const sortedItems = useMemo(() => {
    return viewMode === "grid"
      ? sortItems(currentPresetItems, android ?? null, heart ?? null)
      : sortItemsForList(currentPresetItems, android ?? null, heart ?? null);
  }, [viewMode, currentPresetItems, android, heart]);

  if (data.use_preset_no === null) {
    return (
      <section className="bg-muted/50 flex min-h-91.5 flex-col items-center justify-center gap-2 rounded-md border p-6 text-center">
        <p className="text-muted-foreground text-sm whitespace-pre-line">
          API 업데이트 이후 접속 기록이 없거나,{`\n`}
          장착한 장비 정보를 불러올 수 없습니다.
        </p>
      </section>
    );
  }

  const commonHeaderProps = {
    activePresetNo,
    selectedPreset,
    viewMode,
    onSelectPreset: setSelectedPreset,
    onChangeViewMode: setViewMode,
  } as const;
  console.log(sortedItems);
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-card relative flex flex-col gap-4 rounded-xs shadow-sm">
        {viewMode === "grid" ? (
          <div className="mx-auto flex w-full flex-col items-center gap-4 py-4">
            <CommonTabHeader {...commonHeaderProps} />
            <ItemGrid items={sortedItems} presetNo={selectedPreset} />
          </div>
        ) : (
          <div className="pt-4">
            <CommonTabHeader {...commonHeaderProps} />
            <ItemList
              items={sortedItems}
              presetNo={selectedPreset}
              characterClass={data.character_class}
            />
          </div>
        )}
      </div>
      <div className="mx-auto w-full">
        <ItemTabFooter
          items={sortedItems}
          presetNo={selectedPreset}
          characterClass={data.character_class}
        />
      </div>
    </div>
  );
};
