import type { VCoreEquipment } from "@/entities/skill";

import { format2 } from "./vmatrix-tab.utils";

interface CoreLevelInfoProps {
  vcoreLevel: VCoreEquipment["vcore_level"];
  slotLevel: VCoreEquipment["slot_level"];
}

export function CoreLevelInfo({ vcoreLevel, slotLevel }: CoreLevelInfoProps) {
  return (
    <dl className="text-muted-foreground flex shrink-0 gap-3">
      <div>
        <dt className="inline">스킬레벨</dt>
        <dd className="ml-1.5 inline text-orange-400">{format2(vcoreLevel)}</dd>
      </div>
      <div>
        <dt className="inline">슬롯레벨</dt>
        <dd className="ml-1.5 inline text-orange-400">{format2(slotLevel)}</dd>
      </div>
    </dl>
  );
}
