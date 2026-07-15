import { describe, it, expect } from "vitest";
import { formatKoreanNumber } from "./format-korean-number";

describe("formatKoreanNumber", () => {
  it("만 단위로 끊어 읽는다", () => {
    expect(formatKoreanNumber(2091045036)).toBe("20억 9104만 5036");
    expect(formatKoreanNumber(1160708352)).toBe("11억 6070만 8352");
    expect(formatKoreanNumber(12345)).toBe("1만 2345");
    // 시간의 근원 최대 데미지는 조 단위까지 감
    expect(formatKoreanNumber(174785378861079)).toBe("174조 7853억 7886만 1079");
  });

  it("비어 있는 자리는 건너뛴다", () => {
    expect(formatKoreanNumber(20000000)).toBe("2000만");
    expect(formatKoreanNumber(100000001)).toBe("1억 1");
    expect(formatKoreanNumber(5036)).toBe("5036");
  });

  it("0 과 음수를 그대로 다룬다", () => {
    expect(formatKoreanNumber(0)).toBe("0");
    expect(formatKoreanNumber(-12345)).toBe("-1만 2345");
  });
});
