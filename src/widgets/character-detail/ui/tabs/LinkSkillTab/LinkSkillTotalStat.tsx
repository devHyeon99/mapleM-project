import { useMemo } from "react";
import type { LinkSkillInfo } from "@/entities/skill/model";
import { calculateTotalStats } from "@/entities/skill/lib/mergeLinkSkills";
import { TabCard } from "@/shared/ui/TabCard";

interface LinkSkillTotalStatProps {
  skills: LinkSkillInfo[];
}

export const LinkSkillTotalStat = ({ skills }: LinkSkillTotalStatProps) => {
  const totalStats = useMemo(() => calculateTotalStats(skills), [skills]);

  if (totalStats.length === 0) return null;

  return (
    <TabCard title="링크 스킬 능력치 총합" className="mt-2">
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {totalStats.map((stat) => (
          <div
            key={stat.name}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-muted-foreground">{stat.name}</span>
            <span className="font-medium text-orange-400">{stat.value}</span>
          </div>
        ))}
      </div>
    </TabCard>
  );
};
