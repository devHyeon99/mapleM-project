import type { GuildSkill } from "../model/types";

// 길드 스킬 목록에는 뜨지만 화면에서는 다루지 않는 스킬
const HIDDEN_SKILL_NAMES = ["길드 인원 증가", "잡화 상점 할인"];

export function getVisibleGuildSkills(skills: GuildSkill[]): GuildSkill[] {
  return skills.filter(
    (skill) => !HIDDEN_SKILL_NAMES.includes(skill.skill_name),
  );
}
