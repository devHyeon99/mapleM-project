import type { ActiveEquipmentSet } from "@/entities/set-effect";

import { ItemSetEffectDialog } from "./ItemSetEffectDialog";
import { SetEffectTrigger } from "./SetEffectTrigger";

interface ItemSetEffectListProps {
  sets: ActiveEquipmentSet[];
}

export const ItemSetEffectList = ({ sets }: ItemSetEffectListProps) => {
  return (
    <ul className="flex w-full flex-col gap-1.5">
      {sets.map((set) => (
        <li key={set.id}>
          <ItemSetEffectDialog
            set={set}
            trigger={
              <SetEffectTrigger
                name={set.displayName}
                count={set.count}
                starForce={set.appliedStarForceThreshold}
              />
            }
          />
        </li>
      ))}
    </ul>
  );
};
