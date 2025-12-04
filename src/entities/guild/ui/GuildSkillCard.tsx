import { Badge } from "@/shared/ui/badge";
import { Card, CardContent } from "@/shared/ui/card";
import type { GuildSkill } from "../model/types";
import Image from "next/image";

interface GuildSkillCardProps {
  skill: GuildSkill;
}

export function GuildSkillCard({ skill }: GuildSkillCardProps) {
  return (
    <Card className="items-start rounded-xs border-none">
      <CardContent className="w-full px-4">
        <div className="flex gap-2 md:flex-row">
          <Image
            src={skill.skill_icon}
            alt={skill.skill_name}
            width={32}
            height={32}
            unoptimized
            loading="lazy"
            className="size-8 object-contain"
          />

          <div className="grid w-full grid-cols-[1fr_auto] items-center gap-x-2 gap-y-1">
            <span className="truncate text-sm font-bold md:text-base">
              {skill.skill_name}
            </span>

            <Badge className="h-4 w-11.5 flex-shrink-0 px-1.5 text-xs font-bold md:h-5">
              Lv. {skill.skill_level}
            </Badge>

            {skill.skill_option && (
              <p className="text-muted-foreground col-span-2 text-xs leading-tight md:text-sm">
                {skill.skill_option}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
