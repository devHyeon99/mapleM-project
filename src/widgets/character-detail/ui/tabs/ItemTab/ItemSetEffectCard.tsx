"use client";

import { useMemo } from "react";
import type { SortedItemSlot } from "@/entities/item";
import {
  ABSOLABS_CORRECTION_NOTE,
  formatEffectValue,
  getActiveEquipmentSets,
} from "@/entities/set-effect";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { Separator } from "@/shared/ui/separator";
import { TabCard } from "@/shared/ui/TabCard";

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
    <TabCard title="장비 세트 효과" hideSeparator>
      <Accordion
        type="multiple"
        className="bg-background dark:bg-secondary w-full"
      >
        {activeSets.map((set) => (
          <AccordionItem key={set.id} value={set.id}>
            <AccordionTrigger className="rounded-none py-3 hover:cursor-pointer hover:text-orange-500 hover:no-underline">
              <div className="space-y-1">
                <p className="font-semibold">{set.displayName} 세트 효과</p>
                <p className="text-muted-foreground text-xs font-medium md:text-[13px]">
                  {set.count}세트
                  {set.appliedStarForceThreshold
                    ? ` + ${set.appliedStarForceThreshold}성`
                    : ""}
                </p>
                {set.correctedFromArcaneShade ? (
                  <p className="text-muted-foreground text-xs font-medium">
                    {ABSOLABS_CORRECTION_NOTE}
                  </p>
                ) : null}
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
                      className="flex items-center justify-between py-0.5 text-[13px] md:text-sm"
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
    </TabCard>
  );
};
