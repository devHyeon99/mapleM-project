"use client";

import { useEffect, useMemo, useState } from "react";

// Shared & UI
import { CommonTabHeader } from "@/shared/ui/CommonTabHeader";
import { LoadingCard } from "@/shared/ui/LoadingCard";

// Entities
import {
  useCharacterCashEquipment,
  sortCashItems,
  convertBeautyToCashItem,
} from "@/entities/cash-item";

// Local Components
import { CashItemGrid } from "./CashItemGrid";
import { CashItemList } from "./CashItemList";

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

  const beautyItems = useMemo(() => {
    return convertBeautyToCashItem(
      data?.beauty_data,
      data?.character_look_mode,
    );
  }, [data?.beauty_data, data?.character_look_mode]);

  // (뷰티 + 장비)
  const sortedItems = useMemo(() => {
    // 두 배열을 합친 뒤 정렬 함수로 전달
    const mergedItems = [...beautyItems, ...currentPresetItems];
    return sortCashItems(mergedItems);
  }, [currentPresetItems, beautyItems]);

  const isDataEmpty = !data || data.cash_item_equipment.length === 0;

  if (isLoading || (data && !isDataEmpty && selectedPreset === null)) {
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
      <section className="bg-muted/50 flex min-h-91.5 flex-col items-center justify-center gap-2 rounded-md border p-6 text-center">
        <p className="text-muted-foreground text-sm whitespace-pre-line">
          API 업데이트 이후 접속 기록이 없거나,{`\n`}
          장착한 장비 정보를 불러올 수 없습니다.
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
        <CashItemList items={sortedItems} presetNo={selectedPreset} />
      )}
    </div>
  );
};
