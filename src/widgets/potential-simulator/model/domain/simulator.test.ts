import { describe, expect, it, vi } from "vitest";
import { simulateAdditionalOption } from "./simulator";

describe("simulateAdditionalOption", () => {
  it("2줄 결과에서 같은 옵션이 중복되어 나올 수 있다", () => {
    const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0);

    try {
      const result = simulateAdditionalOption({
        flameType: "eternal",
        equipmentCategory: "armor",
        equipmentLevel: 140,
        heartGrade: 2,
        forceTwoLines: true,
      });

      expect(result).not.toBeNull();
      expect(result?.lineCount).toBe(2);
      expect(result?.options).toHaveLength(2);
      expect(result?.options[0]?.key).toBe(result?.options[1]?.key);
    } finally {
      randomSpy.mockRestore();
    }
  });

  it("2줄 결과에서 서로 다른 옵션이 나오는 경우도 유지된다", () => {
    for (let i = 0; i < 300; i += 1) {
      const result = simulateAdditionalOption({
        flameType: "eternal",
        equipmentCategory: "armor",
        equipmentLevel: 200,
        heartGrade: 2,
        forceTwoLines: true,
      });

      expect(result).not.toBeNull();
      expect(result?.lineCount).toBe(2);
      expect(result?.options).toHaveLength(2);
      expect(result?.options.every((option) => Boolean(option.key))).toBe(true);
    }
  });

  it("포켓 장비는 200 레벨 확률표가 없어 null을 반환한다", () => {
    const supported = simulateAdditionalOption({
      flameType: "eternal",
      equipmentCategory: "pocket",
      equipmentLevel: 180,
      heartGrade: null,
    });
    const unsupported = simulateAdditionalOption({
      flameType: "eternal",
      equipmentCategory: "pocket",
      equipmentLevel: 200,
      heartGrade: null,
    });

    expect(supported).not.toBeNull();
    expect(unsupported).toBeNull();
  });

  it("기계심장은 등급이 선택되지 않으면 null을 반환한다", () => {
    const result = simulateAdditionalOption({
      flameType: "eternal",
      equipmentCategory: "heart",
      equipmentLevel: null,
      heartGrade: null,
    });

    expect(result).toBeNull();
  });

  it("옵션 값이 step 단위 정밀도를 벗어나지 않는다", () => {
    for (let i = 0; i < 300; i += 1) {
      const result = simulateAdditionalOption({
        flameType: "eternal",
        equipmentCategory: "armor",
        equipmentLevel: 200,
        heartGrade: null,
      });

      for (const option of result?.options ?? []) {
        const decimals = option.step.toString().split(".")[1]?.length ?? 0;
        expect(option.value).toBe(Number(option.value.toFixed(decimals)));
      }
    }
  });
});
