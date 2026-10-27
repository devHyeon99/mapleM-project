import { Badge } from "@/shared/ui/badge";
import { Card, CardContent } from "@/shared/ui/card";
import type { GuildAbility } from "../model/guild";
import Image from "next/image";

interface GuildAbilityCardProps {
  ability: GuildAbility;
}

export function GuildAbilityCard({ ability }: GuildAbilityCardProps) {
  return (
    <Card className="rounded-none shadow-none ring-0">
      <CardContent className="flex items-center gap-3 px-3 md:px-4">
        <Image
          src={ability.ability_icon}
          alt=""
          width={32}
          height={32}
          unoptimized
          loading="lazy"
          className="size-8 self-start object-contain"
        />

        <div className="grid min-w-0 flex-1 grid-cols-[1fr_auto] items-center gap-x-2 gap-y-0.5">
          <span className="text-body md:text-body-lg truncate font-semibold">
            {ability.ability_name.replace(/Lv\.\d+\s/, "")}{" "}
          </span>

          <Badge className="text-caption h-4 w-11.5 px-1.5 font-semibold md:h-5">
            Lv. {ability.ability_level}
          </Badge>

          {ability.ability_option && (
            <p className="text-muted-foreground text-caption md:text-body col-span-2 leading-tight">
              {ability.ability_option}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
