import { CharacterItemEquipment } from "@/types/character";
import { getStarRows } from "@/utils/getStarforce";
import { StarIcon } from "@/components/common/StarIcon";

interface Props {
  item: CharacterItemEquipment;
}

export const ItemStarforce = ({ item }: Props) => {
  const starRows = getStarRows(item.starforce_upgrade);
  if (starRows.length === 0) return null;

  return (
    <div className="border-b pb-2 text-sm">
      <div className="flex items-center gap-1">
        <p className="font-bold">스타포스</p>
        <span className="text-muted-foreground text-xs font-semibold">
          ({item.starforce_upgrade}성)
        </span>
      </div>

      <div aria-label={`스타포스 ${item.starforce_upgrade}성`}>
        {starRows.map((rowGroups, rowIdx) => (
          <div key={rowIdx} className="flex items-center gap-1">
            {rowGroups.map((countInGroup, groupIdx) => (
              <div key={groupIdx} className="flex items-center">
                {Array.from({ length: countInGroup }).map((_, i) => (
                  <StarIcon key={i} size={12} />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
