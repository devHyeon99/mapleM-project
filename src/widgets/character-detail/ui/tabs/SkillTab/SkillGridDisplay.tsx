"use client";

import { useState } from "react";
import { PAGE_LAYOUT } from "@/shared/config/constants/skill_page";
import type { CharacterEquipmentSkill } from "@/entities/skill/model";
import { SkillSlot } from "./SkillSlot";
import { SkillPagination } from "./SkillPagination";

interface SkillGridDisplayProps {
  skills: CharacterEquipmentSkill[];
  mode: number;
  setNo: number;
}

export const SkillGridDisplay = ({
  skills,
  mode,
  setNo,
}: SkillGridDisplayProps) => {
  const [showBack, setShowBack] = useState(false);

  const page = showBack ? "back" : "front";
  const layout = PAGE_LAYOUT[mode === 1 ? "A" : "B"][setNo]?.[page];

  if (!layout) {
    return (
      <div className="bg-muted/20 flex h-52 items-center justify-center rounded-md border border-dashed">
        <p className="text-muted-foreground text-sm">
          스킬 레이아웃 정보가 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center gap-3 py-4">
      {/* 그리드 렌더링 영역 */}
      {layout.map((row, i) => (
        <div key={i} className="flex justify-center gap-3">
          {row.map((slotId, j) => {
            // 해당 슬롯 ID에 맞는 스킬 찾기
            const skill = slotId
              ? skills.find((s) => s.slot_id === slotId)
              : undefined;

            return (
              <SkillSlot
                key={`${i}-${j}`}
                isValidSlot={!!slotId}
                skill={skill}
              />
            );
          })}
        </div>
      ))}

      {/* 페이지네이션 컨트롤 영역 */}
      <SkillPagination
        showBack={showBack}
        onToggle={() => setShowBack((prev) => !prev)}
      />
    </div>
  );
};
