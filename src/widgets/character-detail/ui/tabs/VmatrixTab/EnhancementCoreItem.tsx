import type { VCoreEquipment } from "@/entities/skill/model/types/vmatrix";

import { CoreLevelInfo } from "./CoreLevelInfo";
import { getEnhancementSkillNames } from "./vmatrix-tab.utils";

interface EnhancementCoreItemProps {
  core: VCoreEquipment;
}

export function EnhancementCoreItem({ core }: EnhancementCoreItemProps) {
  const skillNames = getEnhancementSkillNames(core);

  return (
    <div className="flex flex-col">
      <span className="min-w-0 truncate font-medium" title={core.vcore_name}>
        {core.vcore_name}
      </span>

      <CoreLevelInfo
        vcoreLevel={core.vcore_level}
        slotLevel={core.slot_level}
      />

      <div className="text-muted-foreground space-y-0.5">
        {skillNames.map((skillName, index) => (
          <div key={`${core.slot_id}-${index}-${skillName}`}>
            스킬 {index + 1} - {skillName}
          </div>
        ))}
      </div>
    </div>
  );
}
