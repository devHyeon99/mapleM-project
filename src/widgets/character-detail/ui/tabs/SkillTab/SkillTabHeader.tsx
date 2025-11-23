"use client";

import { HelpPopover } from "@/shared/ui/HelpPopover";
import { Separator } from "@/shared/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group";

interface SkillTabHeaderProps {
  selectedMode: "A" | "B";
  onModeChange: (mode: "A" | "B") => void;
  selectedSet: string;
  onSetChange: (set: string) => void;
  skillSetKeys: string[];
}

const EQUIPPED_SKILL_HELP_ITEMS = [
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
    <>
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-bold">장착 스킬</h3>
        <HelpPopover
          ariaLabel="장착 스킬 도움말"
          items={EQUIPPED_SKILL_HELP_ITEMS}
          iconType="exclamation"
        />
      </div>
      <Separator className="my-2" />

      <div className="flex items-center justify-between">
        {/* 왼쪽: A/B 모드 선택 */}
        <ToggleGroup
          type="single"
          variant="outline"
          value={selectedMode}
          onValueChange={(value) => {
            if (value) onModeChange(value as "A" | "B");
          }}
        >
          <ToggleGroupItem
            value="A"
            className="h-8 w-8 first:rounded-l-sm last:rounded-r-sm"
          >
            A
          </ToggleGroupItem>
          <ToggleGroupItem
            value="B"
            className="h-8 w-8 first:rounded-l-sm last:rounded-r-sm"
          >
            B
          </ToggleGroupItem>
        </ToggleGroup>

        {/* 오른쪽: 프리셋 선택 */}
        {hasData && (
          <ToggleGroup
            type="single"
            variant="outline"
            value={selectedSet}
            onValueChange={(value) => {
              if (value) onSetChange(value);
            }}
          >
            {skillSetKeys.map((setNo) => (
              <ToggleGroupItem
                key={setNo}
                value={setNo}
                className="h-8 w-8 first:rounded-l-sm last:rounded-r-sm"
              >
                {setNo}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        )}
      </div>
    </>
  );
};
