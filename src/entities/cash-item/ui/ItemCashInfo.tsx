import { CashItemEquipment } from "@/entities/cash-item";
import { ItemOptionRow } from "@/shared/ui/ItemOptionRow";

interface Props {
  item: CashItemEquipment;
}

const MUTED_LABEL = "text-game-muted";
const HIGHLIGHT_VALUE = "text-orange-400";

export const ItemCashInfo = ({ item }: Props) => {
  return (
    <div className="border-game-line border-b py-1 text-sm">
      <p className="font-medium">아이템 정보</p>
      <dl className="flex flex-col">
        <ItemOptionRow
          label="분류"
          value={item.cash_item_equipment_page_name}
          labelClassName={MUTED_LABEL}
          valueClassName={HIGHLIGHT_VALUE}
        />
        <ItemOptionRow
          label="성별"
          value={item.cash_item_gender}
          labelClassName={MUTED_LABEL}
          valueClassName={HIGHLIGHT_VALUE}
        />
        <ItemOptionRow
          label="라벨"
          value={item.cash_item_label ?? "없음"}
          labelClassName={MUTED_LABEL}
          valueClassName={HIGHLIGHT_VALUE}
        />
      </dl>
    </div>
  );
};
