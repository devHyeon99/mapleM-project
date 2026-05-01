import { CharacterItemEquipment } from "../model/types";
import { ItemAdditionalOption } from "./ItemAdditionalOption";
import { ItemAdditionalPotential } from "./ItemAdditionalPotential";
import { ItemBaseOption } from "./ItemBaseOption";
import { ItemDescription } from "./ItemDescription";
import { ItemEmblem } from "./ItemEmblem";
import { ItemHeader } from "./ItemHeader";
import { ItemInfo } from "./ItemInfo";
import { ItemPotential } from "./ItemPotential";
import { ItemSoul } from "./ItemSoul";
import { ItemStarforce } from "./ItemStarforce";

interface ItemDetailsProps {
  item: CharacterItemEquipment;
}

/**
 * 장비 아이템 상세에 들어가는 항목과 순서
 * 각 섹션은 표시할 값이 없으면 스스로 null을 반환한다.
 */
export const ItemDetails = ({ item }: ItemDetailsProps) => (
  <>
    <ItemHeader item={item} />
    <ItemStarforce item={item} />
    <ItemInfo item={item} />
    <ItemBaseOption item={item} />
    <ItemAdditionalOption item={item} />
    <ItemPotential item={item} />
    <ItemAdditionalPotential item={item} />
    <ItemSoul item={item} />
    <ItemEmblem item={item} />
    <ItemDescription item={item} />
  </>
);
