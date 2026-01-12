"use client";

import { useCharacterVmatrix } from "@/entities/skill/model/hooks/useCharacterVmatrix";
import { LoadingCard } from "@/shared/ui/LoadingCard";
import { TabMessageSection } from "@/shared/ui/TabMessageSection";
import { CHARACTER_TAB_LOADING_MESSAGE } from "../loading";

import { CoreList } from "./CoreList";
import { EnhancementCoreItem } from "./EnhancementCoreItem";
import { SkillCoreItem } from "./SkillCoreItem";
import { VmatrixSection } from "./VmatrixSection";
import { groupCoresByType } from "./vmatrix-tab.utils";

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

  if (isLoading) return <LoadingCard message={CHARACTER_TAB_LOADING_MESSAGE} />;

  if (isError) {
    return (
      <div
        role="alert"
        className="rounded-md border border-red-200 p-3 text-sm text-red-500"
      >
        오류 발생: {(error as Error).message}
      </div>
    );
  }

  const cores = data?.character_v_core_equipment ?? [];

  if (cores.length === 0) {
    return (
      <TabMessageSection
        message={`API 업데이트 이후 접속 기록이 없거나\n장착한 V매트릭스가 없습니다.`}
      />
    );
  }

  const { skillCores, enhancementCores, unknownCores } =
    groupCoresByType(cores);

  return (
    <div className="space-y-2">
      <VmatrixSection title="스킬 코어">
        {skillCores.length > 0 ? (
          <CoreList
            items={skillCores}
            renderItem={(core) => <SkillCoreItem core={core} />}
          />
        ) : (
          <TabMessageSection
            className="min-h-0"
            message="장착된 스킬 코어가 없습니다."
          />
        )}
      </VmatrixSection>

      <VmatrixSection title="강화 코어">
        {enhancementCores.length > 0 ? (
          <CoreList
            items={enhancementCores}
            className="flex flex-col gap-2"
            renderItem={(core) => <EnhancementCoreItem core={core} />}
          />
        ) : (
          <TabMessageSection
            className="min-h-0"
            message="장착된 강화 코어가 없습니다."
          />
        )}
      </VmatrixSection>

      {unknownCores.length > 0 ? (
        <VmatrixSection title="기타 코어">
          <CoreList
            items={unknownCores}
            renderItem={(core) => <SkillCoreItem core={core} />}
          />
        </VmatrixSection>
      ) : null}
    </div>
  );
};
