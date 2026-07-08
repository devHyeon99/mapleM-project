"use client";

import { useCharacterVmatrix } from "@/entities/skill/model/hooks/useCharacterVmatrix";
import { TabCard } from "@/shared/ui/TabCard";
import { TabMessageSection } from "@/shared/ui/TabMessageSection";
import { TabLoadingBox } from "../../TabLoadingBox";

import { CoreItem } from "./CoreItem";
import { groupCoresByType, isEquipped } from "./vmatrix-tab.utils";

interface VmatrixTabProps {
  ocid: string;
  level: number;
}

const VMATRIX_MIN_LEVEL = 200;

export const VmatrixTab = ({ ocid, level }: VmatrixTabProps) => {
  const { data, isLoading, isError, error } = useCharacterVmatrix(ocid, level);

  if (level < VMATRIX_MIN_LEVEL) {
    return (
      <TabMessageSection
        message={`V매트릭스 시스템은 Lv.${VMATRIX_MIN_LEVEL} 이상 이용 가능합니다.`}
      />
    );
  }

  if (isLoading) return <TabLoadingBox className="min-h-[1467px]" />;

  if (isError) {
    return (
      <div role="alert" className="p-3 text-sm text-red-500">
        오류 발생: {(error as Error).message}
      </div>
    );
  }

  const cores = (data?.character_v_core_equipment ?? []).filter(isEquipped);

  if (cores.length === 0) {
    return (
      <TabMessageSection
        message={`API 업데이트 이후 접속 기록이 없거나\n장착한 V매트릭스가 없습니다.`}
      />
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {groupCoresByType(cores).map(({ label, cores: groupCores }) => (
        <TabCard key={label} title={label}>
          <ul className="space-y-1">
            {groupCores.map((core, index) => (
              <CoreItem key={index} core={core} />
            ))}
          </ul>
        </TabCard>
      ))}
    </div>
  );
};
