import { Badge } from "@/shared/ui/badge";
import { Card, CardContent } from "@/shared/ui/card";
import type { GuildSkill } from "../model/guild";
import Image from "next/image";

interface GuildSkillCardProps {
  skill: GuildSkill;
}

export function GuildSkillCard({ skill }: GuildSkillCardProps) {
  return (
    <Card className="rounded-none shadow-none ring-0">
      <CardContent>
        <div className="flex gap-2">
          <Image
            src={skill.skill_icon}
            alt=""
            width={32}
            height={32}
            unoptimized
            loading="lazy"
            className="size-8 object-contain"
          />

          <div className="grid w-full grid-cols-[1fr_auto] items-center gap-x-2 gap-y-1">
            <span className="text-body md:text-body-lg truncate font-semibold">
              {skill.skill_name}
            </span>

            <Badge className="text-caption h-4 w-11.5 flex-shrink-0 px-1.5 font-semibold md:h-5">
              Lv. {skill.skill_level}
            </Badge>

            {skill.skill_option && (
              <p className="text-muted-foreground text-caption md:text-body col-span-2 leading-tight">
                {skill.skill_option}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
