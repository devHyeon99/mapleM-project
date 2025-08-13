import { CashItemEquipment } from "@/entities/cash-item";

interface Props {
  item: CashItemEquipment;
}

export const ItemCashInfo = ({ item }: Props) => {
  return (
    <div className="border-b py-2 text-sm">
      <p>아이템 정보</p>
      <dl>
        <div className="flex justify-between">
          <div className="flex gap-1">
            <dt>분류</dt>
            <dd className="text-[#FF8939]">
              {item.cash_item_equipment_page_name}
            </dd>
          </div>
          <div className="flex gap-1">
            <dt>성별</dt>
            <dd className="text-[#FF8939]">{item.cash_item_gender}</dd>
          </div>
          <div className="flex gap-1">
            <dt>라벨</dt>
            <dd className="text-[#FF8939]">{item.cash_item_label ?? "없음"}</dd>
          </div>
        </div>
      </dl>
    </div>
  );
};
