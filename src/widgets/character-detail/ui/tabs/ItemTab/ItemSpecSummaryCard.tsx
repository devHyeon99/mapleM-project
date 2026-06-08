import { useMemo } from "react";
import type { SortedItemSlot } from "@/entities/item";
import { getItemSpec } from "@/entities/item";
import { InfoRow } from "@/shared/ui/InfoRow";
import { Separator } from "@/shared/ui/separator";
import { TabCard } from "@/shared/ui/TabCard";

interface ItemSpecSummaryCardProps {
  items: SortedItemSlot[];
  characterClass: string;
}

export const ItemSpecSummaryCard = ({
  items,
  characterClass,
}: ItemSpecSummaryCardProps) => {
  const itemList = useMemo(() => items.map((slot) => slot.item), [items]);

  const { labelDamage, labelAtk, potential, additional, chuop } = useMemo(
    () => getItemSpec(itemList, characterClass),
    [characterClass, itemList],
  );

  return (
    <TabCard title="장비 스펙 요약" hideSeparator>
      <div className="bg-muted/50 dark:bg-secondary w-full rounded-xl border p-3">
        <div className="relative">
          <Separator
            orientation="vertical"
            className="absolute top-0 bottom-0 left-1/2 hidden -translate-x-1/2 sm:block"
          />

          <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
            <InfoRow
              as="div"
              semantic="description"
              variant="between"
              label={`잠재 (${labelDamage}+보공)`}
              className="text-[13px] md:text-sm"
            >
              <span className="font-medium">{potential.toFixed(2)}%</span>
            </InfoRow>

            <InfoRow
              as="div"
              semantic="description"
              variant="between"
              label={`에디 (${labelDamage}+보공)`}
              className="text-[13px] md:text-sm"
            >
              <span className="font-medium">{additional.toFixed(2)}%</span>
            </InfoRow>

            <InfoRow
              as="div"
              semantic="description"
              variant="between"
              label="추옵 (최종 대미지)"
              className="text-[13px] md:text-sm"
            >
              <span className="font-medium">
                {chuop.finalDamage.toFixed(2)}%
              </span>
            </InfoRow>

            <InfoRow
              as="div"
              semantic="description"
              variant="between"
              label={`추옵 (${labelAtk})`}
              className="text-[13px] md:text-sm"
            >
              <span className="font-medium">
                {chuop.atk.toLocaleString("ko-KR")}
              </span>
            </InfoRow>
          </dl>
        </div>
      </div>
    </TabCard>
  );
};
