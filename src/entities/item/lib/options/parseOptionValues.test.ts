import { describe, expect, it } from "vitest";
import {
  normalizeOptionName,
  parseNumericOptionValue,
  splitOptionText,
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

describe("splitOptionText", () => {
  it("천 단위 쉼표는 유지하고 옵션 구분 쉼표로만 나눈다", () => {
    expect(splitOptionText("최대 대미지 119,000,000, 치명타 피해 15%")).toEqual(
      [
        { name: "최대 대미지", value: "119,000,000" },
        { name: "치명타 피해", value: "15%" },
      ],
    );
  });

  it("끝이 수치가 아니면 문장 전체를 옵션명으로 둔다", () => {
    expect(splitOptionText("스킬 사용 가능")).toEqual([
      { name: "스킬 사용 가능", value: "" },
    ]);
    expect(splitOptionText(null)).toEqual([]);
  });
});
