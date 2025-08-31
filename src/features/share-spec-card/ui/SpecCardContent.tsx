"use client";

import { Loader2 } from "lucide-react";
import { CharacterDetailData } from "@/entities/character";
import { getSortedSpecCardItems } from "../lib/getSortedSpecCardItems";
import { MergedSpecData } from "../model/types";

import { useCharacterSymbol } from "@/entities/character/model/hooks/useCharacterSymbol";
import { useCharacterHexaStat } from "@/entities/character/model/hooks/useCharacterHexaStat";

import { EquipmentGrid } from "./EquipmentGrid";
import { RightStatColumn } from "./RightStatColumn";
import { TotalStatSection } from "./TotalStatSection";
import { useCharacterHexaMatrixSkill } from "@/entities/skill";

interface SpecCardContentProps {
  ocid: string;
  initialData: CharacterDetailData;
}

export const SpecCardContent = ({
  ocid,
  initialData,
}: SpecCardContentProps) => {
  // API 호출
  const { data: symbolData, isLoading: isSymbolLoading } = useCharacterSymbol(
    ocid,
    initialData.character_level,
  );
  const { data: hexaStatData, isLoading: isHexaStatLoading } =
    useCharacterHexaStat(ocid);
  const { data: hexaSkillData, isLoading: isHexaSkillLoading } =
    useCharacterHexaMatrixSkill(ocid, initialData.character_level);

  const isLoading = isSymbolLoading || isHexaStatLoading || isHexaSkillLoading;

  // 로딩 중 UI
  if (isLoading) {
    return (
      <div className="text-muted-foreground flex h-[300px] w-full flex-col items-center justify-center gap-4 rounded-lg border sm:h-[523px]">
        <Loader2 className="text-primary h-10 w-10 animate-spin" />
        <p className="text-sm">상세 스펙 정보를 불러오고 있습니다...</p>
      </div>
    );
  }

  // 데이터 병합
  const mergedData: MergedSpecData = {
    ...initialData,
    symbol_data: symbolData ?? null,
    hexa_stat_data: hexaStatData ?? null,
    hexa_skill_data: hexaSkillData ?? null,
  };

  // UI 렌더링 준비
  const equipmentList = getSortedSpecCardItems(mergedData.item_equipment || []);

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <section>
          <h4 className="sr-only">장비</h4>
          <EquipmentGrid list={equipmentList} />
        </section>

        <section>
          <h4 className="sr-only">핵심 스펙</h4>
          <RightStatColumn data={mergedData} />
        </section>
      </div>

      <TotalStatSection data={mergedData} />

      <div className="text-muted-foreground mt-1 flex items-center justify-between text-[11px]">
        <span className="font-medium">메엠지지 (maplemgg.com)</span>
        <span>{new Date().toLocaleDateString()} 기준</span>
      </div>
    </div>
  );
};
