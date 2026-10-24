"use client";

import { ItemGrid } from "./ItemGrid";
import { ItemTabHeader } from "./ItemTabHeader";
import { ItemTabSection } from "./ItemTabSection";
import { ItemList } from "./ItemList";
import { ItemSetEffectList } from "./ItemSetEffectList";
import { ItemSpecSummary } from "./ItemSpecSummary";
import { useItemTab } from "./useItemTab";
import { PetSetOptionList } from "./PetSetOptionList";
import type { CharacterItemTabData } from "../../types";
import { cn } from "@/shared/lib/utils";
import { TabMessageSection } from "@/shared/ui/TabMessageSection";

interface ItemTabProps {
  data: CharacterItemTabData;
}

export const ItemTab = ({ data }: ItemTabProps) => {
  const {
    effectiveSelectedPreset,
    headerProps,
    sortedItems,
    hasNoEquipItems,
    activeSets,
    viewMode,
  } = useItemTab(data);

  if (data.use_preset_no === null) {
    return (
      <TabMessageSection
        message={`API 업데이트 이후 접속 기록이 없거나\n장착한 장비 정보를 불러올 수 없습니다.`}
      />
    );
  }

  const isGrid = viewMode === "grid";
  const petSetOptions = data.pet_set_option ?? [];

  // wide 이상 그리드 뷰: 패널 하나를 2열 grid로 펼쳐 요약 카드를 그리드 오른쪽에 배치
  // 그 외: 패널 아래에 요약 카드 세로 배치

  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        isGrid &&
          "wide:grid wide:grid-cols-[auto_1fr] wide:gap-0 wide:bg-card wide:rounded-2xl wide:shadow-sm",
      )}
    >
      {/* wide 2열에서는 contents로 풀려 헤더·본문이 바깥 grid 칸에 직접 배치됨 */}
      <div
        className={cn(
          "relative flex flex-col rounded-2xl shadow-sm",
          isGrid && "wide:contents",
        )}
      >
        <div className="wide:col-span-full">
          <ItemTabHeader {...headerProps} />
        </div>

        <div className="bg-card wide:p-6 rounded-b-2xl">
          {isGrid ? (
            <ItemGrid
              items={sortedItems}
              presetNo={effectiveSelectedPreset}
              pets={data.pets}
              hasNoEquipItems={hasNoEquipItems}
            />
          ) : (
            <ItemList
              items={sortedItems}
              presetNo={effectiveSelectedPreset}
              characterClass={data.character_class}
              hasNoEquipItems={hasNoEquipItems}
            />
          )}
        </div>
      </div>

      <div
        className={cn(
          "flex min-w-0 flex-col gap-2",
          isGrid && "wide:py-6 wide:pr-6 wide:gap-6",
        )}
      >
        {!hasNoEquipItems && (
          <ItemTabSection title="장비 스펙" flat={isGrid}>
            <ItemSpecSummary
              items={sortedItems}
              characterClass={data.character_class}
            />
          </ItemTabSection>
        )}
        {activeSets.length > 0 && (
          <ItemTabSection
            title="장비 세트 효과"
            meta={`${activeSets.length}개 적용`}
            flat={isGrid}
          >
            <ItemSetEffectList sets={activeSets} />
          </ItemTabSection>
        )}
        {petSetOptions.length > 0 && (
          <ItemTabSection
            title="펫 세트 효과"
            meta={`${petSetOptions.length}개 적용`}
            flat={isGrid}
          >
            <PetSetOptionList setOptions={petSetOptions} />
          </ItemTabSection>
        )}
      </div>
    </div>
  );
};
