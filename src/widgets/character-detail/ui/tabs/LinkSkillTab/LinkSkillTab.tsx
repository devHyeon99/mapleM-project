"use client";

import { LoadingCard } from "@/shared/ui/LoadingCard";
import { TabMessageSection } from "@/shared/ui/TabMessageSection";
import { Separator } from "@/shared/ui/separator";
import { useLinkSkillTab } from "./useLinkSkillTab";
import { LinkSkillHeader } from "./LinkSkillHeader";
import { LinkSkillList } from "./LinkSkillList";
import { LinkSkillTotalStat } from "./LinkSkillTotalStat";

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

  if (isLoading) return <LoadingCard message="링크 스킬 정보 불러오는중..." />;

  if (isError) {
    return (
      <div className="p-4 text-sm text-red-500">
        오류 발생: {(error as Error).message}
      </div>
    );
  }

  if (isEmpty || !mergedData) {
    return (
      <TabMessageSection
        message={`API 업데이트 이후 접속 기록이 없거나\n장착한 링크스킬이 없습니다.`}
      />
    );
  }

  // 현재 선택된 프리셋의 데이터
  const activePresetData = mergedData.link_skill.find(
    (p) => p.preset_no.toString() === activePreset,
  );

  return (
    <>
      <div className="rounded-md border p-3">
        <LinkSkillHeader
          usePresetNo={mergedData.use_prest_no}
          activePreset={activePreset}
          presets={mergedData.link_skill}
          onPresetChange={setSelectedPreset}
        />

        <Separator className="my-2" />

        <LinkSkillList activePresetData={activePresetData} />
      </div>
      {activePresetData && (
        <LinkSkillTotalStat skills={activePresetData.link_skill_info} />
      )}
    </>
  );
};
