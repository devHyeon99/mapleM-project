"use client";

import { useCharacterCashEquipment } from "@/entities/cash-item/model/hooks/useCharacterCashEquipment";

import { CashItemGrid } from "./CashItemGrid";
import { CashItemList } from "./CashItemList";
import { CashItemTabHeader } from "./CashItemTabHeader";
import { useCashItemTab } from "./useCashItemTab";
import { TabMessageSection } from "@/shared/ui/TabMessageSection";
import { TabLoadingBox } from "../../TabLoadingBox";

interface CashItemTabProps {
  ocid: string;
}

export const CashItemTab = ({ ocid }: CashItemTabProps) => {
  const { data, isLoading, isError, error } = useCharacterCashEquipment(ocid);
  const {
    effectiveSelectedPreset,
    headerProps,
    hasCashItemContent,
    sortedItems,
    viewMode,
  } = useCashItemTab(data);

  if (isLoading) {
    return <TabLoadingBox className="min-h-[408px] md:min-h-[474px]" />;
  }

  if (isError) return <TabMessageSection error={error} />;

  if (!data || !hasCashItemContent) {
    return (
      <TabMessageSection
        message={`API 업데이트 이후 접속 기록이 없거나\n장착한 장비 정보를 불러올 수 없습니다.`}
      />
    );
  }

  return (
    <div className="relative flex flex-col rounded-2xl shadow-sm">
      <CashItemTabHeader {...headerProps} />

      <div className="bg-card rounded-b-2xl">
        {viewMode === "grid" ? (
          <div className="flex w-full flex-col items-center py-4">
            <CashItemGrid
              items={sortedItems}
              presetNo={effectiveSelectedPreset}
            />
          </div>
        ) : (
          <CashItemList
            items={sortedItems}
            presetNo={effectiveSelectedPreset}
          />
        )}
      </div>
    </div>
  );
};
