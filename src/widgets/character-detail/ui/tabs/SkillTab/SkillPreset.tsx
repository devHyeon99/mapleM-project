import type { CharacterSkillPreset } from "@/entities/skill/model";
import { Separator } from "@/shared/ui/separator";
import { TabMessageSection } from "@/shared/ui/TabMessageSection";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/tooltip";

interface SkillPresetProps {
  presets: CharacterSkillPreset[];
}

export const SkillPreset = ({ presets }: SkillPresetProps) => {
  if (!presets || presets.length === 0) {
    return (
      <>
        <h4 className="font-bold">스킬 프리셋</h4>
        <Separator className="my-2" />
        <TabMessageSection
          message="사용중인 프리셋 데이터가 없습니다."
          className="min-h-none"
        />
      </>
    );
  }

  return (
    <TooltipProvider delayDuration={200}>
      <div className="space-y-4">
        <div>
          <h4 className="font-bold">스킬 프리셋</h4>
          <Separator className="my-2" />
        </div>
        <div className="grid gap-2 md:grid-cols-2">
          {presets.map((preset) => {
            const skills = [
              { name: preset.skill_name_1, icon: preset.skill_icon_1 },
              { name: preset.skill_name_2, icon: preset.skill_icon_2 },
              { name: preset.skill_name_3, icon: preset.skill_icon_3 },
              { name: preset.skill_name_4, icon: preset.skill_icon_4 },
            ].filter((s) => s.name);

            return (
              <div
                key={preset.preset_slot_no}
                className="bg-card rounded-md border p-3"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {preset.preset_slot_no}번 스킬 프리셋
                  </span>
                  {preset.preset_command_flag === "활성화" && (
                    <span className="bg-primary/10 text-primary rounded px-1.5 py-0.5 text-[10px] font-semibold">
                      커맨드 ON
                    </span>
                  )}
                </div>

                <div className="grid w-fit grid-cols-4 gap-2">
                  {skills.map((skill, idx) => (
                    <Tooltip key={idx}>
                      <TooltipTrigger asChild>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className="h-8 w-8 object-contain"
                          loading="lazy"
                        />
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="text-xs">
                        {skill.name}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
};
