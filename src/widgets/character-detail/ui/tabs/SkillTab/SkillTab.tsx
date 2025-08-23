"use client";

import { LoadingCard } from "@/shared/ui/LoadingCard";
import { TabMessageSection } from "@/shared/ui/TabMessageSection";

import { useSkillTab } from "./useSkillTab";
import { SkillTabHeader } from "./SkillTabHeader";
import { SkillPreset } from "./SkillPreset";
import { SkillGridDisplay } from "./SkillGridDisplay";

interface SkillTabProps {
  ocid: string;
}

export const SkillTab = ({ ocid }: SkillTabProps) => {
  const { query, ui, layout } = useSkillTab(ocid);

  if (query.isLoading) return <LoadingCard message="스킬 정보 불러오는중..." />;

  if (query.isError) {
    return (
      <div className="p-4 text-sm text-red-500">
        오류 발생: {(query.error as Error).message}
      </div>
    );
  }

  if (!query.data || !query.data.skill) {
    return (
      <TabMessageSection
        message={`캐릭터가 접속한 기록이 없어\n스킬 데이터를 불러올 수 없습니다.`}
      />
    );
  }

  if (!layout.hasEquipment && !layout.hasPreset) {
    return (
      <TabMessageSection
        message={`API 업데이트 이후 접속 기록이 없거나\n장착한 스킬 정보가 없습니다.`}
      />
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full max-w-[680px] flex-col rounded-md border p-4">
        {layout.hasEquipment && (
          <>
            <SkillTabHeader
              selectedMode={ui.mode}
              onModeChange={ui.setMode}
              selectedSet={ui.setNo}
              onSetChange={ui.setSetNo}
              skillSetKeys={layout.skillSetKeys}
            />

            {layout.hasSetData ? (
              <SkillGridDisplay
                setNo={Number(ui.setNo)}
                mode={layout.modeNumber}
                skills={layout.currentSetSkills}
              />
            ) : (
              <TabMessageSection
                message={`${ui.mode}타입에 대한 스킬 세팅이 없습니다.`}
                className="min-h-none mt-2"
              />
            )}
          </>
        )}
      </div>
      <div className="rounded-md border p-4">
        <SkillPreset presets={query.data.skill.preset} />
      </div>
    </div>
  );
};
