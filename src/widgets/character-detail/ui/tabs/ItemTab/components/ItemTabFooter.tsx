import { SortedItemSlot } from "@/entities/item";
import { getItemSpec } from "@/entities/item/lib/getItemSpec";
import { InfoRow } from "@/shared/ui/InfoRow";

interface ItemTabFooterProps {
  items: SortedItemSlot[];
  characterClass: string;
}

export const ItemTabFooter = ({
  items,
  characterClass,
}: ItemTabFooterProps) => {
  const hasNoEquipItems = items.every((slot) => {
    if (slot.slotName === "안드로이드" || slot.slotName === "하트") {
      return true;
    }
    return slot.item === null;
  });

  if (hasNoEquipItems) {
    return null;
  }

  const itemList = items.map((slot) => slot.item);

  const { labelDamage, labelAtk, potential, additional, chuop } = getItemSpec(
    itemList,
    characterClass,
  );

  return (
    <div className="bg-muted/50 grid w-full grid-cols-2 gap-x-4 gap-y-1 rounded-xs border-2 p-3 text-sm">
      <span className="sr-only">아이템 스펙 요약</span>

      <span className="text-foreground col-span-2 mb-1 font-bold">TOTAL</span>

      <InfoRow className="justify-between" label={`잠재 (${labelDamage}+보공)`}>
        <span className="font-medium">{potential.toFixed(2)}%</span>
      </InfoRow>

      <InfoRow className="justify-between" label={`에디 (${labelDamage}+보공)`}>
        <span className="font-medium">{additional.toFixed(2)}%</span>
      </InfoRow>

      <InfoRow className="justify-between" label="추옵 (최종 대미지)">
        <span className="font-medium">{chuop.finalDamage.toFixed(2)}%</span>
      </InfoRow>

      <InfoRow className="justify-between" label="추옵 (방어율 무시)">
        <span className="font-medium">{chuop.ignoreDef.toFixed(2)}%</span>
      </InfoRow>

      <InfoRow className="justify-between" label={`추옵 (${labelAtk})`}>
        <span className="font-bold">{chuop.atk.toLocaleString()}</span>
      </InfoRow>
    </div>
  );
};
