"use client";

import { TabMessageSection } from "@/shared/ui/TabMessageSection";
import { SegmentedToggle } from "@/shared/ui/SegmentedToggle";
import { TabCard } from "@/shared/ui/TabCard";
import { useLinkSkillTab } from "./useLinkSkillTab";
import { LinkSkillList } from "./LinkSkillList";
import { LinkSkillTotalStat } from "./LinkSkillTotalStat";
import { TabLoadingBox } from "../../TabLoadingBox";

interface LinkSkillTabProps {
  ocid: string;
}

export const LinkSkillTab = ({ ocid }: LinkSkillTabProps) => {
  const {
    mergedData,
    isLoading,
    isError,
    error,
    isEmpty,
    activePreset,
    setSelectedPreset,
  } = useLinkSkillTab(ocid);

  if (isLoading)
    return <TabLoadingBox className="min-h-[710px] md:min-h-[606px]" />;

  if (isError) return <TabMessageSection error={error} />;

  if (isEmpty || !mergedData) {
    return (
      <TabMessageSection
        message={`API 업데이트 이후 접속 기록이 없거나\n장착한 링크스킬이 없습니다.\n\n(링크 프리셋 업데이트 후 링크를 프리셋으로 착용하지 않았으면 표기되지 않습니다.)`}
      />
    );
  }

  // 현재 선택된 프리셋의 데이터
  const activePresetData = mergedData.link_skill.find(
    (p) => p.preset_no.toString() === activePreset,
  );

  return (
    <>
      <TabCard
        title="링크 스킬"
        action={
          <SegmentedToggle
            ariaLabel="링크 스킬 프리셋 선택"
            value={Number(activePreset)}
            onChange={(preset) => setSelectedPreset(String(preset))}
            options={mergedData.link_skill.map(({ preset_no }) => ({
              value: preset_no,
              marked: preset_no === mergedData.use_prest_no,
            }))}
          />
        }
      >
        <LinkSkillList activePresetData={activePresetData} />
      </TabCard>
      {activePresetData && (
        <LinkSkillTotalStat skills={activePresetData.link_skill_info} />
      )}
    </>
  );
};
