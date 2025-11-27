"use client";

import { Fragment } from "react";
import Image from "next/image";
import { LoadingCard } from "@/shared/ui/LoadingCard";
import { TabMessageSection } from "@/shared/ui/TabMessageSection";
import { Separator } from "@/shared/ui/separator";
import {
  useCharacterHexaMatrixSkill,
  type CharacterHexaMatrixSkill,
} from "@/entities/skill";

interface HexaSkillTabProps {
  ocid: string;
  level: number;
}

type HexaSkillItem = CharacterHexaMatrixSkill["hexamatrix_skill"][number];

const LEVEL_REQUIREMENT = 250;

const formatLevel = (n: number) => n.toString().padStart(2, "0");

function HexaSkillSection({
  title,
  items,
}: {
  title: string;
  items: HexaSkillItem[];
}) {
  if (items.length === 0) return null;

  return (
    <section className="bg-card p-4 shadow-sm">
      <h2 className="font-semibold">{title}</h2>
      <Separator className="my-2" />
      <ul className="space-y-2">
        {items.map((core) => (
          <Fragment
            key={`${core.skill_type}-${core.skill_name}-${core.slot_level}`}
          >
            <li
              key={`${core.skill_type}-${core.skill_name}`}
              className="flex items-start gap-3 rounded-sm"
            >
              <Image
                src={core.skill_icon}
                alt={core.skill_name}
                width={32}
                height={32}
                className="mt-0.5 shrink-0 rounded"
                unoptimized
              />

              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="truncate text-sm font-medium">
                    {core.skill_name}
                  </span>
                  <span className="shrink-0 text-xs font-medium text-orange-400">
                    Lv.{formatLevel(core.slot_level)}
                  </span>
                </div>

                {core.skill_description && (
                  <p className="text-muted-foreground mt-1 text-xs whitespace-pre-line">
                    {core.skill_description}
                  </p>
                )}
              </div>
            </li>
          </Fragment>
        ))}
      </ul>
    </section>
  );
}

export const HexaSkillTab = ({ ocid, level }: HexaSkillTabProps) => {
  const { data, isLoading, isError, error } = useCharacterHexaMatrixSkill(
    ocid,
    level,
  );

  if (level < LEVEL_REQUIREMENT) {
    return (
      <TabMessageSection
        message={`HEXA 스킬 시스템은 Lv.${LEVEL_REQUIREMENT} 이상 이용 가능합니다.`}
      />
    );
  }

  if (isLoading) return <LoadingCard message="HEXA 스킬 불러오는중..." />;

  if (isError) {
    return (
      <div className="p-3 text-sm text-red-500">
        오류 발생: {(error as Error).message}
      </div>
    );
  }

  const skills = data?.hexamatrix_skill ?? [];
  if (skills.length === 0) {
    return (
      <TabMessageSection
        message={`API 업데이트 이후 접속 기록이 없거나\n장착한 HexaMatrixSkill이 없습니다.`}
      />
    );
  }

  // 타입별 분류
  const skillCores = skills.filter((s) => s.skill_type === "스킬 코어");
  const masteryCores = skills.filter((s) => s.skill_type === "마스터리 코어");
  const enhancementCores = skills.filter((s) => s.skill_type === "강화 코어");
  const publicCores = skills.filter((s) => s.skill_type === "공용 코어");

  return (
    <div className="flex flex-col gap-2">
      <HexaSkillSection title="스킬 코어" items={skillCores} />
      <HexaSkillSection title="마스터리 코어" items={masteryCores} />
      <HexaSkillSection title="강화 코어" items={enhancementCores} />
      <HexaSkillSection title="공용 코어" items={publicCores} />
    </div>
  );
};
