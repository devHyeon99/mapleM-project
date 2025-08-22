import { LinkSkillItem } from "./LinkSkillItem";
import type { LinkSkillPreset } from "@/entities/skill/model";

interface LinkSkillListProps {
  activePresetData?: LinkSkillPreset;
}

export const LinkSkillList = ({ activePresetData }: LinkSkillListProps) => {
  if (!activePresetData) return null;

  return (
    <div className="grid grid-cols-2 gap-2">
      {activePresetData.link_skill_info.map((skill) => (
        <LinkSkillItem key={skill.skill_name} skill={skill} />
      ))}
    </div>
  );
};
