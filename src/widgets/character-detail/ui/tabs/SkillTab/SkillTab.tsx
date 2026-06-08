"use client";

import { TabMessageSection } from "@/shared/ui/TabMessageSection";
import { TabCard } from "@/shared/ui/TabCard";

import { useSkillTab } from "./useSkillTab";
import { EQUIPPED_SKILL_HELP_ITEMS, SkillTabHeader } from "./SkillTabHeader";
import { HelpPopover } from "@/shared/ui/HelpPopover";
import { SkillPreset } from "./SkillPreset";
import { SkillGridDisplay } from "./SkillGridDisplay";
import { StealSkillCard } from "./StealSkillCard";
import { StellaMemorizeCard } from "./StellaMemorizeCard";
import { TabLoadingBox } from "../../TabLoadingBox";

interface SkillTabProps {
  ocid: string;
}

export const SkillTab = ({ ocid }: SkillTabProps) => {
  const { query, ui, layout } = useSkillTab(ocid);

  if (query.isLoading)
    return <TabLoadingBox className="min-h-[790px] md:min-h-[309px]" />;

  if (query.isError) {
    return (
      <div className="p-4 text-sm text-red-500">
        오류 발생: {(query.error as Error).message}
      </div>
    );
  }

  if (!query.data || !query.data.skill) {
    return (
      <TabMessageSection
        message={`캐릭터가 접속한 기록이 없어 스킬 데이터를 불러올 수 없습니다.`}
      />
    );
  }

  const stealSkills = query.data.skill.steal_skill ?? [];
  const stellaMemorizeSkills = query.data.skill.stella_memorize ?? [];

  if (
    !layout.hasEquipment &&
    !layout.hasPreset &&
    stealSkills.length === 0 &&
    stellaMemorizeSkills.length === 0
  ) {
    return (
      <TabMessageSection
        message={`API 업데이트 이후 접속 기록이 없거나\n장착한 스킬 정보가 없습니다.`}
      />
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 md:flex-row md:items-stretch">
        <TabCard
          title="장착 스킬"
          className="min-w-0 flex-1 basis-0"
          action={
            <HelpPopover
              ariaLabel="장착 스킬 도움말"
              items={EQUIPPED_SKILL_HELP_ITEMS}
              iconType="exclamation"
            />
          }
        >
          {layout.hasEquipment && (
            <>
              <SkillTabHeader
                selectedMode={ui.mode}
                onModeChange={ui.setMode}
                selectedSet={ui.setNo}
                onSetChange={ui.setSetNo}
                skillSetKeys={layout.skillSetKeys}
              />

              {layout.hasSetData ? (
                <SkillGridDisplay
                  key={`${ui.mode}-${ui.setNo}`}
                  setNo={Number(ui.setNo)}
                  mode={layout.modeNumber}
                  skills={layout.currentSetSkills}
                />
              ) : (
                <TabMessageSection
                  message={`${ui.mode}타입에 대한 스킬 세팅이 없습니다.`}
                  className="min-h-none mt-2"
                />
              )}
            </>
          )}
        </TabCard>
        <SkillPreset presets={query.data.skill.preset} />
      </div>

      <StealSkillCard skills={stealSkills} />
      <StellaMemorizeCard skills={stellaMemorizeSkills} />
    </div>
  );
};
