import type { PetSetOption } from "@/entities/character";

import { PetSetOptionDialog } from "./PetSetOptionDialog";
import { SetEffectTrigger } from "./SetEffectTrigger";

interface PetSetOptionListProps {
  setOptions: PetSetOption[];
}

export const PetSetOptionList = ({ setOptions }: PetSetOptionListProps) => {
  return (
    <ul className="flex w-full flex-col gap-1.5">
      {setOptions.map((set) => (
        <li key={set.set_name}>
          <PetSetOptionDialog
            set={set}
            trigger={
              <SetEffectTrigger
                name={set.set_name}
                count={set.set_count}
              />
            }
          />
        </li>
      ))}
    </ul>
  );
};
