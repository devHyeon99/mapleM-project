import type { LinkSkillPreset } from "@/entities/skill/model";
import { PresetToggle } from "@/shared/ui/PresetToggle";

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
  const presetNos = presets.map((preset) => preset.preset_no);
  const selectedPreset = Number(activePreset);

  return (
    <div className="flex items-center justify-between gap-2">
      <h2 className="font-bold">링크 스킬</h2>

      <PresetToggle
        activePresetNo={usePresetNo}
        presets={presetNos}
        selectedPreset={
          Number.isNaN(selectedPreset) ? undefined : selectedPreset
        }
        onSelectPreset={(preset) => onPresetChange(String(preset))}
        ariaLabel="링크 스킬 프리셋 선택"
      />
    </div>
  );
};
