import { describe, it, expect } from "vitest";
import { rankingHref } from "./ranking-href";

describe("rankingHref", () => {
  it("기본값인 꼬리 세그먼트를 지운다", () => {
    expect(rankingHref("level")).toBe("/ranking");
    expect(rankingHref("dojang")).toBe("/ranking/dojang");
    expect(rankingHref("dojang", { page: 1 })).toBe("/ranking/dojang");
  });

  it("뒤에 값이 오면 기본값이라도 지우지 않는다", () => {
    // level 을 못 지우는 이유와 all 을 못 지우는 이유가 같다.
    expect(rankingHref("level", { worldName: "스카니아" })).toBe(
      "/ranking/level/scania",
    );
    expect(rankingHref("dojang", { page: 3 })).toBe("/ranking/dojang/all/3");
  });

  it("월드와 페이지를 함께 싣는다", () => {
    expect(rankingHref("union", { worldName: "루나", page: 12 })).toBe(
      "/ranking/union/luna/12",
    );
  });
});
