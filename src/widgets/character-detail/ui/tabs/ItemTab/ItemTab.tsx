"use client";

import { useState } from "react";
import { CharacterDetailData } from "@/entities/character";
import { sortItems } from "@/entities/item/lib";
import { ItemTabHeader } from "./components/ItemTabHeader";
import { ItemGrid } from "./components/ItemGrid";

interface ItemTabProps {
  data: CharacterDetailData;
}

export const ItemTab = ({ data }: ItemTabProps) => {
  // --- 상태 관리 ---
  const [selectedPreset, setSelectedPreset] = useState(data.use_preset_no ?? 1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // 프리셋 정보가 아예 없는 경우 (미접속 등)
  if (data.use_preset_no === null) {
    return (
      <section className="flex min-h-25 flex-col items-center justify-center gap-2 rounded-md border p-6 text-center">
        <p className="text-muted-foreground text-sm whitespace-pre-line">
          API 업데이트 이후 접속 기록이 없거나,{`\n`}
          장착한 장비 정보를 불러올 수 없습니다.
        </p>
      </section>
    );
  }

  // --- 데이터 추출  ---
  const {
    equipment_preset: presetList,
    android_equipment: android,
    heart_equipment: heart,
    use_preset_no: activePresetNo,
  } = data;

  // --- 데이터 가공 로직 ---
  const currentPresetItems =
    presetList?.find((p) => p.preset_no === selectedPreset)?.item_equipment ??
    (selectedPreset === activePresetNo ? data.item_equipment : []);

  const itemTabData: CharacterDetailData = {
    ...data,
    item_equipment: currentPresetItems,
  };

  const sortedItems = sortItems(
    currentPresetItems,
    android ?? null,
    heart ?? null,
  );

  return (
    <div className="flex flex-col gap-4">
      {/* 헤더 (프리셋 & 뷰 모드 & 버튼) */}
      <ItemTabHeader
        data={itemTabData} // 이거 하나만 넘기면 됨
        selectedPreset={selectedPreset}
        viewMode={viewMode}
        onSelectPreset={setSelectedPreset}
        onChangeViewMode={setViewMode}
      />

      {/* 아이템 목록 */}
      {viewMode === "grid" ? (
        <ItemGrid items={sortedItems} presetNo={selectedPreset} />
      ) : (
        <div className="text-muted-foreground flex h-74 w-85 items-center justify-center py-10 text-sm">
          리스트 뷰 준비 중입니다.
        </div>
      )}
    </div>
  );
};
