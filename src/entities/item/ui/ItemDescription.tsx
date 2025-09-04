import { CharacterItemEquipment } from "@/entities/item";

interface Props {
  item: CharacterItemEquipment;
}

export const ItemDescription = ({ item }: Props) => {
  if (!item.item_description) return null;

  return (
    <section className="border-divider border-b py-1 text-sm">
      <h3 className="sr-only">아이템 설명</h3>
      <p className="whitespace-pre-line">{item.item_description}</p>
    </section>
  );
};
