import { CharacterDetailData } from "@/entities/character";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Separator } from "@/shared/ui/separator";
import {
  ItemTab,
  CashItemTab,
  JewelTab,
  SymbolTab,
  StatTab,
  LinkSkillTab,
  SkillTab,
  VmatrixTab,
  HexaSkillTab,
  HexaStatTab,
} from "./tabs";

export const MAIN_TABS = [
  { value: "item", label: "장비" },
  { value: "cashItem", label: "외형" },
  { value: "stat", label: "스탯" },
  { value: "Jewel", label: "쥬얼" },
  { value: "Symbol", label: "심볼" },
  { value: "LinkSkill", label: "링크" },
  { value: "Skill", label: "스킬" },
] as const;

export const SUB_TABS = [
  { value: "Vmatrix", label: "V매트릭스" },
  { value: "HexaSkill", label: "HEXA스킬" },
  { value: "HexaStat", label: "HEXA스탯" },
] as const;

// 전체 탭 리스트 (Content 렌더링용)
export const ALL_TABS = [...MAIN_TABS, ...SUB_TABS];

interface CharacterDetailTabsProps {
  ocid: string;
  characterData: CharacterDetailData;
}

export const CharacterDetailTabs = ({
  ocid,
  characterData,
}: CharacterDetailTabsProps) => {
  // 탭 value에 따라 렌더링할 컴포넌트를 반환하는 함수
  const renderTabContent = (value: string) => {
    switch (value) {
      case "item":
        // ItemTab만 유일하게 전체 데이터(characterData)가 필요
        return <ItemTab data={characterData} />;

      // 나머지 탭들은 ocid만 있으면 됨
      case "cashItem":
        return <CashItemTab ocid={ocid} />;
      case "stat":
        return <StatTab ocid={ocid} />;
      case "Jewel":
        return <JewelTab ocid={ocid} />;
      case "Symbol":
        return <SymbolTab ocid={ocid} />;
      case "LinkSkill":
        return <LinkSkillTab ocid={ocid} />;
      case "Skill":
        return <SkillTab ocid={ocid} />;
      case "Vmatrix":
        return <VmatrixTab ocid={ocid} />;
      case "HexaSkill":
        return <HexaSkillTab ocid={ocid} />;
      case "HexaStat":
        return <HexaStatTab ocid={ocid} />;
      default:
        return null;
    }
  };

  return (
    <Tabs defaultValue="item" className="w-[340px] gap-4">
      {/* --- 탭 버튼 리스트 (Trigger) --- */}
      <TabsList className="grid h-auto w-full grid-cols-7 [grid-template-rows:auto_auto] gap-[2px] rounded-xs border pt-1.5">
        {/* Main Tabs */}
        {MAIN_TABS.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className="rounded-sm">
            {tab.label}
          </TabsTrigger>
        ))}

        {/* 구분선 */}
        <div className="col-span-7 my-1">
          <Separator />
        </div>

        {/* Sub Tabs */}
        <div className="col-span-7 mb-[1px] grid w-full grid-cols-3 gap-[2px]">
          {SUB_TABS.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="w-full rounded-sm"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </div>
      </TabsList>

      {/* --- 탭 내용 (Content) --- */}
      {ALL_TABS.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {renderTabContent(tab.value)}
        </TabsContent>
      ))}
    </Tabs>
  );
};
