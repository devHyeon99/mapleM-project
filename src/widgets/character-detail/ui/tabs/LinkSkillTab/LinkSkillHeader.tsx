import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group";
import type { LinkSkillPreset } from "@/entities/skill/model";
import { Badge } from "@/shared/ui/badge";

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
      <div className="flex flex-row items-center gap-2">
        <h2 className="font-bold">링크 스킬</h2>
        <Badge className="text-xs">{usePresetNo}페이지 장착 중</Badge>
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
            className="h-8 w-8 first:rounded-l-sm last:rounded-r-sm"
          >
            {preset.preset_no}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};
