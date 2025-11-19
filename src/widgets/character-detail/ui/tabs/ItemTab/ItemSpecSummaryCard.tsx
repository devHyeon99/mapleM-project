import { SortedItemSlot } from "@/entities/item";
import { getItemSpec } from "@/entities/item/lib";
import { InfoRow } from "@/shared/ui/InfoRow";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { Separator } from "@/shared/ui/separator";

interface ItemSpecSummaryCardProps {
  items: SortedItemSlot[];
  presetNo: number;
  characterClass: string;
}

export const ItemSpecSummaryCard = ({
  items,
  presetNo,
  characterClass,
}: ItemSpecSummaryCardProps) => {
  const itemList = items.map((slot) => slot.item);

  const { labelDamage, labelAtk, potential, additional, chuop } = getItemSpec(
    itemList,
    characterClass,
  );

  return (
    <section className="bg-card flex w-full flex-col rounded-xs p-4">
      <h3 className="text-foreground mb-4 font-bold">장비 스펙 요약</h3>
      <Accordion
        type="single"
        collapsible
        defaultValue="spec-summary"
        className="bg-background dark:bg-secondary w-full rounded-xs border"
      >
        <AccordionItem value="spec-summary" className="rounded-none px-3">
          <AccordionTrigger className="group rounded-none py-3 hover:cursor-pointer hover:no-underline">
            <div className="space-y-1">
              <p className="text-foreground font-semibold transition-colors group-hover:text-orange-500">
                장비 스펙 능력치
              </p>
              <p className="text-muted-foreground text-xs font-medium">
                장비 프리셋 {presetNo}
              </p>
            </div>
          </AccordionTrigger>

          <AccordionContent className="pt-1 pb-3">
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
                  className="text-xs md:text-sm"
                >
                  <span className="font-medium">{potential.toFixed(2)}%</span>
                </InfoRow>

                <InfoRow
                  as="div"
                  semantic="description"
                  variant="between"
                  label={`에디 (${labelDamage}+보공)`}
                  className="text-xs md:text-sm"
                >
                  <span className="font-medium">{additional.toFixed(2)}%</span>
                </InfoRow>

                <InfoRow
                  as="div"
                  semantic="description"
                  variant="between"
                  label="추옵 (최종 대미지)"
                  className="text-xs md:text-sm"
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
                  className="text-xs md:text-sm"
                >
                  <span className="font-medium">
                    {chuop.atk.toLocaleString()}
                  </span>
                </InfoRow>
              </dl>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};
