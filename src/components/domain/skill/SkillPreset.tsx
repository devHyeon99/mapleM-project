import { Card, CardContent } from "@/shared/ui/card";
import type { CharacterSkillPreset } from "@/entities/skill/model";

interface SkillPresetProps {
  presets: CharacterSkillPreset[];
}

export const SkillPreset = ({ presets }: SkillPresetProps) => {
  if (!presets || presets.length === 0) {
    return (
      <div className="mt-2 space-y-1">
        <h4 className="font-bold">프리셋</h4>
        <Card className="border-none shadow-none">
          <CardContent className="text-muted-foreground p-4 text-center text-sm">
            프리셋 데이터가 없습니다.
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mt-2 space-y-1">
      <h4 className="font-bold">프리셋</h4>
      {presets.map((preset) => (
        <div
          key={preset.preset_slot_no}
          className="rounded-md border p-2 text-sm"
        >
          <span className="font-bold">
            {preset.preset_slot_no}번 스킬 프리셋
          </span>
          <div className="mt-1 flex flex-col gap-1">
            {[
              preset.skill_name_1,
              preset.skill_name_2,
              preset.skill_name_3,
              preset.skill_name_4,
            ]
              .filter(Boolean)
              .map((skillName, idx) => (
                <span key={idx} className="text-muted-foreground">
                  - {skillName}
                </span>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};
