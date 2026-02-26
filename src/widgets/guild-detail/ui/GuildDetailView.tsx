import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Card, CardContent } from "@/shared/ui/card";
import {
  GuildAbilityList,
  GuildBuildingList,
  GuildCard,
  GuildMemberTable,
  GuildSkillList,
  type Guild,
} from "@/entities/guild";
import { GUILD_TABS, TAB_MIN_HEIGHT_CLASS } from "./config";

interface GuildDetailViewProps {
  guildData: Guild;
}

export function GuildDetailView({ guildData }: GuildDetailViewProps) {
  return (
    <div className="mx-auto flex w-full flex-col gap-2">
      <GuildCard data={guildData} />

      <Tabs defaultValue={GUILD_TABS[0].value} className="w-full gap-2">
        <TabsList className="grid w-full grid-cols-4 shadow-sm group-data-horizontal/tabs:h-10">
          {GUILD_TABS.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className={TAB_MIN_HEIGHT_CLASS}>
          <TabsContent value="members">
            <Card className={`${TAB_MIN_HEIGHT_CLASS} gap-2 border-none`}>
              <CardContent>
                <GuildMemberTable
                  members={guildData.guild_member}
                  masterName={guildData.guild_master_name}
                  worldName={guildData.world_name}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills">
            <GuildSkillList skills={guildData.guild_skill} />
          </TabsContent>

          <TabsContent value="buildings">
            <GuildBuildingList buildings={guildData.guild_building} />
          </TabsContent>

          <TabsContent value="ability">
            <GuildAbilityList abilities={guildData.guild_ability} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
