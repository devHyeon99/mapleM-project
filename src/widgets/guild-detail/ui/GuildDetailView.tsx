import { GuildMemberTable } from "@/entities/guild/ui/GuildMemberTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { GuildCard } from "@/entities/guild/ui/GuildCard";
import { GuildSkillCard } from "@/entities/guild/ui/GuildSkillCard";
import { GuildBuildingCard } from "@/entities/guild/ui/GuildBuildingCard";
import { GuildAbilityList } from "@/entities/guild/ui/GuildAbilityList";
import { GuildSearch } from "@/features/guild-search/ui/GuildSearch";
import type { Guild } from "@/entities/guild/model/types";

interface GuildDetailViewProps {
  guildData: Guild;
}

export function GuildDetailView({ guildData }: GuildDetailViewProps) {
  const EXCLUDED_SKILLS = ["길드 인원 증가", "잡화 상점 할인"];

  return (
    <div className="flex w-full flex-col items-center pb-6 md:px-0">
      <div className="wide:px-0 my-4 flex w-full max-w-3xl justify-center px-4">
        <GuildSearch />
      </div>
      <div className="mx-auto flex w-full flex-col gap-2">
        {/* 넥슨 API 오류로 인한 임시 공지. 추후 삭제 */}
        <p className="text-muted-foreground mb-2 w-full text-center text-xs md:text-right md:text-sm">
          현재 넥슨 API 제공이 잘못되고 있어 실제 데이터와 차이가 있을 수
          있습니다.
        </p>
        <GuildCard data={guildData} />

        <Tabs defaultValue="members" className="w-full gap-2">
          <TabsList className="grid h-12 w-full grid-cols-4 rounded-xs shadow-sm">
            <TabsTrigger
              className="data-[state=active]:bg-card"
              value="members"
            >
              길드원
            </TabsTrigger>
            <TabsTrigger value="skills">길드 스킬</TabsTrigger>
            <TabsTrigger value="buildings">길드 시설물</TabsTrigger>
            <TabsTrigger value="ability">길드 어빌리티</TabsTrigger>
          </TabsList>

          {/* 길드원 탭 */}
          <TabsContent value="members">
            <Card className="relative gap-2 rounded-xs border-none">
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
            <div className="grid grid-cols-1 gap-0.5 md:grid-cols-3">
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
            <div className="grid grid-cols-1 gap-0.5 md:grid-cols-3">
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
