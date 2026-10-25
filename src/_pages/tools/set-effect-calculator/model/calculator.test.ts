import { describe, expect, it } from "vitest";

import {
  buildComparisonRows,
  buildResultFromState,
  getClampedStarForce,
} from "./calculator";

describe("buildResultFromState", () => {
  it("같은 세트를 나눠 담은 행을 합치고 세트 상한으로 자른다", () => {
    const { activeSets } = buildResultFromState([
      { id: "a", setId: "absolabs", count: 5, starForce: 60 },
      { id: "b", setId: "absolabs", count: 4, starForce: 48 },
    ]);

    // 5 + 4 = 9 지만 앱솔랩스 상한은 7, 스타포스는 상한 없이 합산됨
    expect(activeSets).toHaveLength(1);
    expect(activeSets[0].count).toBe(7);
    expect(activeSets[0].totalStarForce).toBe(108);
  });

  it("선택 안 함과 0세트 행은 계산에서 빠진다", () => {
    const { activeSets, totalEffects } = buildResultFromState([
      { id: "a", setId: "none", count: 3, starForce: 30 },
      { id: "b", setId: "absolabs", count: 0, starForce: 60 },
    ]);

    expect(activeSets).toEqual([]);
    expect(totalEffects).toEqual([]);
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
