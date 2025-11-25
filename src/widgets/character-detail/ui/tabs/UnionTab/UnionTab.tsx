"use client";

import { TabMessageSection } from "@/shared/ui/TabMessageSection";
import {
  UnionCard,
  useUnionRaider,
  type CharacterUnion,
  type UnionRanking,
} from "@/entities/character";
import { UnionEffect } from "./UnionEffect";
import { UnionBattleMap } from "./UnionBattleMap";

interface UnionTabProps {
  ocid: string;
  data: CharacterUnion | null;
  ranking: UnionRanking | null;
}

export const UnionTab = ({ ocid, data, ranking }: UnionTabProps) => {
  const { data: raiderData, isLoading: isRaiderLoading } = useUnionRaider(
    ocid,
    data?.union_level ?? null,
  );

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

      {isRaiderLoading ? (
        <div className="bg-card text-muted-foreground flex h-98 items-center justify-center text-sm shadow-sm">
          배치도 불러오는 중...
        </div>
      ) : (
        <UnionBattleMap raiderData={raiderData} />
      )}

      <section
        aria-label="유니온 효과 요약"
        className="flex flex-col gap-2 md:grid md:grid-cols-1"
      >
        <UnionEffect
          title="레벨 총합 효과 누적"
          options={data.union_level_total_option}
          className="h-full"
        />

        <div className="grid grid-cols-2 items-stretch gap-2 [&>*]:h-full">
          <UnionEffect
            title="점령 효과"
            options={raiderData?.use_union_occupied_option}
            className="h-full"
            isLoading={isRaiderLoading}
          />
          <UnionEffect
            title="공격대원 효과"
            options={raiderData?.use_union_raider_option}
            className="h-full"
            isLoading={isRaiderLoading}
          />
        </div>
      </section>
    </div>
  );
};
