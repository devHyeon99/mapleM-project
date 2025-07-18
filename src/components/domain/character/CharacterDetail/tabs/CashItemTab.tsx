"use client";

import { ItemCashPopover } from "@/components/common/CashItem/ItemCashPopover";
import { LoadingCard } from "@/components/common/LoadingCard";
import { useCharacterCashEquipment } from "@/hooks/useCharacterCashEquipment";
import { sortCashItemsBySlot } from "@/utils/sortCashItems";

interface CashItemTabProps {
  ocid: string;
}

export const CashItemTab = ({ ocid }: CashItemTabProps) => {
  const { data, isLoading, isError, error } = useCharacterCashEquipment(ocid);
  if (isLoading) {
    return <LoadingCard message="외형 정보 불러오는중..." />;
  }

  if (isError) {
    return (
      <div className="p-4 text-sm text-red-500">
        오류 발생: {(error as Error).message}
      </div>
    );
  }

  if (data?.cash_item_equipment.length === 0 || !data) {
    return (
      <section className="rounded-md border p-3">
        <p className="text-muted-foreground text-sm whitespace-pre-line">
          2025.09.18 API 업데이트 이후 접속 하지 않았거나, 장착한 장비가
          없습니다.
        </p>
      </section>
    );
  }

  const sortedItems = sortCashItemsBySlot(data.cash_item_equipment);

  return (
    <div className="grid grid-cols-7 gap-1">
      {sortedItems.map((item, idx) =>
        item ? (
          <ItemCashPopover key={`${item.cash_item_name}-${idx}`} item={item} />
        ) : (
          <div key={idx} className="h-[46px] w-[46px]" />
        ),
      )}
    </div>
  );
};
