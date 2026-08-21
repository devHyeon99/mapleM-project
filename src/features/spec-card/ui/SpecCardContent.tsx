"use client";

import { Loader2 } from "lucide-react";
import {
  useCharacterHexaMatrixStat,
  useCharacterSymbol,
} from "@/entities/character";
import type {
  CharacterDetailData,
  CharacterHyperStat,
} from "@/entities/character";
import { sortItems } from "@/entities/item";
import { SITE_HOST } from "@/shared/config/site";
import type { MergedSpecData } from "../model/types";

import { EquipmentGrid } from "./EquipmentGrid";
import { RightStatColumn } from "./RightStatColumn";
import { useCharacterHexaMatrixSkill } from "@/entities/skill";

interface SpecCardContentProps {
  ocid: string;
  initialData: CharacterDetailData;
  /** 아이템 탭과 같은 장비 프리셋 번호 */
  presetNo: number | null;
  /** 아이템 탭과 같은 안드로이드 프리셋 번호 */
  androidPresetNo: number | null;
  hyperStat: CharacterHyperStat | null;
  hyperPresetNo: number | null;
  isHyperStatLoading: boolean;
}

export const SpecCardContent = ({
  ocid,
  initialData,
  presetNo,
  androidPresetNo,
  hyperStat,
  hyperPresetNo,
  isHyperStatLoading,
}: SpecCardContentProps) => {
  // API 호출
  const { data: symbolData, isLoading: isSymbolLoading } = useCharacterSymbol(
    ocid,
    initialData.character_level,
  );
  const { data: hexaStatData, isLoading: isHexaStatLoading } =
    useCharacterHexaMatrixStat(ocid, initialData.character_level);
  const { data: hexaSkillData, isLoading: isHexaSkillLoading } =
    useCharacterHexaMatrixSkill(ocid, initialData.character_level);

  const isLoading =
    isSymbolLoading ||
    isHexaStatLoading ||
    isHexaSkillLoading ||
    isHyperStatLoading;

  // 로딩 중 UI
  if (isLoading) {
    return (
      <div className="text-muted-foreground flex h-[523px] w-full flex-col items-center justify-center gap-4 rounded-lg border">
        <Loader2 className="text-primary h-10 w-10 animate-spin" />
        <p className="text-sm">상세 스펙 정보를 불러오고 있습니다...</p>
      </div>
    );
  }

  // 선택한 프리셋의 장비. 프리셋 목록에 없으면 현재 착용 장비로 떨어짐
  const presetItems =
    initialData.equipment_preset?.find(
      (preset) => preset.preset_no === presetNo,
    )?.item_equipment ?? initialData.item_equipment;

  // 선택한 안드로이드 프리셋. 없으면 현재 착용분으로 떨어짐
  const androidPreset = initialData.android_preset?.find(
    (preset) => preset.preset_no === androidPresetNo,
  );

  // 선택한 하이퍼 스탯 프리셋에서 실제로 찍은 것만
  const hyperStatInfo =
    hyperStat?.hyper_stat
      .find((preset) => preset.preset_no === hyperPresetNo)
      ?.hyper_stat_info.filter((info) => info.stat_level > 0)
      // 짧은 옵션이 위로 와야 2열 그리드가 빈칸 없이 채워짐
      .sort((a, b) => a.stat_type.length - b.stat_type.length) ?? [];

  // 데이터 병합
  const mergedData: MergedSpecData = {
    ...initialData,
    item_equipment: presetItems,
    android_equipment:
      androidPreset?.android_equipment ?? initialData.android_equipment,
    heart_equipment:
      androidPreset?.heart_equipment ?? initialData.heart_equipment,
    symbol_data: symbolData ?? null,
    hexa_stat_data: hexaStatData ?? null,
    hexa_skill_data: hexaSkillData ?? null,
    hyper_stat_info: hyperStatInfo,
  };

  // UI 렌더링 준비 (아이템 탭과 같은 그리드 슬롯 배치를 그대로 씀)
  const equipmentSlots = sortItems(
    mergedData.item_equipment ?? [],
    mergedData.android_equipment ?? null,
    mergedData.heart_equipment ?? null,
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4">
        <section className="min-w-0 flex-1">
          <h4 className="sr-only">장비</h4>
          <EquipmentGrid items={equipmentSlots} data={mergedData} />
        </section>

        {/* 내용 폭(스킬 6칸 232px)에 맞춘 고정 폭 */}
        <section className="w-60 shrink-0">
          <h4 className="sr-only">핵심 스펙</h4>
          <RightStatColumn data={mergedData} />
        </section>
      </div>

      <div className="text-muted-foreground mt-1 flex items-center justify-between text-[11px]">
        <span className="font-medium">메엠지지 ({SITE_HOST})</span>
        <span>{new Date().toLocaleDateString()}</span>
      </div>
    </div>
  );
};
