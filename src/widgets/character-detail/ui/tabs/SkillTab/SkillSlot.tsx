import type { CharacterEquipmentSkill } from "@/entities/skill/model";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/tooltip";

interface SkillSlotProps {
  skill?: CharacterEquipmentSkill;
}

export const SkillSlot = ({ skill }: SkillSlotProps) => {
  // 스킬 데이터 분석 (프리셋 여부 확인)
  const isPresetSkill = skill?.skill_name.includes("스킬 프리셋");
  const presetNumber = isPresetSkill
    ? skill?.skill_name.match(/(\d+번)/)?.[0]?.replace("번", "") || "P"
    : null;

  return (
    <div className="bg-secondary relative flex h-13 w-13 items-center justify-center overflow-hidden rounded-full border-2 shadow-sm">
      {!skill ? (
        // 슬롯은 있는데 장착된 스킬이 없음
        <span className="text-muted-foreground text-xs font-medium">
          빈 슬롯
        </span>
      ) : isPresetSkill ? (
        // 프리셋 스킬 (텍스트 렌더링)
        <span className="text-foreground text-center text-xs font-medium">
          {presetNumber}번 <br /> 프리셋
        </span>
      ) : (
        // 일반 스킬 (이미지 렌더링)
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={skill.skill_icon}
                alt={skill.skill_name}
                loading="lazy"
                className="h-8 w-8 object-contain"
              />
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              <p>{skill.skill_name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};
