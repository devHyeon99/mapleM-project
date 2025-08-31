"use client";

import { Separator } from "@/shared/ui/separator";
import { LoadingCard } from "@/shared/ui/LoadingCard";
import { TabMessageSection } from "@/shared/ui/TabMessageSection";
import { cn } from "@/shared/lib/utils";
import { useCharacterHexaMatrixStat } from "@/entities/character";
import type { CharacterHexaMatrixStat } from "@/entities/character";

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
      <TabMessageSection message="HEXA 스탯은 Lv.250 이상 이용 가능합니다." />
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
    <div className="space-y-6 rounded-md border p-3 text-sm">
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
      <h2 className="text-base font-semibold">스탯 코어 슬롯 {slot}</h2>

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
        "space-y-2 rounded-md border p-3 transition-colors",
        isActive ? "border-border bg-card" : "border-border opacity-60",
      )}
    >
      {/* 헤더 */}
      <div className="mb-1 flex items-center justify-between">
        <span className="font-medium">페이지 {page.page_no}</span>
        <span
          className={cn(
            "ml-1 text-xs font-semibold",
            isActive ? "text-primary" : "text-muted-foreground font-normal",
          )}
        >
          {isActive && "장착중"}
        </span>
      </div>

      <Separator />

      {/* 메인 스탯 */}
      <div>
        <p className="mb-1 text-sm font-semibold">메인스탯</p>
        <StatRow name={page.main_stat} level={page.main_stat_level} />
      </div>

      {/* 서브 스탯 */}
      <div>
        <p className="mb-1 text-sm font-semibold">서브스탯</p>
        <StatRow name={page.sub_1_stat} level={page.sub_1_stat_level} />
        <StatRow name={page.sub_2_stat} level={page.sub_2_stat_level} />
      </div>
    </div>
  );
};

const StatRow = ({ name, level }: { name: string; level: number }) => {
  return (
    <div className="text-muted-foreground flex justify-between">
      <span className="font-semibold">{name}</span>
      <span className="font-semibold text-[#FF7E54]">Lv.{level}</span>
    </div>
  );
};
