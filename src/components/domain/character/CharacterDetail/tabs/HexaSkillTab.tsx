"use client";

import Image from "next/image";
import { useCharacterHexaSkill } from "@/hooks/useCharacterHexaSkill";
import { CharacterHexaMatrix } from "@/types/HexaSkill";
import { LoadingCard } from "@/shared/ui/LoadingCard";

interface HexaSkillTabProps {
  ocid: string;
}

export const HexaSkillTab = ({ ocid }: HexaSkillTabProps) => {
  const { data, isLoading, isError, error } = useCharacterHexaSkill(ocid);

  if (isLoading) return <LoadingCard message="HEXA스킬 불러오는중..." />;
  if (isError)
    return (
      <div className="p-3 text-sm text-red-500">
        오류 발생: {(error as Error).message}
      </div>
    );
  if (!data || data.hexamatrix_skill.length === 0)
    return (
      <section className="rounded-md border p-3">
        <p className="text-muted-foreground text-sm whitespace-pre-line">
          2025.09.18 API 업데이트 이후 접속 하지 않았거나, HEXA스킬이 없습니다.
        </p>
      </section>
    );

  const hexaData = data as CharacterHexaMatrix;
  const skills = hexaData.hexamatrix_skill ?? [];

  // 타입별로 분류
  const skillCores = skills.filter((s) => s.skill_type === "스킬 코어");
  const masteryCores = skills.filter((s) => s.skill_type === "마스터리 코어");
  const enhancementCores = skills.filter((s) => s.skill_type === "강화 코어");

  return (
    <div className="flex flex-col gap-2 rounded-md border p-3 text-sm">
      {/* 스킬 코어 */}
      <section>
        <h2 className="pb-1 text-base font-semibold">스킬 코어</h2>
        <ul className="space-y-2">
          {skillCores.map((core) => (
            <li
              key={core.skill_name}
              className="flex items-center gap-3 rounded-sm border p-2"
            >
              <Image
                src={core.skill_icon}
                alt={core.skill_name}
                width={32}
                height={32}
                className="mt-0.5 self-start rounded"
                unoptimized
              />
              <div className="flex flex-col">
                <span className="font-medium">{core.skill_name}</span>
                <span className="text-muted-foreground text-xs">
                  {core.skill_description}
                </span>
                <span className="text-muted-foreground font-mono text-xs tabular-nums">
                  Lv.{core.slot_level.toString().padStart(2, "0")}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 마스터리 코어 */}
      <section>
        <h2 className="pb-1 text-base font-semibold">마스터리 코어</h2>
        <ul className="space-y-2">
          {masteryCores.map((core) => (
            <li
              key={core.skill_name}
              className="flex items-center gap-3 rounded-sm border p-2"
            >
              <Image
                src={core.skill_icon}
                alt={core.skill_name}
                width={32}
                height={32}
                className="mt-0.5 self-start rounded"
                unoptimized
              />
              <div className="flex flex-col">
                <span className="font-medium">{core.skill_name}</span>
                <span className="text-muted-foreground text-xs">
                  {core.skill_description}
                </span>
                <span className="text-muted-foreground font-mono text-xs">
                  Lv.{core.slot_level.toString().padStart(2, "0")}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 강화 코어 */}
      <section>
        <h2 className="pb-1 text-base font-semibold">강화 코어</h2>
        <ul className="space-y-2">
          {enhancementCores.map((core) => (
            <li
              key={core.skill_name}
              className="flex items-center gap-3 rounded-sm border p-2"
            >
              <Image
                src={core.skill_icon}
                alt={core.skill_name}
                width={32}
                height={32}
                className="mt-0.5 self-start rounded"
                unoptimized
              />
              <div className="flex flex-col">
                <span className="font-medium">{core.skill_name}</span>
                <span className="text-muted-foreground text-xs">
                  {core.skill_description}
                </span>
                <span className="text-muted-foreground font-mono text-xs">
                  Lv.{core.slot_level.toString().padStart(2, "0")}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
