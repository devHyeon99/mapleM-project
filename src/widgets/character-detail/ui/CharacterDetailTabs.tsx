"use client";

import { CharacterDetailData } from "@/entities/character";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Separator } from "@/shared/ui/separator";
import { MAIN_TABS, SUB_TABS, ALL_TABS, TAB_COMPONENTS } from "./tabs/config";

interface CharacterDetailTabsProps {
  ocid: string;
  characterData: CharacterDetailData;
}

export const CharacterDetailTabs = ({
  ocid,
  characterData,
}: CharacterDetailTabsProps) => {
  return (
    <Tabs
      defaultValue="item"
      className="w-full max-w-[360px] gap-4 md:max-w-100"
    >
      {/* --- 탭 버튼 리스트 --- */}
      <TabsList className="grid h-fit w-full grid-cols-7 gap-[2px] rounded-xs border pt-1.5">
        {/*  메인 탭 */}
        {MAIN_TABS.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="h-fit rounded-full"
          >
            {tab.label}
          </TabsTrigger>
        ))}

        {/*  구분선 (접근성 처리) */}
        {/* role="presentation"을 주어 스크린 리더가 이 div를 탭의 일부로 오해하지 않게 함 */}
        <div className="col-span-7 my-1" role="presentation" aria-hidden="true">
          <Separator />
        </div>

        {/* 서브 탭 */}
        <div
          className="col-span-7 mb-[1px] grid w-full grid-cols-3 gap-[2px]"
          role="presentation" // 레이아웃용 래퍼임을 명시
        >
          {SUB_TABS.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="h-fit w-full rounded-full"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </div>
      </TabsList>

      {/* --- 탭 컨텐츠  --- */}
      {ALL_TABS.map((tab) => {
        const Component = TAB_COMPONENTS[tab.value];

        // Props 동적 생성 로직 수정
        let props: Record<string, unknown> = { ocid };

        if (tab.value === "item") {
          props = { data: characterData };
        } else {
          // 나머지 탭(Stat, Jewel, Skill, Vmatrix 등)은 ocid와 level을 전달
          props = { ocid, level: characterData.character_level };
        }

        return (
          <TabsContent key={tab.value} value={tab.value}>
            {/* @ts-expect-error: 서로 다른 Props 타입을 동적으로 넘기기 때문에 발생하는 TS 에러 무시 */}
            <Component {...props} />
          </TabsContent>
        );
      })}
    </Tabs>
  );
};
