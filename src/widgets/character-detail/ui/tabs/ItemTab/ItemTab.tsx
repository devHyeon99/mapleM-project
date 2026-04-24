"use client";

import { ItemGrid } from "./ItemGrid";
import { ItemTabHeader } from "./ItemTabHeader";
import { ItemList } from "./ItemList";
import { ItemTabFooter } from "./ItemTabFooter";
import { useItemTab } from "./useItemTab";
import type { CharacterItemTabData } from "../../types";
import { TabMessageSection } from "@/shared/ui/TabMessageSection";

interface ItemTabProps {
  data: CharacterItemTabData;
}

export const ItemTab = ({ data }: ItemTabProps) => {
  const { effectiveSelectedPreset, headerProps, sortedItems, viewMode } =
    useItemTab(data);

  if (data.use_preset_no === null) {
    return (
      <TabMessageSection
        message={`API 업데이트 이후 접속 기록이 없거나\n장착한 장비 정보를 불러올 수 없습니다.`}
      />
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="relative flex flex-col rounded-2xl shadow-sm">
        <ItemTabHeader {...headerProps} />

        <div className="bg-card rounded-b-2xl">
          {viewMode === "grid" ? (
            <div className="flex w-full flex-col items-center py-4">
              <ItemGrid
                items={sortedItems}
                presetNo={effectiveSelectedPreset}
              />
            </div>
          ) : (
            <ItemList
              items={sortedItems}
              presetNo={effectiveSelectedPreset}
              characterClass={data.character_class}
            />
          )}
        </div>
      </div>
      <ItemTabFooter
        items={sortedItems}
        characterClass={data.character_class}
      />
    </div>
  );
};
