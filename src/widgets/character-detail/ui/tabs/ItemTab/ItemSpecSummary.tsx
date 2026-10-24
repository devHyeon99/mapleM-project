import { useMemo } from "react";
import type { SortedItemSlot } from "@/entities/item";
import { getItemSpec } from "@/entities/item";

interface ItemSpecSummaryProps {
  items: SortedItemSlot[];
  characterClass: string;
}

export const ItemSpecSummary = ({
  items,
  characterClass,
}: ItemSpecSummaryProps) => {
  const itemList = useMemo(() => items.map((slot) => slot.item), [items]);

  const { labelDamage, labelAtk, potential, additional, chuop } = useMemo(
    () => getItemSpec(itemList, characterClass),
    [characterClass, itemList],
  );

  const stats = [
    { label: `잠재 · ${labelDamage}+보공`, value: `${potential.toFixed(2)}%` },
    { label: `에디 · ${labelDamage}+보공`, value: `${additional.toFixed(2)}%` },
    {
      label: "추옵 · 최종 대미지",
      value: `${chuop.finalDamage.toFixed(2)}%`,
    },
    { label: `추옵 · ${labelAtk}`, value: chuop.atk.toLocaleString("ko-KR") },
  ];

  return (
    <dl className="grid grid-cols-2 gap-1.5">
      {stats.map(({ label, value }) => (
        <div key={label} className="bg-muted/60 rounded-lg px-3 py-2">
          <dt className="text-muted-foreground truncate text-xs">{label}</dt>
          <dd className="mt-0.5 text-[15px] font-semibold tabular-nums">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
};
