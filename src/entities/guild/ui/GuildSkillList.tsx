import { getVisibleGuildSkills } from "../lib/getVisibleGuildSkills";
import type { GuildSkill } from "../model/types";
import { GuildEmptyState } from "./GuildEmptyState";
import { GuildSkillCard } from "./GuildSkillCard";

interface GuildSkillListProps {
  skills: GuildSkill[];
}

export function GuildSkillList({ skills }: GuildSkillListProps) {
  const visibleSkills = getVisibleGuildSkills(skills);

  if (visibleSkills.length === 0) {
    return <GuildEmptyState message="활성화된 길드 스킬이 없습니다." />;
  }

  return (
    <div className="bg-card border-border divide-border ring-foreground/5 dark:ring-foreground/10 flex flex-col divide-y overflow-hidden rounded-[min(var(--radius-4xl),24px)] shadow-sm ring-1">
      {visibleSkills.map((skill) => (
        <GuildSkillCard key={skill.skill_name} skill={skill} />
      ))}
    </div>
  );
}
