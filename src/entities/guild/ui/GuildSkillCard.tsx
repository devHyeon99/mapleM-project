import { Badge } from "@/shared/ui/badge";
import { Card, CardContent } from "@/shared/ui/card";
import type { GuildSkill } from "../model/types";

interface GuildSkillCardProps {
  skill: GuildSkill;
}

export function GuildSkillCard({ skill }: GuildSkillCardProps) {
  return (
    <Card className="items-start">
      <CardContent className="w-full px-4">
        <div className="flex gap-2 md:flex-row">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={skill.skill_icon}
            alt={skill.skill_name}
            className="size-8 object-contain"
          />

          <div className="grid grid-cols-[1fr_auto] items-center gap-x-2 gap-y-1">
            <span className="truncate text-sm font-bold md:text-base">
              {skill.skill_name}
            </span>

            <Badge className="h-4 w-11.5 flex-shrink-0 px-1.5 text-xs font-bold md:h-5 md:text-xs">
              Lv. {skill.skill_level}
            </Badge>

            {skill.skill_option && (
              <p className="text-muted-foreground col-span-2 text-xs leading-tight md:text-xs">
                {skill.skill_option}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
