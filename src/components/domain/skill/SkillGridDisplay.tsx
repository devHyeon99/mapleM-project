"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { PAGE_LAYOUT } from "@/constants/skill_page";
import { stripSkillLevel } from "@/utils/stripSkillLevel";
import { type CharacterEquipmentSkill } from "@/types/skill";

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
  const layout = PAGE_LAYOUT[mode === 1 ? "A" : "B"][setNo]?.[page];

  if (!layout) {
    return (
      <Card>
        <CardContent className="text-muted-foreground p-4 text-center text-sm">
          스킬 레이아웃 정보가 없습니다.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative flex flex-col gap-2">
      {layout.map((row, i) => (
        <div key={i} className="flex items-center justify-center gap-2">
          {row.map((slot, j) => {
            if (!slot) {
              return <div key={`empty-${i}-${j}`} className="h-16 w-16" />;
            }

            const skill = skills.find((s) => s.slot_id === slot);
            return (
              <Card
                key={slot}
                className="flex h-16 w-16 items-center justify-center rounded-full border text-center"
              >
                <CardContent className="flex h-full w-full items-center justify-center p-1">
                  {skill && (
                    <span className="text-center text-xs font-semibold">
                      {stripSkillLevel(skill.skill_name)}
                    </span>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      ))}

      {/* 페이지 인디케이터 */}
      <div className="absolute right-2 bottom-12 flex gap-2">
        <span
          className={cn(
            "h-2 w-2 rounded-full",
            !showBack ? "bg-orange-500" : "bg-gray-300",
          )}
        />
        <span
          className={cn(
            "h-2 w-2 rounded-full",
            showBack ? "bg-orange-500" : "bg-gray-300",
          )}
        />
      </div>

      {/* 앞/뒤 페이지 전환 버튼 */}
      <Button
        size="icon"
        variant="outline"
        onClick={() => setShowBack((prev) => !prev)}
        className="absolute right-0 bottom-0 cursor-pointer rounded-full"
      >
        <RefreshCw className="size-4" />
      </Button>
    </div>
  );
};
