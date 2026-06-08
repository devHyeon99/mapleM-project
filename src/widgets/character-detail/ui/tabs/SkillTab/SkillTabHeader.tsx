"use client";

import { SegmentedToggle } from "@/shared/ui/SegmentedToggle";

const SKILL_MODE_OPTIONS = [{ value: "A" as const }, { value: "B" as const }];

interface SkillTabHeaderProps {
  selectedMode: "A" | "B";
  onModeChange: (mode: "A" | "B") => void;
  selectedSet: string;
  onSetChange: (set: string) => void;
  skillSetKeys: string[];
}

export const EQUIPPED_SKILL_HELP_ITEMS = [
  {
    title: "장착 스킬",
    description:
      "인게임과 동일한 UI를 통해 장착된 스킬 배치를 확인 할 수 있습니다. 현재 유저가 어떤 장착 스킬 프리셋으로 사용 중인지는 넥슨 API 데이터 미제공에 따라 확인이 불가능합니다.",
  },
] as const;

export const SkillTabHeader = ({
  selectedMode,
  onModeChange,
  selectedSet,
  onSetChange,
  skillSetKeys,
}: SkillTabHeaderProps) => {
  const hasData = skillSetKeys.length > 0;

  return (
    <div className="flex items-center justify-between">
      {/* 왼쪽: A/B 모드 선택 */}
      <SegmentedToggle
        ariaLabel="장착 스킬 모드 선택"
        value={selectedMode}
        onChange={onModeChange}
        options={SKILL_MODE_OPTIONS}
      />

      {/* 오른쪽: 프리셋 선택 */}
      {hasData && (
        <SegmentedToggle
          ariaLabel="장착 스킬 프리셋 선택"
          value={selectedSet}
          onChange={onSetChange}
          options={skillSetKeys.map((setNo) => ({ value: setNo }))}
        />
      )}
    </div>
  );
};
