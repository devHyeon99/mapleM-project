import {
  CharacterAndroidEquipment,
  CharacterHeartEquipment,
  CharacterItemEquipment,
} from "@/types/character";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Separator } from "@/shared/ui/separator";
import { ItemTab } from "./tabs/ItemTab";
import { CashItemTab } from "./tabs/CashItemTab";
import { JewelTab } from "./tabs/JewelTab";
import { SymbolTab } from "./tabs/SymbolTab";
import { StatTab } from "./tabs/StatTab";
import { LinkSkillTab } from "./tabs/LinkSkillTab";
import { SkillTab } from "./tabs/SkillTab";
import { VmatrixTab } from "./tabs/VmatrixTab";
import { HexaSkillTab } from "./tabs/HexaSkillTab";
import { HexaStatTab } from "./tabs/HexaStatTab";

interface CharacterDetailTabsProps {
  ocid: string;
  items: CharacterItemEquipment[];
  android: CharacterAndroidEquipment | null;
  heart: CharacterHeartEquipment | null;
}

export const CharacterDetailTabs = ({
  ocid,
  items,
  android,
  heart,
}: CharacterDetailTabsProps) => (
  <Tabs defaultValue="item" className="w-[340px] gap-4">
    <TabsList className="grid h-auto w-full grid-cols-7 [grid-template-rows:auto_auto] gap-[2px] rounded-xs border pt-1.5">
      {/* 1열 */}
      <TabsTrigger value="item" className="rounded-sm">
        장비
      </TabsTrigger>
      <TabsTrigger value="cashItem" className="rounded-sm">
        외형
      </TabsTrigger>
      <TabsTrigger value="stat" className="rounded-sm">
        스탯
      </TabsTrigger>
      <TabsTrigger value="Jewel" className="rounded-sm">
        쥬얼
      </TabsTrigger>
      <TabsTrigger value="Symbol" className="rounded-sm">
        심볼
      </TabsTrigger>
      <TabsTrigger value="LinkSkill" className="rounded-sm">
        링크
      </TabsTrigger>
      <TabsTrigger value="Skill" className="rounded-sm">
        스킬
      </TabsTrigger>

      {/* 🔽 시각적 구분선 (첫 줄 끝에 세로 구분선) */}
      <div className="col-span-7 my-1">
        <Separator />
      </div>

      {/* 2열 */}
      <div className="col-span-7 mb-[1px] grid w-full grid-cols-3 gap-[2px]">
        <TabsTrigger value="Vmatrix" className="w-full rounded-sm">
          V매트릭스
        </TabsTrigger>
        <TabsTrigger value="HexaSkill" className="w-full rounded-sm">
          HEXA스킬
        </TabsTrigger>
        <TabsTrigger value="HexaStat" className="w-full rounded-sm">
          HEXA스탯
        </TabsTrigger>
      </div>
    </TabsList>

    <TabsContent value="item">
      <ItemTab items={items} android={android} heart={heart} />
    </TabsContent>
    <TabsContent value="cashItem">
      <CashItemTab ocid={ocid} />
    </TabsContent>
    <TabsContent value="stat">
      <StatTab ocid={ocid} />
    </TabsContent>
    <TabsContent value="Jewel">
      <JewelTab ocid={ocid} />
    </TabsContent>
    <TabsContent value="Symbol">
      <SymbolTab ocid={ocid} />
    </TabsContent>
    <TabsContent value="LinkSkill">
      <LinkSkillTab ocid={ocid} />
    </TabsContent>
    <TabsContent value="Skill">
      <SkillTab ocid={ocid} />
    </TabsContent>
    <TabsContent value="Vmatrix">
      <VmatrixTab ocid={ocid} />
    </TabsContent>
    <TabsContent value="HexaSkill">
      <HexaSkillTab ocid={ocid} />
    </TabsContent>
    <TabsContent value="HexaStat">
      <HexaStatTab ocid={ocid} />
    </TabsContent>
  </Tabs>
);
