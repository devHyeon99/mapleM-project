import { describe, expect, it } from "vitest";
import type { GuildAbility } from "../model/types";
import { groupGuildAbilities } from "./groupGuildAbilities";

function createAbility(ability_no: number, ability_name: string): GuildAbility {
  return {
    ability_no,
    ability_name,
    ability_level: 1,
    ability_option: "",
    ability_icon: "",
  };
}

const names = (group: GuildAbility[]) => group.map((a) => a.ability_name);

describe("groupGuildAbilities", () => {
  it("이름이 겹치는 차수를 ability_no 순으로 앞 차수부터 채운다", () => {
    const groups = groupGuildAbilities([
      createAbility(6, "마법 대미지 증가"),
      createAbility(1, "힘으로 밀어붙이기"),
      createAbility(4, "대장의 자질"),
      createAbility(3, "지능으로 밀어붙이기"),
      createAbility(2, "물리 대미지 증가"),
      createAbility(5, "보스 공격력 증가"),
    ]);

    // ability_no 1~3이 1차, 4~6이 2차
    expect(names(groups[0])).toEqual([
      "힘으로 밀어붙이기",
      "물리 대미지 증가",
      "지능으로 밀어붙이기",
    ]);
    expect(names(groups[1])).toEqual([
      "마법 대미지 증가",
      "대장의 자질",
      "보스 공격력 증가",
    ]);
  });

  it("차수별 그룹에 배치하고 빈 차수는 자리를 유지한다", () => {
    const groups = groupGuildAbilities([
      createAbility(10, "극한의 한계 돌파"),
      createAbility(9, "욕망의 최강자"),
      createAbility(7, "물리 공격력 증가"),
      createAbility(8, "상점 할인"),
    ]);

    expect(groups).toHaveLength(8);
    expect(names(groups[2])).toEqual(["물리 공격력 증가"]);
    expect(names(groups[3])).toEqual(["상점 할인"]);
    expect(names(groups[6])).toEqual(["욕망의 최강자"]);
    expect(names(groups[7])).toEqual(["극한의 한계 돌파"]);
    expect(groups[0]).toEqual([]);
    expect(groups[4]).toEqual([]);
  });

  it("치명타·피버는 ability_no 순으로 2개씩 5차와 6차로 나뉜다", () => {
    const groups = groupGuildAbilities([
      createAbility(14, "피버 지속시간 증가"),
      createAbility(11, "치명타 확률 증가"),
      createAbility(13, "치명타 대미지 증가"),
      createAbility(12, "피버 게이지 증가"),
    ]);

    expect(names(groups[4])).toEqual([
      "치명타 확률 증가",
      "피버 게이지 증가",
    ]);
    expect(names(groups[5])).toEqual([
      "치명타 대미지 증가",
      "피버 지속시간 증가",
    ]);
  });
});
