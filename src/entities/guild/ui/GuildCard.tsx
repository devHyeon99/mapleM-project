import { ShieldCheck, Users, Calendar } from "lucide-react";
import { Card, CardContent } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { GuildMark } from "@/entities/guild/ui/GuildMark";
import type { Guild } from "@/entities/guild/model/types";

interface GuildCardProps {
  data: Guild;
}

export function GuildCard({ data }: GuildCardProps) {
  return (
    <Card className="from-primary/5 via-background to-primary/5 w-full overflow-hidden bg-gradient-to-br shadow-sm">
      <CardContent className="p-6">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
          <GuildMark src={data.guild_mark_icon} name={data.guild_name} />

          <div className="w-full flex-1 space-y-4 text-center md:text-left">
            <div className="space-y-1">
              <div className="flex flex-col flex-wrap items-center justify-center md:flex-row md:justify-start md:gap-2">
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

            <div className="grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
              <div className="bg-background/50 flex flex-col gap-1 rounded-lg border p-3 shadow-sm">
                <span className="text-muted-foreground flex items-center justify-center gap-1 md:justify-start">
                  <ShieldCheck className="text-primary size-4" /> 길드마스터
                </span>
                <span className="font-bold">{data.guild_master_name}</span>
              </div>
              <div className="bg-background/50 flex flex-col gap-1 rounded-lg border p-3 shadow-sm">
                <span className="text-muted-foreground flex items-center justify-center gap-1 md:justify-start">
                  <Users className="text-primary size-4" /> 길드인원
                </span>
                {/* 56명 제한이 고정값이 아니라면 추후 데이터 필드로 교체 고려 */}
                <span className="font-bold">
                  {data.guild_member_count} / 56
                </span>
              </div>
              <div className="bg-background/50 flex flex-col gap-1 rounded-lg border p-3 shadow-sm">
                <span className="text-muted-foreground flex items-center justify-center gap-1 md:justify-start">
                  <Calendar className="text-primary size-4" /> 창설일
                </span>
                <span className="font-bold">
                  {new Date(data.guild_create_date).toLocaleDateString(
                    "ko-KR",
                    { year: "numeric", month: "2-digit", day: "2-digit" },
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
