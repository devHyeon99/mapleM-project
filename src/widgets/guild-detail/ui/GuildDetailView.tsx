"use client";

import { useQuery } from "@tanstack/react-query";
import { GuildMemberTable } from "@/entities/guild/ui/GuildMemberTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { fetchGuildClient } from "@/entities/guild/api/get-guild.client";
import { GuildCard } from "@/entities/guild/ui/GuildCard";
import { GuildSkillCard } from "@/entities/guild/ui/GuildSkillCard";
import { GuildBuildingCard } from "@/entities/guild/ui/GuildBuildingCard";
import { GuildAbilityList } from "@/entities/guild/ui/GuildAbilityList";
import { GuildSearch } from "@/features/guild-search/ui/GuildSearch";

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
    staleTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error || !guildData) return <div>데이터를 불러올 수 없습니다.</div>;

  const EXCLUDED_SKILLS = ["길드 인원 증가", "잡화 상점 할인"];

  return (
    <div className="flex w-full flex-col items-center">
      <div className="mt-2 mb-4 w-full max-w-4xl">
        <GuildSearch />
      </div>
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-4">
        <GuildCard data={guildData} />

        <Tabs defaultValue="members" className="w-full gap-4">
          <TabsList className="grid h-12 w-full grid-cols-4">
            <TabsTrigger value="members">길드원</TabsTrigger>
            <TabsTrigger value="skills">길드 스킬</TabsTrigger>
            <TabsTrigger value="buildings">길드 시설물</TabsTrigger>
            <TabsTrigger value="ability">길드 어빌리티</TabsTrigger>
          </TabsList>

          {/* 길드원 탭 */}
          <TabsContent value="members">
            <Card className="relative gap-2">
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
          <TabsContent value="skills">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
              {guildData.guild_skill
                .filter((skill) => !EXCLUDED_SKILLS.includes(skill.skill_name))
                .map((skill) => (
                  <GuildSkillCard key={skill.skill_name} skill={skill} />
                ))}
            </div>
            {guildData.guild_skill.filter(
              (s) => !EXCLUDED_SKILLS.includes(s.skill_name),
            ).length === 0 && (
              <div className="text-muted-foreground py-20 text-center">
                활성화된 길드 스킬이 없습니다.
              </div>
            )}
          </TabsContent>

          {/* 길드 건물 탭 */}
          <TabsContent value="buildings">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
              {guildData.guild_building.map((building) => (
                <GuildBuildingCard
                  key={building.building_name}
                  building={building}
                />
              ))}
            </div>
            {guildData.guild_building.length === 0 && (
              <div className="text-muted-foreground rounded-lg border border-dashed py-20 text-center">
                활성화된 길드 건물이 없습니다.
              </div>
            )}
          </TabsContent>

          {/* 길드 어빌리티 탭 */}
          <TabsContent value="ability">
            <GuildAbilityList abilities={guildData.guild_ability} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
