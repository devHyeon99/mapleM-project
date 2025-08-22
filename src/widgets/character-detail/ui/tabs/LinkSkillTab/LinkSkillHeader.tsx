import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group";
import type { LinkSkillPreset } from "@/entities/skill/model";

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
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-0.5">
        <h3 className="font-bold">링크스킬</h3>
        <p className="text-muted-foreground text-sm">
          {usePresetNo}페이지 장착중
        </p>
      </div>

      <ToggleGroup
        type="single"
        variant="outline"
        value={activePreset}
        onValueChange={(val) => {
          if (val) onPresetChange(val);
        }}
      >
        {presets.map((preset) => (
          <ToggleGroupItem
            key={preset.preset_no}
            value={preset.preset_no.toString()}
            className="h-8 w-8 p-0"
          >
            {preset.preset_no}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};
