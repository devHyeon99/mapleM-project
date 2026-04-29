import { describe, expect, it } from "vitest";
import { getStarforce } from "./buildStarforceRows";

describe("getStarforce", () => {
  it("별 5개 세트로 묶고 한 줄에 최대 4세트를 배치한다", () => {
    expect(getStarforce(27)).toEqual([
      [5, 5, 5, 5],
      [5, 2],
    ]);
    expect(getStarforce("17")).toEqual([[5, 5, 5, 2]]);
    expect(getStarforce(20)).toEqual([[5, 5, 5, 5]]);
  });

  it("별이 없거나 숫자로 읽을 수 없으면 빈 배열을 준다", () => {
    expect(getStarforce(0)).toEqual([]);
    expect(getStarforce(-3)).toEqual([]);
    expect(getStarforce(null)).toEqual([]);
    expect(getStarforce("없음")).toEqual([]);
  });
});
