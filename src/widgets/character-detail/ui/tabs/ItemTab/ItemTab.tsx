"use client";

import { useMemo, useState } from "react";
import { IdCard, Search } from "lucide-react";

// Shared & UI
import { CommonTabHeader } from "@/shared/ui/CommonTabHeader";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { SegmentedButton } from "@/shared/ui/SegmentedButton";

// Entities
import { CharacterDetailData } from "@/entities/character";
import { sortItems, sortItemsForList } from "@/entities/item/lib";

// Local Components
import { ItemGrid } from "./ItemGrid";
import { ItemList } from "./ItemList";
import { ItemTabFooter } from "./ItemTabFooter";

// features
import { SpecCardDialog } from "@/features/share-spec-card";
import { SetEffectDialog } from "@/features/view-set-effect";

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
    set_effect: setEffect = [],
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

  const itemTabData: CharacterDetailData = useMemo(
    () => ({
      ...data,
      item_equipment: currentPresetItems,
    }),
    [data, currentPresetItems],
  );

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

  const ActionButtons = (
    <>
      <SpecCardDialog
        data={itemTabData}
        trigger={
          <span className="inline-flex">
            <Tooltip>
              <TooltipTrigger asChild>
                <SegmentedButton isSelected={false}>
                  <IdCard className="size-5.5" />
                </SegmentedButton>
              </TooltipTrigger>
              <TooltipContent>
                <p>스펙 카드 저장</p>
              </TooltipContent>
            </Tooltip>
          </span>
        }
      />

      <SetEffectDialog
        setEffect={setEffect}
        activePresetNo={activePresetNo ?? 1}
        trigger={
          <span className="inline-flex">
            <Tooltip>
              <TooltipTrigger asChild>
                <SegmentedButton isSelected={false}>
                  <Search className="size-4" />
                </SegmentedButton>
              </TooltipTrigger>
              <TooltipContent>
                <p>세트 효과 보기</p>
              </TooltipContent>
            </Tooltip>
          </span>
        }
      />
    </>
  );

  return (
    <div className="flex flex-col gap-4">
      <CommonTabHeader
        activePresetNo={activePresetNo}
        selectedPreset={selectedPreset}
        viewMode={viewMode}
        onSelectPreset={setSelectedPreset}
        onChangeViewMode={setViewMode}
        actions={ActionButtons}
      />

      {viewMode === "grid" ? (
        <ItemGrid items={sortedItems} presetNo={selectedPreset} />
      ) : (
        <ItemList
          items={sortedItems}
          presetNo={selectedPreset}
          characterClass={data.character_class}
        />
      )}

      <ItemTabFooter
        items={sortedItems}
        characterClass={data.character_class}
      />
    </div>
  );
};
