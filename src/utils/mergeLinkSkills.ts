import { LinkSkillInfo } from "@/types/linkskill";

function parseEffect(effect: string): Record<string, number> {
  const effectMap: Record<string, number> = {};
  if (!effect) return effectMap;

  effect.split(",").forEach((part) => {
    const [key, value] = part.split(":").map((s) => s.trim());
    if (!key || !value) return;
    const num = parseFloat(value.replace(/[^0-9.\-]/g, ""));
    if (!isNaN(num)) {
      effectMap[key] = (effectMap[key] || 0) + num;
    }
  });

  return effectMap;
}

function stringifyEffect(effectMap: Record<string, number>): string {
  return Object.entries(effectMap)
    .map(
      ([key, value]) => `${key} : ${value}${key.includes("시간") ? "초" : "%"}`,
    )
    .join(", ");
}

export function mergeLinkSkills(skills: LinkSkillInfo[]): LinkSkillInfo[] {
  const merged: Record<
    string,
    { skill: LinkSkillInfo; effectMap: Record<string, number> }
  > = {};

  skills.forEach((skill) => {
    const effectMap = parseEffect(skill.skill_effect);

    if (merged[skill.skill_name]) {
      merged[skill.skill_name].skill.skill_level += skill.skill_level;

      for (const [k, v] of Object.entries(effectMap)) {
        merged[skill.skill_name].effectMap[k] =
          (merged[skill.skill_name].effectMap[k] || 0) + v;
      }

      merged[skill.skill_name].skill.skill_effect = stringifyEffect(
        merged[skill.skill_name].effectMap,
      );
    } else {
      merged[skill.skill_name] = {
        skill: { ...skill },
        effectMap,
      };
    }
  });

  return Object.values(merged).map((entry) => entry.skill);
}
