"use client";

import { useCharacterJewel } from "@/entities/character";
import { LoadingCard } from "@/shared/ui/LoadingCard";
import { Separator } from "@/shared/ui/separator";
import { TabMessageSection } from "@/shared/ui/TabMessageSection";
import { useJewelTab } from "./useJewelTab";
import { JewelHeader } from "./JewelHeader";
import { JewelPentagon } from "./JewelPentagon";

interface JewelTabProps {
  ocid: string;
  level: number;
}

export const JewelTab = ({ ocid, level }: JewelTabProps) => {
  const { data, isLoading, isError, error } = useCharacterJewel(ocid, level);

  const { selectedPage, setSelectedPage, activePageData, parseSetOption } =
    useJewelTab(data);

  if (level < 100) {
    return (
      <TabMessageSection message="쥬얼 시스템은 Lv.100이상 이용 가능합니다." />
    );
  }

  if (isLoading) return <LoadingCard message="쥬얼 정보 불러오는중..." />;

  if (isError) {
    return (
      <div className="p-4 text-sm text-red-500">
        오류 발생: {(error as Error).message}
      </div>
    );
  }

  if (!data || data.jewel_equipment.length === 0) {
    return (
      <TabMessageSection
        message={`API 업데이트 이후 접속 기록이 없거나\n장착한 쥬얼이 없습니다.`}
      />
    );
  }

  return (
    <div className="rounded-md border p-3">
      <div className="flex h-full flex-col items-center">
        {/* 헤더 컴포넌트 */}
        <JewelHeader
          useJewelPageNo={data.use_jewel_page_no}
          activePageNo={selectedPage}
          jewelEquipment={data.jewel_equipment}
          onPageChange={setSelectedPage}
        />

        <Separator className="my-2" />

        {/* 컨텐츠 컴포넌트 */}
        {activePageData && (
          <JewelPentagon
            activePageData={activePageData}
            useJewelPageNo={data.use_jewel_page_no}
            parseSetOption={parseSetOption}
          />
        )}
      </div>
    </div>
  );
};
