"use client";

import { GuildAbility } from "../model/types";
import { GuildAbilityCard } from "./GuildAbilityCard";

interface GuildAbilityListProps {
  abilities: GuildAbility[];
}

const GROUP_TITLES = ["1차", "2차", "3차", "4차", "5차", "6차", "7차", "8차"];

export function GuildAbilityList({ abilities }: GuildAbilityListProps) {
  if (!abilities || abilities.length === 0) {
    return (
      <div className="text-muted-foreground py-20 text-center">
        활성화된 길드 어빌리티가 없습니다.
      </div>
    );
  }

  // 키워드 정의 (이름만 사용해서 명확하게 구분)
  const KEYWORDS = {
    // 1차, 2차 (중복 이름 존재 -> 나중에 ability_no가 낮은 순서가 1차로 분리)
    DAMAGE: [
      "힘으로",
      "지능으로",
      "대장",
      "물리 대미지",
      "마법 대미지",
      "보스 공격력",
    ],
    // 3차
    ATTACK: ["공격으로", "마법으로", "물리 공격력", "마법 공격력"],
    // 4차
    UTILITY: ["조금만", "상점", "회계", "할인", "GP", "구입"],
    // 5차, 6차 (중복 이름 존재 -> 나중에 ability_no가 낮은 순서가 5차로 분리)
    CRIT_FEVER: ["치명타", "피버"],
    // 7차
    MAX_DMG_A: ["욕망의", "최강"],
    // 8차
    MAX_DMG_B: ["극한의", "한계"],
  };

  // 그룹 바구니 준비
  const groups: GuildAbility[][] = Array.from({ length: 8 }, () => []);
  const damageGroup: GuildAbility[] = []; // 1,2차 임시 보관
  const critFeverGroup: GuildAbility[] = []; // 5,6차 임시 보관

  // 분류 실행
  abilities.forEach((ability) => {
    const name = ability.ability_name;
    const option = ability.ability_option || "";
    const textToCheck = name + option;

    // 이름이 확실히 다르므로 순서 상관없이 if-else로 쭉 검사해도 안전함
    if (KEYWORDS.MAX_DMG_B.some((k) => textToCheck.includes(k))) {
      groups[7].push(ability); // 8차
    } else if (KEYWORDS.MAX_DMG_A.some((k) => textToCheck.includes(k))) {
      groups[6].push(ability); // 7차
    } else if (KEYWORDS.DAMAGE.some((k) => textToCheck.includes(k))) {
      damageGroup.push(ability);
    } else if (KEYWORDS.ATTACK.some((k) => textToCheck.includes(k))) {
      groups[2].push(ability); // 3차
    } else if (KEYWORDS.UTILITY.some((k) => textToCheck.includes(k))) {
      groups[3].push(ability); // 4차
    } else if (KEYWORDS.CRIT_FEVER.some((k) => textToCheck.includes(k))) {
      critFeverGroup.push(ability);
    }
  });

  // 중복 그룹 자동 분배 (ID 오름차순 정렬 -> 앞에서부터 채우기)
  damageGroup.sort((a, b) => a.ability_no - b.ability_no);
  critFeverGroup.sort((a, b) => a.ability_no - b.ability_no);

  damageGroup.forEach((ability, index) => {
    if (index < 3)
      groups[0].push(ability); // 1차
    else groups[1].push(ability); // 2차
  });

  critFeverGroup.forEach((ability, index) => {
    if (index < 2)
      groups[4].push(ability); // 5차
    else groups[5].push(ability); // 6차
  });

  // 내부 정렬 우선순위 (화면 표시 순서)
  const sortPriority = [
    "힘으로",
    "물리 대미지",
    "지능으로",
    "마법 대미지",
    "대장",
    "보스",
    "공격으로",
    "물리 공격력",
    "마법으로",
    "마법 공격력",
    "조금만",
    "상점",
    "회계",
    "치명타",
    "피버",
    "욕망의",
    "최강", // 7차
    "극한의",
    "한계", // 8차
  ];

  const getPriority = (item: GuildAbility) => {
    const text = item.ability_name + (item.ability_option || "");
    const idx = sortPriority.findIndex((k) => text.includes(k));
    return idx === -1 ? 999 : idx;
  };

  groups.forEach((g) => g.sort((a, b) => getPriority(a) - getPriority(b)));

  // 렌더링
  return (
    <div className="space-y-8">
      {groups.map((groupAbilities, groupIndex) => {
        const count = groupAbilities.length;
        if (count === 0) return null;

        // 너비 설정
        let containerWidthClass = "w-full";
        if (count === 2) containerWidthClass = "w-full md:w-2/3";
        else if (count === 1) containerWidthClass = "w-full md:w-1/3";

        return (
          <div
            key={groupIndex}
            className={`mx-auto flex flex-col ${containerWidthClass}`}
          >
            <h3 className="bg-muted-foreground/30 rounded-t-md py-1.5 text-center text-sm font-bold shadow-sm md:text-base">
              {GROUP_TITLES[groupIndex]}
            </h3>

            <div
              className={`grid grid-cols-1 gap-2 ${
                count >= 3
                  ? "md:grid-cols-3"
                  : count === 2
                    ? "md:grid-cols-2"
                    : "md:grid-cols-1"
              }`}
            >
              {groupAbilities.map((ability) => (
                <div key={ability.ability_no} className="w-full">
                  <GuildAbilityCard ability={ability} />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
