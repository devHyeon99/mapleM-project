import { GuildMemberTable } from "@/entities/guild/ui/GuildMemberTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Card, CardContent } from "@/shared/ui/card";
import { GuildCard } from "@/entities/guild/ui/GuildCard";
import { GuildSkillCard } from "@/entities/guild/ui/GuildSkillCard";
import { GuildBuildingCard } from "@/entities/guild/ui/GuildBuildingCard";
import { GuildAbilityList } from "@/entities/guild/ui/GuildAbilityList";
import { GuildSearch } from "@/features/guild-search";
import type { Guild } from "@/entities/guild/model/types";

const EXCLUDED_SKILLS = ["길드 인원 증가", "잡화 상점 할인"];

interface GuildDetailViewProps {
  guildData: Guild;
}

export function GuildDetailView({ guildData }: GuildDetailViewProps) {
  const visibleSkills = guildData.guild_skill.filter(
    (skill) => !EXCLUDED_SKILLS.includes(skill.skill_name),
  );

  return (
    <div className="flex w-full flex-col items-center pb-6 md:px-0">
      <div className="wide:px-0 my-4 flex w-full max-w-3xl justify-center px-4">
        <GuildSearch />
      </div>
      <div className="mx-auto flex w-full flex-col gap-2">
        <GuildCard data={guildData} />

        <Tabs defaultValue="members" className="w-full gap-2">
          <TabsList className="grid h-10! w-full grid-cols-4 shadow-sm">
            <TabsTrigger value="members">길드원</TabsTrigger>
            <TabsTrigger value="skills">길드 스킬</TabsTrigger>
            <TabsTrigger value="buildings">길드 시설물</TabsTrigger>
            <TabsTrigger value="ability">길드 어빌리티</TabsTrigger>
          </TabsList>

          {/* 길드원 탭 */}
          <TabsContent value="members">
            <Card className="gap-2 border-none">
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
            {visibleSkills.length > 0 ? (
              <div className="grid grid-cols-1 gap-0.5 md:grid-cols-3">
                {visibleSkills.map((skill) => (
                  <GuildSkillCard key={skill.skill_name} skill={skill} />
                ))}
              </div>
            ) : (
              <div className="text-muted-foreground rounded-lg border border-dashed py-20 text-center">
                활성화된 길드 스킬이 없습니다.
              </div>
            )}
          </TabsContent>

          {/* 길드 건물 탭 */}
          <TabsContent value="buildings">
            {guildData.guild_building.length > 0 ? (
              <div className="grid grid-cols-1 gap-0.5 md:grid-cols-3">
                {guildData.guild_building.map((building) => (
                  <GuildBuildingCard
                    key={building.building_name}
                    building={building}
                  />
                ))}
              </div>
            ) : (
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
