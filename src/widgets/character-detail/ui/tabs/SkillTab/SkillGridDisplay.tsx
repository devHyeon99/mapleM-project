"use client";

import { useMemo, useState } from "react";
import type { CharacterEquipmentSkill } from "@/entities/skill/model";

import { SkillSlot } from "./SkillSlot";
import { SkillPagination } from "./SkillPagination";
import { getPageRows } from "./skill-layout.util";

/** 슬롯 지름(px). 행마다 절반씩 왼쪽으로 밀어 벌집 배치를 만든다 */
const SLOT_SIZE = 52;
const SLOT_GAP = 4;
const ROW_INDENT = (SLOT_SIZE + SLOT_GAP) / 2;

interface SkillGridDisplayProps {
  skills: CharacterEquipmentSkill[];
  setNo: number;
}

export const SkillGridDisplay = ({ skills, setNo }: SkillGridDisplayProps) => {
  const [showBack, setShowBack] = useState(false);

  const skillsBySlot = useMemo(
    () => new Map(skills.map((skill) => [skill.slot_id, skill])),
    [skills],
  );

  const rows = getPageRows(setNo, showBack ? "back" : "front");
  const columns = rows[0]?.length ?? 0;

  // 맨 아랫줄은 들여쓰기가 없어 오른쪽이 비므로, 그 자리에 페이지 전환을 넣는다
  const gridWidth =
    columns * SLOT_SIZE +
    (columns - 1) * SLOT_GAP +
    (rows.length - 1) * ROW_INDENT;

  return (
    <div className="flex justify-center overflow-x-auto py-4">
      <div className="relative shrink-0" style={{ width: `${gridWidth}px` }}>
        <div className="flex flex-col" style={{ gap: `${SLOT_GAP}px` }}>
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex"
              style={{
                gap: `${SLOT_GAP}px`,
                marginLeft: `${(rows.length - 1 - rowIndex) * ROW_INDENT}px`,
              }}
            >
              {row.map((slotId) => (
                <SkillSlot key={slotId} skill={skillsBySlot.get(slotId)} />
              ))}
            </div>
          ))}
        </div>

        <SkillPagination
          showBack={showBack}
          onToggle={() => setShowBack((prev) => !prev)}
          className="absolute right-0 bottom-0"
        />
      </div>
    </div>
  );
};
