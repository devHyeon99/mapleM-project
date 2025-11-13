import { CashItemEquipment } from "@/entities/cash-item";

interface Props {
  item: CashItemEquipment;
}

export const ItemCashInfo = ({ item }: Props) => {
  return (
    <div className="border-divider border-b py-1 text-sm">
      <p className="font-medium">아이템 정보</p>
      <dl className="flex flex-col">
        <div className="grid grid-cols-[max-content_1fr] gap-x-2">
          <dt className="whitespace-nowrap text-[#a1a1a1]">분류</dt>
          <dd className="text-right text-orange-400">
            {item.cash_item_equipment_page_name}
          </dd>
        </div>
        <div className="grid grid-cols-[max-content_1fr] gap-x-2">
          <dt className="whitespace-nowrap text-[#a1a1a1]">성별</dt>
          <dd className="text-right text-orange-400">
            {item.cash_item_gender}
          </dd>
        </div>
        <div className="grid grid-cols-[max-content_1fr] gap-x-2">
          <dt className="whitespace-nowrap text-[#a1a1a1]">라벨</dt>
          <dd className="text-right text-orange-400">
            {item.cash_item_label ?? "없음"}
          </dd>
        </div>
      </dl>
    </div>
  );
};
