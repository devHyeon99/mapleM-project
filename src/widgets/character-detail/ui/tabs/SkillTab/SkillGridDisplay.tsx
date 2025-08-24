"use client";

import { useState } from "react";
import { getPageLayout } from "./skill-layout.util";
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

  const layout = getPageLayout(mode as 1 | 2, setNo, page);

  return (
    <div className="relative mx-auto h-[220px] w-[300px]">
      {layout.map((slot) => {
        const skill = skills.find((s) => s.slot_id === slot.id);

        return (
          <div
            key={slot.id}
            className="absolute"
            style={{
              bottom: `${slot.bottom}px`,
              right: `${slot.right}px`,
            }}
          >
            <SkillSlot skill={skill} />
          </div>
        );
      })}

      <SkillPagination
        showBack={showBack}
        onToggle={() => setShowBack((prev) => !prev)}
      />
    </div>
  );
};
