import type { LinkSkillPreset } from "@/entities/skill/model";
import { SegmentedToggle } from "@/shared/ui/SegmentedToggle";

interface LinkSkillHeaderProps {
  usePresetNo: number;
  activePreset: string;
  presets: LinkSkillPreset[];
  onPresetChange: (val: string) => void;
}

export const LinkSkillHeader = ({
  usePresetNo,
  activePreset,
  presets,
  onPresetChange,
}: LinkSkillHeaderProps) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <h3 className="font-bold">링크 스킬</h3>

      <SegmentedToggle
        ariaLabel="링크 스킬 프리셋 선택"
        value={Number(activePreset)}
        onChange={(preset) => onPresetChange(String(preset))}
        options={presets.map(({ preset_no }) => ({
          value: preset_no,
          marked: preset_no === usePresetNo,
        }))}
      />
    </div>
  );
};
