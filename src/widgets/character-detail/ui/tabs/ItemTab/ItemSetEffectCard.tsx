"use client";

import { useMemo } from "react";
import type { SortedItemSlot } from "@/entities/item/lib/slots/sortItemSlots";
import { formatEffectValue } from "@/entities/set-effect/lib/formatEffectValue";
import { getActiveEquipmentSets } from "@/entities/set-effect/lib/getActiveEquipmentSets";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { Separator } from "@/shared/ui/separator";
import Link from "next/link";

interface ItemSetEffectCardProps {
  items: SortedItemSlot[];
}

export const ItemSetEffectCard = ({ items }: ItemSetEffectCardProps) => {
  const activeSets = useMemo(() => {
    return getActiveEquipmentSets(items.map((slot) => slot.item)).filter(
      (set) => set.combinedEffects.length > 0,
    );
  }, [items]);

  if (activeSets.length === 0) {
    return null;
  }

  return (
    <section className="bg-card flex w-full flex-col rounded-xs p-4 pt-0">
      <div className="flex items-center justify-between pb-2">
        <span className="text-foreground font-bold">장비 세트 효과</span>
        <Link
          className="hover:bg-accent rounded-sm p-2 text-sm font-semibold transition-colors duration-150"
          prefetch={false}
          href="/tools"
        >
          세트 옵션 계산
        </Link>
      </div>

      <Accordion
        type="multiple"
        className="bg-background dark:bg-secondary w-full rounded-xs border"
      >
        {activeSets.map((set) => (
          <AccordionItem
            key={set.id}
            value={set.id}
            className="rounded-none border-0 px-3"
          >
            <AccordionTrigger className="rounded-none py-3 hover:cursor-pointer hover:text-orange-500 hover:no-underline">
              <div className="space-y-1">
                <p className="font-semibold">{set.displayName} 세트 효과</p>
                <p className="text-muted-foreground text-xs font-medium">
                  {set.count}세트
                  {set.appliedStarForceThreshold
                    ? ` + ${set.appliedStarForceThreshold}성`
                    : ""}
                </p>
              </div>
            </AccordionTrigger>

            <AccordionContent className="pt-1 pb-3">
              <div className="relative">
                <Separator
                  orientation="vertical"
                  className="absolute top-0 bottom-0 left-1/2 hidden -translate-x-1/2 sm:block"
                />

                <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                  {set.combinedEffects.map((effect) => (
                    <li
                      key={effect.key}
                      className="flex items-center justify-between py-0.5 text-xs md:text-sm"
                    >
                      <span className="text-muted-foreground">
                        {effect.label}
                      </span>
                      <span className="font-medium">
                        {formatEffectValue(effect.value, effect.unit)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
