"use client";

import { Separator } from "@/shared/ui/separator";
import { TabMessageSection } from "@/shared/ui/TabMessageSection";
import { TabLoadingBox } from "../../TabLoadingBox";
import { InfoDescriptionRow } from "@/shared/ui/InfoRow";
import { TabCard } from "@/shared/ui/TabCard";
import { cn } from "@/shared/lib/utils";
import { HEXA_LEVEL_REQUIREMENT } from "@/shared/config/constants/hexa";
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

  if (level < HEXA_LEVEL_REQUIREMENT) {
    return (
      <TabMessageSection
        message={`HEXA 스탯 시스템은 Lv.${HEXA_LEVEL_REQUIREMENT} 이상 이용 가능합니다.`}
      />
    );
  }

  if (isLoading)
    return <TabLoadingBox className="min-h-[499px] wide:min-h-[282px]" />;

  if (isError) return <TabMessageSection error={error} />;

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
    <TabCard title={`스탯 코어 ${slot}`}>
      <div className="wide:flex-row flex flex-col gap-4">
        {statInfo.map((page) => (
          <HexaStatPageCard key={page.page_no} page={page} />
        ))}
      </div>
    </TabCard>
  );
};

type PageCardProps = {
  page: CoreSectionProps["statInfo"][number];
};

const HexaStatPageCard = ({ page }: PageCardProps) => {
  const isActive = page.activate_flag === "1";

  const statGroups = [
    { title: "메인스탯", stats: [[page.main_stat, page.main_stat_level]] },
    {
      title: "서브스탯",
      stats: [
        [page.sub_1_stat, page.sub_1_stat_level],
        [page.sub_2_stat, page.sub_2_stat_level],
      ],
    },
  ] as const;

  return (
    <div
      className={cn(
        "bg-secondary w-full space-y-3 rounded-2xl p-4",
        isActive ? "shadow-sm" : "opacity-40",
      )}
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold">페이지 {page.page_no}</span>
        {isActive && <Badge className="font-medium">현재 적용 중</Badge>}
      </div>

      <Separator />

      {statGroups.map((group) => (
        <div key={group.title} className="space-y-1">
          <p className="text-sm font-bold tracking-wider uppercase">
            {group.title}
          </p>
          <dl className="flex flex-col gap-1">
            {group.stats.map(([name, statLevel]) => (
              <InfoDescriptionRow
                key={name}
                label={name}
                variant="between"
                isHighlight={isActive}
                valueClassName="font-semibold"
                isNumeric
              >
                Lv.{statLevel}
              </InfoDescriptionRow>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
};
