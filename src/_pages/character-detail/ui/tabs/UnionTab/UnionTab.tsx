"use client";

import { useState } from "react";
import { SegmentedToggle } from "@/shared/ui/SegmentedToggle";
import { TabMessageSection } from "@/shared/ui/TabMessageSection";
import { useUnionRaider, useUnionStat, UnionCard } from "@/entities/character";
import type { CharacterUnion, UnionRanking } from "@/entities/character";
import { UnionEffect } from "./UnionEffect";

interface UnionTabProps {
  ocid: string;
  data: CharacterUnion | null;
  ranking: UnionRanking | null;
}

export const UnionTab = ({ ocid, data, ranking }: UnionTabProps) => {
  const {
    data: raiderData,
    isLoading: isRaiderLoading,
    isError: isRaiderError,
    error: raiderError,
  } = useUnionRaider(ocid, data?.union_level ?? null);

  // 공격대 조회 실패는 해당 섹션에만 전달함 (유니온 카드·레벨 총합 효과는 props라 정상 표시)
  const raiderErrorProp = isRaiderError ? raiderError : undefined;

  const {
    data: statData,
    isLoading: isStatLoading,
    isError: isStatError,
    error: statError,
  } = useUnionStat(ocid, data?.union_level ?? null);

  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const activePreset = selectedPreset ?? statData?.use_preset_no;

  // 선택한 프리셋 스탯을 공용 옵션 형태로 변환
  const unionStatOptions = statData?.union_stat_preset
    .find((preset) => preset.preset_no === activePreset)
    ?.union_stat.map((stat) => ({
      option_name: stat.stat_name,
      option_value: stat.stat_value,
    }));

  if (!data || data.union_level === null) {
    return (
      <TabMessageSection
        message={`API 업데이트 이후 접속한 기록이 없거나\n유니온 정보가 존재하지 않습니다.`}
      />
    );
  }

  return (
    <div className="wide:grid wide:grid-cols-2 flex flex-col gap-2">
      <UnionCard data={data} ranking={ranking} />

      {/* wide 이상에서는 효과 카드도 바깥 그리드 칸에 직접 배치됨 */}
      <section
        aria-label="유니온 효과 요약"
        className="wide:contents flex flex-col gap-2"
      >
        <UnionEffect
          title="레벨 총합 효과"
          options={data.union_level_total_option}
        />

        <UnionEffect
          title="공격대원 효과"
          options={raiderData?.use_union_raider_option}
          isLoading={isRaiderLoading}
          error={raiderErrorProp}
        />

        <UnionEffect
          title="유니온 스탯"
          action={
            statData && (
              <SegmentedToggle
                ariaLabel="유니온 스탯 프리셋 선택"
                value={activePreset}
                onChange={setSelectedPreset}
                options={statData.union_stat_preset.map(({ preset_no }) => ({
                  value: preset_no,
                  marked: preset_no === statData.use_preset_no,
                }))}
              />
            )
          }
          options={unionStatOptions}
          isLoading={isStatLoading}
          error={isStatError ? statError : undefined}
        />
      </section>
    </div>
  );
};
