"use client";

import { useState } from "react";
import { useCharacterSkill } from "@/hooks/useCharacterSkill";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { stripSkillLevel } from "@/utils/stripSkillLevel";
import { LabeledSwitch } from "@/components/common/LabeledSwitch";
import { cn } from "@/lib/utils";
import { PAGE_LAYOUT } from "@/constants/skill_page";
import { LoadingCard } from "@/components/common/LoadingCard";

interface SkillTabProps {
  ocid: string;
}

export const SkillTab = ({ ocid }: SkillTabProps) => {
  const { data, isLoading, isError } = useCharacterSkill(ocid);
  const [showBack, setShowBack] = useState(false);
  const [selectedMode, setSelectedMode] = useState<1 | 2>(2); // 기본값: B타입(2)

  if (isLoading) return <LoadingCard message="스킬 정보 불러오는중..." />;
  if (isError || !data) return <p>데이터 로드 실패</p>;

  // 선택된 타입(A=1, B=2)에 맞는 스킬만 필터링
  const filteredSkills = data.skill.equipment_skill.filter(
    (s) => s.skill_mode === selectedMode,
  );

  // equipment_skill_set별로 그룹화
  const grouped = filteredSkills.reduce<Record<string, typeof filteredSkills>>(
    (acc, s) => {
      if (!acc[s.equipment_skill_set]) acc[s.equipment_skill_set] = [];
      acc[s.equipment_skill_set].push(s);
      return acc;
    },
    {},
  );

  // 특정 페이지 그리드 렌더링
  const renderGrid = (setNo: number, page: "front" | "back") => {
    const layout = PAGE_LAYOUT[selectedMode === 1 ? "A" : "B"][setNo]?.[page];
    if (!layout) return <p>레이아웃 없음</p>;

    return (
      <div className="relative flex flex-col gap-2">
        {layout.map((row, i) => (
          <div key={i} className="flex items-center justify-center gap-2">
            {row.map((slot, j) => {
              if (!slot) {
                return <div key={`empty-${i}-${j}`} className="h-16 w-16" />;
              }

              const skill = grouped[setNo]?.find((s) => s.slot_id === slot);
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

  return (
    <div className="rounded-md border p-3">
      <div className="mb-1 flex items-center justify-between">
        <h3 className="font-bold">스킬 세팅</h3>
      </div>

      {/* 탭: equipment_skill_set */}
      <Tabs key={selectedMode} defaultValue="1">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <LabeledSwitch
              checked={selectedMode === 2}
              onCheckedChange={(checked) => setSelectedMode(checked ? 2 : 1)}
            />
          </div>

          <TabsList className="rounded-sm border">
            {Object.keys(grouped).map((setNo) => (
              <TabsTrigger
                key={setNo}
                value={setNo}
                className="h-6 w-6 rounded-sm"
              >
                {setNo}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <Separator />

        {Object.keys(grouped).map((setNo) => (
          <TabsContent key={setNo} value={setNo}>
            {renderGrid(Number(setNo), showBack ? "back" : "front")}
          </TabsContent>
        ))}
      </Tabs>
      <Separator className="my-2" />
      {/* 프리셋 표시 */}
      <div className="mt-2 space-y-1">
        <h4 className="font-bold">프리셋</h4>
        {data.skill.preset.map((preset) => (
          <div
            key={preset.preset_slot_no}
            className="rounded-md border p-2 text-sm"
          >
            <span className="font-bold">
              {preset.preset_slot_no}번 스킬 프리셋
            </span>
            <div className="mt-1 flex flex-col gap-1">
              {[
                preset.skill_name_1,
                preset.skill_name_2,
                preset.skill_name_3,
                preset.skill_name_4,
              ]
                .filter(Boolean)
                .map((skillName, idx) => (
                  <span key={idx} className="text-muted-foreground">
                    - {skillName}
                  </span>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
