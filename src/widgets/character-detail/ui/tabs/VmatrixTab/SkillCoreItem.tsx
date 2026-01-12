import type { VCoreEquipment } from "@/entities/skill/model/types/vmatrix";

import { CoreLevelInfo } from "./CoreLevelInfo";

interface SkillCoreItemProps {
  core: VCoreEquipment;
}

export function SkillCoreItem({ core }: SkillCoreItemProps) {
  return (
    <div className="flex items-start justify-between">
      <span className="min-w-0 flex-1 truncate" title={core.vcore_name}>
        {core.vcore_name}
      </span>
      <CoreLevelInfo
        vcoreLevel={core.vcore_level}
        slotLevel={core.slot_level}
      />
    </div>
  );
}
