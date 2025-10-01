import { Badge } from "@/shared/ui/badge";
import { Card, CardContent } from "@/shared/ui/card";
import type { GuildSkill } from "../model/types";

interface GuildSkillCardProps {
  skill: GuildSkill;
}

export function GuildSkillCard({ skill }: GuildSkillCardProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={skill.skill_icon}
          alt={skill.skill_name}
          className="size-8 flex-shrink-0 object-contain"
        />

        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="flex items-center justify-between gap-1">
            <span className="truncate text-sm font-bold md:text-base">
              {skill.skill_name}
            </span>
            <Badge className="h-4 flex-shrink-0 px-1 text-xs">
              Lv. {skill.skill_level}
            </Badge>
          </div>

          {skill.skill_option && (
            <div className="text-muted-foreground text-center text-xs leading-relaxed">
              {skill.skill_option}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
