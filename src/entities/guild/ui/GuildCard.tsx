import { ShieldCheck, Users, Calendar } from "lucide-react";
import { Card, CardContent } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { GuildMark } from "@/entities/guild/ui/GuildMark";
import type { Guild } from "@/entities/guild/model/types";

interface GuildCardProps {
  data: Guild;
}

export function GuildCard({ data }: GuildCardProps) {
  const createdDate = new Date(data.guild_create_date);
  const createdAt = createdDate.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const createdAtDateTime = [
    createdDate.getFullYear(),
    String(createdDate.getMonth() + 1).padStart(2, "0"),
    String(createdDate.getDate()).padStart(2, "0"),
  ].join("-");

  return (
    <Card className="w-full rounded-xs border-none">
      <CardContent className="px-0">
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
          <GuildMark src={data.guild_mark_icon} name={data.guild_name} />

          <div className="w-full flex-1 space-y-4 text-center md:text-left">
            <div className="space-y-1">
              <div className="flex flex-col items-center justify-center md:flex-row md:justify-start md:gap-2">
                <h1 className="text-3xl font-bold tracking-tight">
                  {data.guild_name}
                </h1>
                <Badge className="mt-1 bg-amber-500 font-bold md:self-start">
                  Lv. {data.guild_level}
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm font-medium">
                {data.world_name}
              </p>
            </div>

            <dl className="flex flex-row justify-center gap-6 text-sm md:justify-start">
              <div className="flex flex-col gap-1">
                <dt className="text-muted-foreground flex items-center justify-center gap-1 md:justify-start">
                  <ShieldCheck
                    aria-hidden="true"
                    className="text-primary size-4"
                  />{" "}
                  길드마스터
                </dt>
                <dd className="font-bold">{data.guild_master_name}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-muted-foreground flex items-center justify-center gap-1 md:justify-start">
                  <Users aria-hidden="true" className="text-primary size-4" />{" "}
                  길드인원
                </dt>
                <dd className="font-bold">{data.guild_member_count} / 56</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-muted-foreground flex items-center justify-center gap-1 md:justify-start">
                  <Calendar
                    aria-hidden="true"
                    className="text-primary size-4"
                  />{" "}
                  창설일
                </dt>
                <dd className="font-bold">
                  <time dateTime={createdAtDateTime}>{createdAt}</time>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
