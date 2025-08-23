"use client";

import { Separator } from "@/shared/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group";

interface SkillTabHeaderProps {
  selectedMode: "A" | "B";
  onModeChange: (mode: "A" | "B") => void;
  selectedSet: string;
  onSetChange: (set: string) => void;
  skillSetKeys: string[];
}

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
      <h3 className="font-bold">장착 스킬</h3>
      <Separator className="mt-2 mb-4" />

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
          <ToggleGroupItem value="A" className="h-8 w-8">
            A
          </ToggleGroupItem>
          <ToggleGroupItem value="B" className="h-8 w-8">
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
              <ToggleGroupItem key={setNo} value={setNo} className="h-8 w-8">
                {setNo}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        )}
      </div>
    </>
  );
};
