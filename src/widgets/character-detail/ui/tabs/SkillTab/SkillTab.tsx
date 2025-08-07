"use client";

import { useCharacterSkill } from "@/entities/skill/model";
import { Separator } from "@/shared/ui/separator";
import { LoadingCard } from "@/shared/ui/LoadingCard";
import { SkillSettings } from "./SkillSettings";
import { SkillPreset } from "./SkillPreset";

interface SkillTabProps {
  ocid: string;
}

export const SkillTab = ({ ocid }: SkillTabProps) => {
  const { data, isLoading, isError } = useCharacterSkill(ocid);

  if (isLoading) return <LoadingCard message="스킬 정보 불러오는중..." />;

  if (isError || !data || !data.skill) {
    return <p>스킬 데이터를 불러오는 데 실패했습니다.</p>;
  }

  return (
    <div className="rounded-md border p-3">
      <div className="mb-1 flex items-center justify-between">
        <h3 className="font-bold">스킬 세팅</h3>
      </div>

      <SkillSettings equipmentSkills={data.skill.equipment_skill} />

      <Separator className="my-2" />

      <SkillPreset presets={data.skill.preset} />
    </div>
  );
};
