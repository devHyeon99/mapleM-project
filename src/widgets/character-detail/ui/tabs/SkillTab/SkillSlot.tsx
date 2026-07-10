import type { CharacterEquipmentSkill } from "@/entities/skill/model";
import { stripSkillLevel } from "@/entities/skill/lib/stripSkillLevel";
import { SkillIconTooltip } from "./SkillIconTooltip";

interface SkillSlotProps {
  skill?: CharacterEquipmentSkill;
}

export const SkillSlot = ({ skill }: SkillSlotProps) => {
  const name = skill ? stripSkillLevel(skill.skill_name) : null;
  const presetNo = name?.match(/^(\d+)번 스킬 프리셋$/)?.[1];

  return (
    <div className="bg-secondary flex h-13 w-13 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 shadow-sm">
      {!skill || !name ? (
        <span className="text-muted-foreground/50 text-xl leading-none">+</span>
      ) : presetNo ? (
        <span className="text-foreground text-center text-xs font-medium">
          {presetNo}번 <br /> 프리셋
        </span>
      ) : (
        <SkillIconTooltip
          src={skill.skill_icon}
          alt={name}
          tooltip={skill.skill_name}
        />
      )}
    </div>
  );
};
