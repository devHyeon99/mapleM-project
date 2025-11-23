import type { CharacterSkillPreset } from "@/entities/skill/model";
import { HelpPopover } from "@/shared/ui/HelpPopover";
import { Separator } from "@/shared/ui/separator";
import { TabMessageSection } from "@/shared/ui/TabMessageSection";
import { TooltipProvider } from "@/shared/ui/tooltip";
import { SkillIconTooltip } from "./SkillIconTooltip";

interface SkillPresetProps {
  presets: CharacterSkillPreset[];
}

const PRESET_HELP_ITEMS = [
  {
    title: "스킬 프리셋",
    description:
      "스킬 프리셋 8칸 확장 패치 후 넥슨 API 제공 데이터가 수정되지 않아 현재 패치 전 4칸 밖에 보이지 않습니다.",
  },
] as const;

export const SkillPreset = ({ presets }: SkillPresetProps) => {
  const header = (
    <div className="flex items-center justify-between gap-2">
      <h4 className="font-bold">스킬 프리셋</h4>
      <HelpPopover
        ariaLabel="스킬 프리셋 도움말"
        items={PRESET_HELP_ITEMS}
        iconType="exclamation"
      />
    </div>
  );

  return (
    <div className="flex h-full w-full flex-1 flex-col">
      {header}
      <Separator className="my-2" />
      {!presets || presets.length === 0 ? (
        <TabMessageSection
          message="사용중인 프리셋 데이터가 없습니다."
          className="min-h-none"
        />
      ) : (
        <TooltipProvider delayDuration={200}>
          <div className="grid gap-2 md:grid-cols-2">
            {presets.map((preset) => {
              const skills = [
                { name: preset.skill_name_1, icon: preset.skill_icon_1 },
                { name: preset.skill_name_2, icon: preset.skill_icon_2 },
                { name: preset.skill_name_3, icon: preset.skill_icon_3 },
                { name: preset.skill_name_4, icon: preset.skill_icon_4 },
              ].filter((s) => s.name);

              return (
                <div key={preset.preset_slot_no} className="bg-card">
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
                      <SkillIconTooltip
                        key={idx}
                        src={skill.icon}
                        alt={skill.name}
                        tooltip={skill.name}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </TooltipProvider>
      )}
    </div>
  );
};
