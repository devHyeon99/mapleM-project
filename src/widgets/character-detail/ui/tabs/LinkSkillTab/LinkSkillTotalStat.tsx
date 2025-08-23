import { useMemo } from "react";
import { LinkSkillInfo } from "@/entities/skill/model";
import { calculateTotalStats } from "@/entities/skill/lib/mergeLinkSkills";
import { Separator } from "@/shared/ui/separator";

interface LinkSkillTotalStatProps {
  skills: LinkSkillInfo[];
}

export const LinkSkillTotalStat = ({ skills }: LinkSkillTotalStatProps) => {
  const totalStats = useMemo(() => calculateTotalStats(skills), [skills]);

  if (totalStats.length === 0) return null;

  return (
    <div className="bg-background mt-2 rounded-md border p-4 shadow-sm">
      <h4 className="font-bold">링크 스킬 능력치 총합</h4>
      <Separator className="my-3" />
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {totalStats.map((stat) => (
          <div
            key={stat.name}
            className="flex items-center justify-between text-xs"
          >
            <span className="text-muted-foreground">{stat.name}</span>
            <span className="font-semibold text-[#FF7E54]">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
