"use client";

import { useMemo, useState } from "react";
import { getPageLayout } from "./skill-layout.util";
import type { CharacterEquipmentSkill } from "@/entities/skill/model";
import { SkillSlot } from "./SkillSlot";
import { SkillPagination } from "./SkillPagination";
import { TooltipProvider } from "@/shared/ui/tooltip";

const SLOT_SIZE = 52;
const BASE_LAYOUT_WIDTH = 300;
const FALLBACK_WIDTH = 300;
const FALLBACK_HEIGHT = 220;
const PAGINATION_SIZE = 40;
const PAGINATION_BASE_RIGHT = 65;
const PAGINATION_BASE_BOTTOM = 20;

interface SkillGridDisplayProps {
  skills: CharacterEquipmentSkill[];
  mode: 1 | 2;
  setNo: number;
}

export const SkillGridDisplay = ({
  skills,
  mode,
  setNo,
}: SkillGridDisplayProps) => {
  const [showBack, setShowBack] = useState(false);

  const page = showBack ? "back" : "front";
  const skillsBySlot = useMemo(
    () => new Map(skills.map((skill) => [skill.slot_id, skill])),
    [skills],
  );

  const layout = getPageLayout(mode, setNo, page);
  const canvas = useMemo(() => {
    if (layout.length === 0) {
      return {
        width: FALLBACK_WIDTH,
        height: FALLBACK_HEIGHT,
        slots: [] as Array<{
          id: string;
          left: number;
          bottom: number;
        }>,
        paginationLeft:
          BASE_LAYOUT_WIDTH - PAGINATION_BASE_RIGHT - PAGINATION_SIZE,
        paginationBottom: PAGINATION_BASE_BOTTOM,
      };
    }

    const slots = layout.map((slot) => ({
      id: slot.id,
      // 기존 right 좌표를 절대 left 좌표로 변환
      left: BASE_LAYOUT_WIDTH - slot.right - SLOT_SIZE,
      bottom: slot.bottom,
    }));

    const minLeft = Math.min(...slots.map((slot) => slot.left));
    const maxLeft = Math.max(...slots.map((slot) => slot.left));
    const minBottom = Math.min(...slots.map((slot) => slot.bottom));
    const maxBottom = Math.max(...slots.map((slot) => slot.bottom));

    const paginationBaseLeft =
      BASE_LAYOUT_WIDTH - PAGINATION_BASE_RIGHT - PAGINATION_SIZE;

    return {
      width: maxLeft - minLeft + SLOT_SIZE,
      height: maxBottom - minBottom + SLOT_SIZE,
      slots: slots.map((slot) => ({
        ...slot,
        left: slot.left - minLeft,
        bottom: slot.bottom - minBottom,
      })),
      paginationLeft: Math.max(0, paginationBaseLeft - minLeft),
      paginationBottom: Math.max(0, PAGINATION_BASE_BOTTOM - minBottom),
    };
  }, [layout]);

  return (
    <div className="relative w-full py-4">
      <div
        className="relative mx-auto w-full"
        style={{
          maxWidth: `${canvas.width}px`,
          aspectRatio: `${canvas.width} / ${canvas.height}`,
        }}
      >
        <TooltipProvider delayDuration={200}>
          {canvas.slots.map((slot) => {
            const skill = skillsBySlot.get(slot.id);

            return (
              <div
                key={slot.id}
                className="absolute"
                style={{
                  bottom: `${(slot.bottom / canvas.height) * 100}%`,
                  left: `${(slot.left / canvas.width) * 100}%`,
                }}
              >
                <SkillSlot skill={skill} />
              </div>
            );
          })}
        </TooltipProvider>

        <SkillPagination
          showBack={showBack}
          onToggle={() => setShowBack((prev) => !prev)}
          containerStyle={{
            left: `${canvas.paginationLeft}px`,
            bottom: `${canvas.paginationBottom}px`,
          }}
        />
      </div>
    </div>
  );
};
