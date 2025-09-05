"use client";

import { Separator } from "@/shared/ui/separator";
import { LoadingCard } from "@/shared/ui/LoadingCard";
import { TabMessageSection } from "@/shared/ui/TabMessageSection";
import { InfoRow } from "@/shared/ui/InfoRow"; // InfoRow 도입
import { cn } from "@/shared/lib/utils";
import { useCharacterHexaMatrixStat } from "@/entities/character";
import type { CharacterHexaMatrixStat } from "@/entities/character";
import { Badge } from "@/shared/ui/badge";

interface HexaStatTabProps {
  ocid: string;
  level: number;
}

export const HexaStatTab = ({ ocid, level }: HexaStatTabProps) => {
  const { data, isLoading, isError, error } = useCharacterHexaMatrixStat(
    ocid,
    level,
  );

  if (level < 250) {
    return (
      <TabMessageSection message="HEXA 스탯 시스템은 Lv.250 이상 이용 가능합니다." />
    );
  }

  if (isLoading) return <LoadingCard message="HEXA스탯 불러오는중..." />;

  if (isError) {
    return (
      <div className="p-3 text-sm text-red-500">
        오류 발생: {(error as Error).message}
      </div>
    );
  }

  const statCores = data?.hexamatrix_stat ?? [];

  if (statCores.length === 0) {
    return (
      <TabMessageSection
        message={`API 업데이트 이후 접속 기록이 없거나\n장착한 HEXA스탯이 없습니다.`}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {statCores.map((core) => (
        <HexaStatCoreSection
          key={core.stat_core_slot}
          slot={core.stat_core_slot}
          statInfo={core.stat_info}
        />
      ))}
    </div>
  );
};

type CoreSectionProps = {
  slot: CharacterHexaMatrixStat["hexamatrix_stat"][number]["stat_core_slot"];
  statInfo: CharacterHexaMatrixStat["hexamatrix_stat"][number]["stat_info"];
};

const HexaStatCoreSection = ({ slot, statInfo }: CoreSectionProps) => {
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-bold">스탯 코어 슬롯 {slot}</h2>
      {statInfo.map((page) => (
        <HexaStatPageCard key={page.page_no} page={page} />
      ))}
    </section>
  );
};

type PageCardProps = {
  page: CoreSectionProps["statInfo"][number];
};

const HexaStatPageCard = ({ page }: PageCardProps) => {
  const isActive = page.activate_flag === "1";

  return (
    <div
      className={cn(
        "space-y-3 rounded-md border p-3 transition-colors",
        isActive
          ? "border-border bg-card/50"
          : "border-border bg-muted/10 opacity-50",
      )}
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold">페이지 {page.page_no}</span>
        {isActive && <Badge>현재 적용 중</Badge>}
      </div>

      <Separator />

      <dl className="space-y-3">
        {/* 메인 스탯 */}
        <div className="space-y-1">
          <p className="text-sm font-bold tracking-wider uppercase">메인스탯</p>
          <InfoRow
            label={page.main_stat}
            variant="between"
            isHighlight={isActive}
            valueClassName="font-semibold"
            isNumeric
          >
            Lv.{page.main_stat_level}
          </InfoRow>
        </div>

        {/* 서브 스탯 */}
        <div className="space-y-1">
          <p className="text-sm font-bold tracking-wider uppercase">서브스탯</p>
          <div className="flex flex-col gap-1">
            <InfoRow
              label={page.sub_1_stat}
              variant="between"
              isHighlight={isActive}
              valueClassName="font-semibold"
              isNumeric
            >
              Lv.{page.sub_1_stat_level}
            </InfoRow>
            <InfoRow
              label={page.sub_2_stat}
              variant="between"
              isHighlight={isActive}
              valueClassName="font-semibold"
              isNumeric
            >
              Lv.{page.sub_2_stat_level}
            </InfoRow>
          </div>
        </div>
      </dl>
    </div>
  );
};
