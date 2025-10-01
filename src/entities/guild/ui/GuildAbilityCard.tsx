import { Badge } from "@/shared/ui/badge";
import { Card, CardContent } from "@/shared/ui/card";
import type { GuildAbility } from "../model/types";

interface GuildAbilityCardProps {
  ability: GuildAbility;
}

export function GuildAbilityCard({ ability }: GuildAbilityCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 px-3 md:px-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ability.ability_icon}
          alt={ability.ability_name}
          className="size-8 self-start object-contain"
        />

        <div className="grid min-w-0 flex-1 grid-cols-[1fr_auto] items-center gap-x-2 gap-y-0.5">
          <span className="truncate text-sm font-bold md:text-base">
            {ability.ability_name.replace(/Lv\.\d+\s/, "")}{" "}
          </span>

          <Badge className="h-4 w-11.5 px-1.5 text-xs font-bold md:h-5">
            Lv. {ability.ability_level}
          </Badge>

          {ability.ability_option && (
            <p className="text-muted-foreground col-span-2 text-xs leading-tight md:text-sm">
              {ability.ability_option}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
