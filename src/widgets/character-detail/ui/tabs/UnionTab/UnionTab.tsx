"use client";

import { TabMessageSection } from "@/shared/ui/TabMessageSection";
import { useUnionRaider, UnionCard } from "@/entities/character";
import type { CharacterUnion, UnionRanking } from "@/entities/character";
import { UnionEffect } from "./UnionEffect";
import { UnionBattleMap } from "./UnionBattleMap";

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

  if (!data || data.union_level === null) {
    return (
      <TabMessageSection
        message={`API 업데이트 이후 접속한 기록이 없거나\n유니온 정보가 존재하지 않습니다.`}
      />
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <UnionCard data={data} ranking={ranking} />

      <UnionBattleMap
        raiderData={raiderData}
        isLoading={isRaiderLoading}
        error={raiderErrorProp}
      />

      <section aria-label="유니온 효과 요약" className="flex flex-col gap-2">
        <UnionEffect
          title="레벨 총합 효과 누적"
          options={data.union_level_total_option}
        />

        <div className="grid grid-cols-2 items-stretch gap-2 [&>*]:h-full">
          <UnionEffect
            title="점령 효과"
            options={raiderData?.use_union_occupied_option}
            isLoading={isRaiderLoading}
            error={raiderErrorProp}
          />
          <UnionEffect
            title="공격대원 효과"
            options={raiderData?.use_union_raider_option}
            isLoading={isRaiderLoading}
            error={raiderErrorProp}
          />
        </div>
      </section>
    </div>
  );
};
