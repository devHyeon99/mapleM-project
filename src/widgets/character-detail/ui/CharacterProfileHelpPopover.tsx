"use client";

import { HelpPopover } from "@/shared/ui/HelpPopover";

const DATA_UPDATE_GUIDE_ITEMS = [
  {
    title: "1. 데이터 갱신",
    description:
      "게임 데이터는 평균 10분 후 반영되므로 실제와 차이가 있을 수 있습니다.",
  },
  {
    title: "2. 랭킹 정보",
    description: "서버 전체 10,000등 이내의 캐릭터만 랭킹이 표기됩니다.",
  },
  {
    title: "3. 랭킹 업데이트",
    description: "랭킹은 매일 오전 6시경에 1일 1회 집계되어 제공됩니다.",
  },
] as const;

export function CharacterProfileHelpPopover() {
  return (
    <HelpPopover
      ariaLabel="데이터 갱신 주기 안내"
      items={DATA_UPDATE_GUIDE_ITEMS}
      triggerClassName="absolute top-3 right-3"
    />
  );
}
