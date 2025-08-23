import type { CharacterEquipmentSkill } from "@/entities/skill/model";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/tooltip";

interface SkillSlotProps {
  skill?: CharacterEquipmentSkill;
  isValidSlot: boolean; // 슬롯 자체가 존재하는지 여부 (레이아웃상 구멍인지)
}

export const SkillSlot = ({ skill, isValidSlot }: SkillSlotProps) => {
  // 레이아웃상 비어있는 공간 (투명한 공간)
  if (!isValidSlot) {
    return <div className="h-16 w-16" />;
  }

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
        // 프리셋 스킬 (텍스트 렌더링) - 유저 스타일 적용됨
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
