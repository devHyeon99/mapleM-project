import { describe, it, expect } from "vitest";
import { isJobFilterable, readRankingJob } from "./job-filter";

describe("readRankingJob", () => {
  it("직업 목록에 있는 값만 읽는다", () => {
    expect(readRankingJob(new URLSearchParams("job=히어로"))).toBe("히어로");
    expect(readRankingJob(new URLSearchParams("job=아크메이지(썬,콜)"))).toBe(
      "아크메이지(썬,콜)",
    );
  });

  it("없는 직업이나 빈 값은 null 이라 넥슨 데이터를 훑지 않는다", () => {
    expect(readRankingJob(new URLSearchParams("job=없는직업"))).toBeNull();
    expect(readRankingJob(new URLSearchParams("job="))).toBeNull();
    expect(readRankingJob(new URLSearchParams())).toBeNull();
  });
});

describe("isJobFilterable", () => {
  it("캐릭터 직업으로 갈라 볼 랭킹만 거를 수 있다", () => {
    expect(isJobFilterable("level")).toBe(true);
    expect(isJobFilterable("dojang")).toBe(true);
    expect(isJobFilterable("combat-power")).toBe(true);
    expect(isJobFilterable("union")).toBe(false);
    expect(isJobFilterable("achievement")).toBe(false);
    expect(isJobFilterable("sharenian-battlefield")).toBe(false);
  });
});
