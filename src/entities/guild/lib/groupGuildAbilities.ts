import type { GuildAbility } from "../model/types";

// 넥슨 API는 어빌리티가 몇 차인지 내려주지 않아 이름·옵션 키워드로 차수를 역추정한다.
const KEYWORDS = {
  // 1차, 2차 (중복 이름 존재 -> ability_no가 낮은 순서가 1차로 분리)
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
  // 5차, 6차 (중복 이름 존재 -> ability_no가 낮은 순서가 5차로 분리)
  CRIT_FEVER: ["치명타", "피버"],
  // 7차
  MAX_DMG_A: ["욕망의", "최강"],
  // 8차
  MAX_DMG_B: ["극한의", "한계"],
};

// 그룹 내부 표시 순서
const SORT_PRIORITY = [
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

const searchText = (ability: GuildAbility) =>
  ability.ability_name + (ability.ability_option || "");

const getPriority = (ability: GuildAbility) => {
  const text = searchText(ability);
  const index = SORT_PRIORITY.findIndex((keyword) => text.includes(keyword));
  return index === -1 ? 999 : index;
};

/**
 * 길드 어빌리티를 1차~8차 그룹으로 분류한다.
 * 반환 배열의 index 0이 1차, 7이 8차이며 비어 있는 차수도 자리를 유지한다.
 */
export function groupGuildAbilities(
  abilities: GuildAbility[],
): GuildAbility[][] {
  const groups: GuildAbility[][] = Array.from({ length: 8 }, () => []);
  const damageGroup: GuildAbility[] = []; // 1,2차 임시 보관
  const critFeverGroup: GuildAbility[] = []; // 5,6차 임시 보관

  abilities.forEach((ability) => {
    const text = searchText(ability);
    const has = (keywords: string[]) => keywords.some((k) => text.includes(k));

    // 이름이 확실히 다르므로 순서 상관없이 if-else로 쭉 검사해도 안전함
    if (has(KEYWORDS.MAX_DMG_B)) groups[7].push(ability);
    else if (has(KEYWORDS.MAX_DMG_A)) groups[6].push(ability);
    else if (has(KEYWORDS.DAMAGE)) damageGroup.push(ability);
    else if (has(KEYWORDS.ATTACK)) groups[2].push(ability);
    else if (has(KEYWORDS.UTILITY)) groups[3].push(ability);
    else if (has(KEYWORDS.CRIT_FEVER)) critFeverGroup.push(ability);
  });

  // 이름이 겹치는 차수는 ability_no 오름차순으로 앞 차수부터 채운다
  damageGroup.sort((a, b) => a.ability_no - b.ability_no);
  critFeverGroup.sort((a, b) => a.ability_no - b.ability_no);

  damageGroup.forEach((ability, index) => {
    groups[index < 3 ? 0 : 1].push(ability);
  });
  critFeverGroup.forEach((ability, index) => {
    groups[index < 2 ? 4 : 5].push(ability);
  });

  groups.forEach((group) =>
    group.sort((a, b) => getPriority(a) - getPriority(b)),
  );

  return groups;
}
