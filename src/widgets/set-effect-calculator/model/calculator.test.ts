import { describe, expect, it } from "vitest";

import {
  buildComparisonRows,
  buildResultFromState,
  getClampedStarForce,
} from "./calculator";
import type { BuildState } from "./types";

const buildRow = (
  setId: string,
  count: number,
  starForce = 0,
): BuildState[number] => ({ id: `${setId}-row`, setId, count, starForce });

describe("buildResultFromState 아케인셰이드 보정", () => {
  it("아케인셰이드 1종은 앱솔랩스 세트 수를 1 보정한다", () => {
    const { activeSets } = buildResultFromState([
      buildRow("arcane-shade", 1, 70),
      buildRow("absolabs", 6, 108),
    ]);

    const absolabs = activeSets.find((set) => set.id === "absolabs");
    const arcaneShade = activeSets.find((set) => set.id === "arcane-shade");

    expect(absolabs?.count).toBe(7);
    expect(absolabs?.correctedFromArcaneShade).toBe(true);
    // 아케인셰이드 스타포스가 앱솔랩스에 합산돼 140 구간을 넘긴다
    expect(absolabs?.totalStarForce).toBe(178);
    expect(arcaneShade?.totalStarForce).toBe(70);
  });

  it("아케인셰이드 2종부터는 보정이 해제된다", () => {
    const { activeSets } = buildResultFromState([
      buildRow("arcane-shade", 2),
      buildRow("absolabs", 6),
    ]);

    const absolabs = activeSets.find((set) => set.id === "absolabs");

    expect(absolabs?.count).toBe(6);
    expect(absolabs?.correctedFromArcaneShade).toBe(false);
  });

  it("앱솔랩스를 고르지 않으면 보정하지 않는다", () => {
    const { activeSets } = buildResultFromState([buildRow("arcane-shade", 1)]);

    expect(activeSets.find((set) => set.id === "absolabs")).toBeUndefined();
  });
});

describe("getClampedStarForce", () => {
  it("0 ~ 세트 최고 구간 범위로 자른다", () => {
    expect(getClampedStarForce("absolabs", 108)).toBe(108);
    expect(getClampedStarForce("absolabs", -5)).toBe(0);
    expect(getClampedStarForce("absolabs", 9999)).toBe(280);
    // 스타포스 효과가 없는 세트는 항상 0
    expect(getClampedStarForce("dawn-boss", 50)).toBe(0);
  });
});

describe("buildComparisonRows", () => {
  const effect = (key: string, label: string, value: number) =>
    ({ key, label, unit: "%", value }) as const;

  it("한쪽에만 있는 스탯도 0 기준으로 채워 한 줄로 묶는다", () => {
    const rows = buildComparisonRows(
      [effect("bossAttack", "보스 공격력 증가", 20)],
      [effect("finalDamage", "최종 대미지", 12)],
    );

    expect(
      rows.map((row) => [row.label, row.valueA, row.valueB, row.delta]),
    ).toEqual([
      ["보스 공격력 증가", 20, 0, -20],
      ["최종 대미지", 0, 12, 12],
    ]);
  });

  it("값이 같은 스탯도 남기고 이름 순서를 유지한다", () => {
    const rows = buildComparisonRows(
      [effect("bossAttack", "보스 공격력 증가", 20)],
      [effect("bossAttack", "보스 공격력 증가", 20)],
    );

    expect(rows).toHaveLength(1);
    expect(rows[0].delta).toBe(0);
  });
});
