"use client";

import { useCharacterJewel } from "@/entities/character";
import { SegmentedToggle } from "@/shared/ui/SegmentedToggle";
import { TabCard } from "@/shared/ui/TabCard";
import { TabMessageSection } from "@/shared/ui/TabMessageSection";
import { useJewelTab } from "./useJewelTab";
import { JewelPentagon } from "./JewelPentagon";
import { TabLoadingBox } from "../../TabLoadingBox";

interface JewelTabProps {
  ocid: string;
  level: number;
}

export const JewelTab = ({ ocid, level }: JewelTabProps) => {
  const { data, isLoading, isError, error } = useCharacterJewel(ocid, level);

  const { selectedPage, setSelectedPage, activePageData, parsedSetOption } =
    useJewelTab(data);

  if (level < 120) {
    return (
      <TabMessageSection message="쥬얼 시스템은 Lv.120 이상 이용 가능합니다." />
    );
  }

  if (isLoading)
    return <TabLoadingBox className="min-h-[421px] md:min-h-[421px]" />;

  if (isError) return <TabMessageSection error={error} />;

  if (!data || data.jewel_equipment.length === 0) {
    return (
      <TabMessageSection
        message={`API 업데이트 이후 접속 기록이 없거나\n장착한 쥬얼이 없습니다.`}
      />
    );
  }

  return (
    <TabCard
      title="쥬얼 페이지"
      action={
        <SegmentedToggle
          ariaLabel="쥬얼 페이지 선택"
          value={Number(selectedPage)}
          onChange={(page) => setSelectedPage(String(page))}
          options={data.jewel_equipment.map(({ jewel_page_no }) => ({
            value: jewel_page_no,
            marked: jewel_page_no === data.use_jewel_page_no,
          }))}
        />
      }
    >
      <div className="flex h-full flex-col items-center">
        {activePageData && (
          <JewelPentagon
            activePageData={activePageData}
            useJewelPageNo={data.use_jewel_page_no}
            parseSetOption={parsedSetOption}
          />
        )}
      </div>
    </TabCard>
  );
};
