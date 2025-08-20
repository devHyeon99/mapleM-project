"use client";

import { useEffect, useMemo, useState } from "react";

// Shared & UI
import { CommonTabHeader } from "@/shared/ui/CommonTabHeader";
import { LoadingCard } from "@/shared/ui/LoadingCard";

// Entities
import { useCharacterCashEquipment, sortCashItems } from "@/entities/cash-item";

// Local Components
import { CashItemGrid } from "./CashItemGrid";

interface CashItemTabProps {
  ocid: string;
}

export const CashItemTab = ({ ocid }: CashItemTabProps) => {
  const { data, isLoading, isError, error } = useCharacterCashEquipment(ocid);
  const [selectedPreset, setSelectedPreset] = useState<number | null>(
    () => data?.use_preset_no ?? null,
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    if (data?.use_preset_no && selectedPreset === null) {
      setSelectedPreset(data.use_preset_no);
    }
  }, [data?.use_preset_no, selectedPreset]);

  // 현재 선택된 프리셋의 아이템 목록 추출
  const currentPresetItems = useMemo(() => {
    const presetList = data?.cash_equipment_preset ?? [];
    const currentItemsRaw = data?.cash_item_equipment ?? [];
    const activePresetNo = data?.use_preset_no;

    // 프리셋 리스트에서 선택된 번호 찾기
    const presetData = presetList.find((p) => p.preset_no === selectedPreset);

    // 프리셋 데이터가 있으면 사용, 없으면(현재 적용 중인 프리셋과 같다면) 메인 데이터 사용
    return (
      presetData?.cash_item_equipment ??
      (selectedPreset === activePresetNo ? currentItemsRaw : [])
    );
  }, [data, selectedPreset]);

  // 슬롯 순서대로 정렬
  const sortedItems = useMemo(() => {
    return sortCashItems(currentPresetItems);
  }, [currentPresetItems]);

  if (isLoading || (data && selectedPreset === null)) {
    return <LoadingCard message="외형 정보 불러오는 중..." />;
  }

  if (isError) {
    return (
      <div className="text-destructive flex h-40 items-center justify-center p-4 text-sm font-medium">
        오류 발생: {(error as Error).message}
      </div>
    );
  }

  if (!data || data.cash_item_equipment.length === 0) {
    return (
      <section className="flex min-h-25 flex-col items-center justify-center gap-2 rounded-md border p-6 text-center">
        <p className="text-muted-foreground text-sm whitespace-pre-line">
          API 업데이트(2025.09.18) 이후 접속 기록이 없거나,{`\n`}
          장착한 캐시 장비 정보를 불러올 수 없습니다.
        </p>
      </section>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* 헤더 */}
      <CommonTabHeader
        activePresetNo={data.use_preset_no}
        selectedPreset={selectedPreset}
        viewMode={viewMode}
        onSelectPreset={setSelectedPreset}
        onChangeViewMode={setViewMode}
      />

      {/* 컨텐츠 영역 */}
      {viewMode === "grid" ? (
        <CashItemGrid items={sortedItems} presetNo={selectedPreset} />
      ) : (
        <div className="text-muted-foreground flex h-40 w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed text-sm">
          <p>리스트 뷰는 준비 중입니다.</p>
        </div>
      )}
    </div>
  );
};
