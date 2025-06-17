export function stripSkillLevel(skillName: string): string {
  return skillName.replace(/^Lv\.\d+\s*/, "");
}
