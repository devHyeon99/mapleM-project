import { describe, expect, it, vi } from "vitest";

import { DEFAULT_STARFORCE_OPTIONS } from "./data";
import { resolveStarforceRate, simulateStarforce } from "./simulator";
import type { StarforceModifierOptions } from "./types";

function makeContext(
  currentStar: number,
  options: Partial<StarforceModifierOptions> = {},
) {
  return {
    currentStar,
    equipmentCategory: "genesisWeapon" as const,
    options: { ...DEFAULT_STARFORCE_OPTIONS, ...options },
  };
}

function totalOf(rate: {
  success: number;
  keep: number;
  decrease: number;
  destroy: number;
}) {
  return rate.success + rate.keep + rate.decrease + rate.destroy;
}

describe("resolveStarforceRate", () => {
  it("모든 옵션 조합에서 확률 합이 100을 유지한다", () => {
    for (let star = 0; star < 36; star += 1) {
      for (const luckyDayRate of [0, 3, 5, 7, 10] as const) {
        for (const starCatchSuccess of [false, true]) {
          for (const safetyShield of [false, true]) {
            for (const protectShield of [false, true]) {
              const rate = resolveStarforceRate(
                makeContext(star, {
                  luckyDayRate,
                  starCatchSuccess,
                  safetyShield,
                  protectShield,
                }),
              );

              expect(totalOf(rate)).toBeCloseTo(100, 3);
              expect(Math.min(...Object.values(rate))).toBeGreaterThanOrEqual(
                0,
              );
            }
          }
        }
      }
    }
  });

  it("스타캐치와 럭키데이는 유지/하락/파괴 확률을 깎아 성공 확률로 옮긴다", () => {
    // 15성 -> 16성 기본: 성공 10 / 유지 70 / 하락 15 / 파괴 5
    const base = resolveStarforceRate(
      makeContext(15, { starCatchSuccess: false }),
    );
    expect(base.success).toBe(10);

    const boosted = resolveStarforceRate(
      makeContext(15, { starCatchSuccess: true, luckyDayRate: 10 }),
    );
    expect(boosted.success).toBe(25);
    expect(boosted.keep).toBe(55);
    expect(boosted.decrease).toBe(15);
    expect(boosted.destroy).toBe(5);
  });

  it("쉴드는 해당 확률을 유지 확률로 흡수한다", () => {
    const rate = resolveStarforceRate(
      makeContext(15, {
        starCatchSuccess: false,
        safetyShield: true,
        protectShield: true,
      }),
    );

    expect(rate.decrease).toBe(0);
    expect(rate.destroy).toBe(0);
    expect(rate.keep).toBe(90);
  });

  it("성공 확률 증가분이 남은 확률보다 크면 성공 100%에서 멈춘다", () => {
    // 1성 기본: 성공 95 / 유지 5 -> 스타캐치 5 + 럭키데이 10 은 5까지만 반영된다.
    const rate = resolveStarforceRate(
      makeContext(0, { starCatchSuccess: true, luckyDayRate: 10 }),
    );

    expect(rate.success).toBe(100);
    expect(totalOf(rate)).toBe(100);
  });
});

describe("simulateStarforce", () => {
  it("성공하면 한 성 오르고 하락하면 한 성 내려간다", () => {
    const randomSpy = vi.spyOn(Math, "random");

    try {
      // 16성 도전(성공 10 + 스타캐치 5 = 15) -> roll 0 은 성공.
      randomSpy.mockReturnValue(0);
      const success = simulateStarforce(makeContext(15));
      expect(success.outcome).toBe("success");
      expect(success.nextStar).toBe(16);
      expect(success.targetStar).toBe(16);

      // 성공 15 + 유지 65 누적(80) 이후 구간 -> 하락.
      randomSpy.mockReturnValue(0.85);
      const decrease = simulateStarforce(makeContext(15));
      expect(decrease.outcome).toBe("decrease");
      expect(decrease.nextStar).toBe(14);
    } finally {
      randomSpy.mockRestore();
    }
  });

  it("최대 성수를 넘어서지 않는다", () => {
    const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0);

    try {
      // 루타비스는 31성이 최대.
      const result = simulateStarforce({
        currentStar: 30,
        equipmentCategory: "rootAbyss",
        options: DEFAULT_STARFORCE_OPTIONS,
      });

      expect(result.targetStar).toBe(31);
      expect(result.nextStar).toBe(31);
    } finally {
      randomSpy.mockRestore();
    }
  });

  it("0성에서 하락해도 음수가 되지 않는다", () => {
    const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0.99);

    try {
      const result = simulateStarforce(makeContext(0));
      expect(result.nextStar).toBeGreaterThanOrEqual(0);
    } finally {
      randomSpy.mockRestore();
    }
  });
});
