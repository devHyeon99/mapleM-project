import type { VCoreEquipment } from "@/entities/skill/model/types/vmatrix";

import { getCoreName } from "./vmatrix-tab.utils";

interface CoreItemProps {
  core: VCoreEquipment;
}

export function CoreItem({ core }: CoreItemProps) {
  const name = getCoreName(core);

  return (
    <li className="flex items-start justify-between gap-3 text-sm font-medium">
      <span
        className="text-muted-foreground min-w-0 flex-1 truncate"
        title={name}
      >
        {name}
      </span>

      <dl className="shrink-0 text-orange-400">
        <dt className="inline">Lv.</dt>
        <dd className="ml-0.5 inline">
          {String(core.vcore_level).padStart(2, "0")}
        </dd>
      </dl>
    </li>
  );
}
