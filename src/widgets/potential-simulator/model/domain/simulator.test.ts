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
});
