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
    <div className="flex flex-col gap-3">
      <UnionCard data={data} ranking={ranking} />

      <section className="overflow-hidden rounded-md border p-3">
        {isRaiderLoading ? (
          <div className="text-muted-foreground flex h-98 items-center justify-center text-sm">
            배치도 불러오는 중...
          </div>
        ) : (
          <UnionBattleMap raiderData={raiderData} />
        )}
      </section>

      <div className="flex w-full gap-2">
        <div className="w-1/2">
          <UnionEffect
            title="레벨 총합 효과 누적"
            options={data.union_level_total_option}
            contentHeight="h-70" // 280px
          />
        </div>

        <div className="flex w-1/2 flex-col gap-2">
          <UnionEffect
            title="점령 효과"
            options={raiderData?.use_union_occupied_option}
            contentHeight="h-26" // 104px
            isLoading={isRaiderLoading}
          />
          <UnionEffect
            title="공격대원 효과"
            options={raiderData?.use_union_raider_option}
            contentHeight="h-26" // 104px
            isLoading={isRaiderLoading}
          />
        </div>
      </div>
    </div>
  );
};
