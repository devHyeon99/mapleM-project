"use client";

import { useQuery } from "@tanstack/react-query";
import { GuildMemberTable } from "@/entities/guild/ui/GuildMemberTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { fetchGuildClient } from "@/entities/guild/api/get-guild.client";
import { GuildCard } from "@/entities/guild/ui/GuildCard";
import { GuildSkillCard } from "@/entities/guild/ui/GuildSkillCard";

interface GuildDetailViewProps {
  worldName: string;
  guildName: string;
}

export function GuildDetailView({
  worldName,
  guildName,
}: GuildDetailViewProps) {
  const {
    data: guildData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["guild", worldName, guildName],
    queryFn: () => fetchGuildClient({ worldName, guildName }),
    // 15분 동안은 서버에 다시 요청하지 않고 캐시된 데이터를 씀
    staleTime: 1000 * 60 * 15,
    // 창을 다시 포커스했을 때 갱신할지 여부 (15분 안지났으면 안함)
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error || !guildData) return <div>데이터를 불러올 수 없습니다.</div>;

  const EXCLUDED_SKILLS = ["길드 인원 증가", "잡화 상점 할인"];

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 py-4">
      <GuildCard data={guildData} />

      <Tabs defaultValue="members" className="w-full gap-4">
        <TabsList className="grid h-12 w-full grid-cols-4">
          <TabsTrigger value="members">길드원</TabsTrigger>
          <TabsTrigger value="skills">길드 스킬</TabsTrigger>
          <TabsTrigger value="buildings">길드 건물</TabsTrigger>
          <TabsTrigger value="ability">길드 어빌리티</TabsTrigger>
        </TabsList>

        {/* 길드원 탭 */}
        <TabsContent value="members">
          <Card className="relative">
            <CardHeader>
              <CardTitle className="text-lg">
                길드원 목록 ({guildData.guild_member_count}명)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <GuildMemberTable
                members={guildData.guild_member}
                masterName={guildData.guild_master_name}
                worldName={guildData.world_name}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* 길드 스킬 탭 */}
        <TabsContent value="skills" className="pt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {guildData.guild_skill
              .filter((skill) => !EXCLUDED_SKILLS.includes(skill.skill_name))
              .map((skill) => (
                <GuildSkillCard key={skill.skill_name} skill={skill} />
              ))}
          </div>

          {/* 필터링 후 데이터가 없을 경우 처리 */}
          {guildData.guild_skill.filter(
            (s) => !EXCLUDED_SKILLS.includes(s.skill_name),
          ).length === 0 && (
            <div className="text-muted-foreground py-20 text-center">
              활성화된 길드 스킬이 없습니다.
            </div>
          )}
        </TabsContent>

        {/* 나머지 탭 생략 (플레이스홀더 유지) */}
      </Tabs>
    </div>
  );
}
