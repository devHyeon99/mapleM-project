import { describe, expect, it } from "vitest";
import {
  normalizeOptionName,
  parseNumericOptionValue,
} from "./parseOptionValues";

describe("parseNumericOptionValue", () => {
  it("부호, 백분율, 천단위 구분자가 붙은 값을 숫자로 변환한다", () => {
    expect(parseNumericOptionValue("12%")).toBe(12);
    expect(parseNumericOptionValue("+1,200")).toBe(1200);
    expect(parseNumericOptionValue("-3.5%")).toBe(-3.5);
  });

  it("숫자가 여러 개인 값은 첫 번째 숫자만 사용한다", () => {
    expect(parseNumericOptionValue("12% ~ 15%")).toBe(12);
  });

  it("숫자가 없거나 빈 값은 0으로 처리한다", () => {
    expect(parseNumericOptionValue("")).toBe(0);
    expect(parseNumericOptionValue(null)).toBe(0);
    expect(parseNumericOptionValue("없음")).toBe(0);
  });
});

describe("normalizeOptionName", () => {
  it("별칭과 불규칙한 공백을 표준 옵션명으로 정리한다", () => {
    expect(normalizeOptionName("마댐")).toBe("마법 대미지");
    expect(normalizeOptionName(" 보공 ")).toBe("보스 공격력");
    expect(normalizeOptionName("최종  대미지")).toBe("최종 대미지");
  });
});
