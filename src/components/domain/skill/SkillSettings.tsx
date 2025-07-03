// src/components/skill/SkillSettings.tsx

"use client";

import { useState, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { SkillGridDisplay } from "./SkillGridDisplay";
import { type CharacterEquipmentSkill } from "@/types/skill";

interface SkillSettingsProps {
  equipmentSkills: CharacterEquipmentSkill[];
}

// 스킬을 세트별로 그룹화하는 헬퍼 함수
const groupSkillsBySet = (skills: CharacterEquipmentSkill[]) => {
  return skills.reduce<Record<string, CharacterEquipmentSkill[]>>((acc, s) => {
    if (!acc[s.equipment_skill_set]) {
      acc[s.equipment_skill_set] = [];
    }
    acc[s.equipment_skill_set].push(s);
    return acc;
  }, {});
};

export const SkillSettings = ({ equipmentSkills }: SkillSettingsProps) => {
  const [selectedMode, setSelectedMode] = useState<"A" | "B">("B");

  const { groupedSkills, skillSetKeys, modeNumber } = useMemo(() => {
    const modeNum: 1 | 2 = selectedMode === "B" ? 2 : 1;

    const filtered = equipmentSkills.filter((s) => s.skill_mode === modeNum);
    const grouped = groupSkillsBySet(filtered);
    return {
      groupedSkills: grouped,
      skillSetKeys: Object.keys(grouped),
      modeNumber: modeNum,
    };
  }, [equipmentSkills, selectedMode]);

  return (
    <Tabs key={selectedMode} defaultValue={skillSetKeys[0] || "1"}>
      <div className="flex items-center justify-between">
        <Tabs
          value={selectedMode}
          onValueChange={(value) => setSelectedMode(value as "A" | "B")}
        >
          <TabsList className="grid w-full grid-cols-2 rounded-sm border">
            <TabsTrigger value="A" className="h-6 w-6 rounded-sm">
              A
            </TabsTrigger>
            <TabsTrigger value="B" className="h-6 w-6 rounded-sm">
              B
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <TabsList
          className={`rounded-sm border ${
            skillSetKeys.length === 0 ? "hidden" : ""
          }`}
        >
          {skillSetKeys.map((setNo) => (
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

      <Separator className="my-2" />

      {skillSetKeys.length > 0 ? (
        skillSetKeys.map((setNo) => (
          <TabsContent key={setNo} value={setNo}>
            <SkillGridDisplay
              setNo={Number(setNo)}
              mode={modeNumber}
              skills={groupedSkills[setNo]}
            />
          </TabsContent>
        ))
      ) : (
        <Card className="h-52 border-none shadow-none">
          <CardContent className="text-muted-foreground flex h-full items-center justify-center p-4 text-center text-sm">
            {equipmentSkills.length === 0
              ? "스킬 세팅 데이터가 없습니다."
              : `${selectedMode}타입에 대한 스킬 세팅이 없습니다.`}
          </CardContent>
        </Card>
      )}
    </Tabs>
  );
};
