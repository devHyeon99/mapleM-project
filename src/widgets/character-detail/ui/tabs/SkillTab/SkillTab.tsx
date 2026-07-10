"use client";

import { useState } from "react";
import { useCharacterSkillEquipment } from "@/entities/skill/model/hooks/useCharacterSkillEquipment";
import { TabMessageSection } from "@/shared/ui/TabMessageSection";
import { TabCard } from "@/shared/ui/TabCard";
import { HelpPopover } from "@/shared/ui/HelpPopover";
import { TooltipProvider } from "@/shared/ui/tooltip";
import { TabLoadingBox } from "../../TabLoadingBox";

import { EQUIPPED_SKILL_HELP_ITEMS, SkillTabHeader } from "./SkillTabHeader";
import { SkillPreset } from "./SkillPreset";
import { SkillGridDisplay } from "./SkillGridDisplay";
import { SkillListCard } from "./SkillListCard";

interface SkillTabProps {
  ocid: string;
}

const stealSlotLabel = (slot: string) => {
  const slotNumber = Number(slot);

  return Number.isFinite(slotNumber)
    ? `${slotNumber + 1}번 슬롯`
    : `${slot} 슬롯`;
};

export const SkillTab = ({ ocid }: SkillTabProps) => {
  const { data, isLoading, isError, error } = useCharacterSkillEquipment(ocid);
  const [setNo, setSetNo] = useState(1);

  if (isLoading)
    return <TabLoadingBox className="min-h-[794px] md:min-h-[305px]" />;

  if (isError) return <TabMessageSection error={error} />;

  if (!data?.skill) {
    return (
      <TabMessageSection
        message={`캐릭터가 접속한 기록이 없어 스킬 데이터를 불러올 수 없습니다.`}
      />
    );
  }

  const equipmentSkills = data.skill.equipment_skill ?? [];
  const presets = data.skill.preset ?? [];
  const stealSkills = data.skill.steal_skill ?? [];
  const stellaMemorizeSkills = data.skill.stella_memorize ?? [];

  if (
    equipmentSkills.length === 0 &&
    presets.length === 0 &&
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
    <TooltipProvider delayDuration={200}>
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
            {equipmentSkills.length > 0 ? (
              <>
                <SkillTabHeader selectedSet={setNo} onSetChange={setSetNo} />
                <SkillGridDisplay
                  key={setNo}
                  setNo={setNo}
                  skills={equipmentSkills.filter(
                    (skill) => skill.equipment_skill_set === setNo,
                  )}
                />
              </>
            ) : (
              <TabMessageSection
                message="장착한 스킬이 없습니다."
                className="min-h-none"
              />
            )}
          </TabCard>

          <SkillPreset presets={presets} />
        </div>

        <SkillListCard
          title="스틸 스킬"
          items={stealSkills.map((skill) => ({
            icon: skill.skill_icon,
            label: stealSlotLabel(skill.skill_slot),
            name: skill.skill_name,
          }))}
        />
        <SkillListCard
          title="스텔라 메모라이즈"
          items={stellaMemorizeSkills.map((skill) => ({
            icon: skill.skill_icon,
            label: `${skill.equipment_skill_set}번 프리셋`,
            name: skill.skill_name,
          }))}
        />
      </div>
    </TooltipProvider>
  );
};
