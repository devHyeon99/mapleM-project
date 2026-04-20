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

  if (isError) {
    return (
      <div className="text-destructive flex h-40 items-center justify-center p-4 text-sm font-medium">
        오류 발생: {(error as Error).message}
      </div>
    );
  }

  if (!data || !hasCashItemContent) {
    return (
      <TabMessageSection
        message={`API 업데이트 이후 접속 기록이 없거나\n장착한 장비 정보를 불러올 수 없습니다.`}
      />
    );
  }

  return (
    <div className="bg-card relative flex flex-col gap-4 rounded-2xl shadow-sm">
      {viewMode === "grid" ? (
        <div className="mx-auto flex w-full flex-col items-center gap-4 py-4">
          <CashItemTabHeader {...headerProps} />
          <CashItemGrid
            items={sortedItems}
            presetNo={effectiveSelectedPreset}
          />
        </div>
      ) : (
        <div className="pt-4">
          <CashItemTabHeader {...headerProps} className="w-full px-4" />
          <CashItemList
            items={sortedItems}
            presetNo={effectiveSelectedPreset}
          />
        </div>
      )}
    </div>
  );
};
