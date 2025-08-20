import { Fragment } from "react";
import { CharacterItemEquipment } from "@/entities/character";
import { ItemIconBase } from "@/entities/item/ui/ItemIconBase";
import { SpecCardItem } from "../lib/getSortedSpecCardItems";

const isRealItem = (item: SpecCardItem): item is CharacterItemEquipment =>
  !("isPlaceholder" in item);

interface EquipmentGridProps {
  list: SpecCardItem[];
}

export const EquipmentGrid = ({ list }: EquipmentGridProps) => {
  return (
    <div className="bg-muted/50 content-star grid h-full grid-cols-5 items-center gap-1.5 rounded-lg border p-3 sm:grid-cols-4">
      {list.map((item, i) => (
        <Fragment key={i}>
          {/* 아이템 슬롯 */}
          {!isRealItem(item) && item.label === "" ? (
            <div className="border-border bg-muted/20 flex aspect-square w-full items-center justify-center rounded-xs border-2 text-center">
              <span className="text-muted-foreground text-[10px] leading-tight font-semibold select-none sm:text-xs">
                하의
              </span>
            </div>
          ) : (
            <div className="aspect-square">
              {isRealItem(item) ? (
                <ItemIconBase item={item} className="cursor-auto" />
              ) : (
                <div className="border-border bg-muted/20 flex aspect-square w-full items-center justify-center rounded-xs border-2 text-center">
                  <span className="text-muted-foreground text-[10px] leading-tight font-semibold select-none sm:text-xs">
                    {item.label.replace(/\s*\(.*?\)/, "")}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* 모바일(5열) 전용 빈칸 삽입 로직 */}
          {i % 4 === 1 && i !== 21 && (
            <div className="aspect-square sm:hidden" aria-hidden="true" />
          )}
        </Fragment>
      ))}
    </div>
  );
};
