"use client";

import { SegmentedToggle } from "@/shared/ui/SegmentedToggle";
import { SKILL_SET_NOS } from "./skill-layout.util";

interface SkillTabHeaderProps {
  selectedSet: number;
  onSetChange: (setNo: number) => void;
}

export const EQUIPPED_SKILL_HELP_ITEMS = [
  {
    title: "장착 스킬",
    description:
      "인게임과 동일한 UI를 통해 장착된 스킬 배치를 확인 할 수 있습니다. 현재 유저가 어떤 스킬 세트를 사용 중인지는 넥슨 API 데이터 미제공에 따라 확인이 불가능합니다.",
  },
] as const;

export const SkillTabHeader = ({
  selectedSet,
  onSetChange,
}: SkillTabHeaderProps) => {
  return (
    <SegmentedToggle
      ariaLabel="장착 스킬 세트 선택"
      value={selectedSet}
      onChange={onSetChange}
      options={SKILL_SET_NOS.map((setNo) => ({ value: setNo }))}
    />
  );
};
