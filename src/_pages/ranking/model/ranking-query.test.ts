import { describe, it, expect } from "vitest";
import { parseRankingFilters } from "./ranking-query";

describe("parseRankingFilters", () => {
  it("세그먼트가 없으면 전체 월드 1페이지다", () => {
    expect(parseRankingFilters(undefined)).toEqual({ page: 1 });
    expect(parseRankingFilters([])).toEqual({ page: 1 });
  });

  it("월드 슬러그와 페이지를 읽는다", () => {
    expect(parseRankingFilters(["scania"])).toEqual({
      worldName: "스카니아",
      page: 1,
    });
    expect(parseRankingFilters(["all", "3"])).toEqual({ page: 3 });
    expect(parseRankingFilters(["luna", "12"])).toEqual({
      worldName: "루나",
      page: 12,
    });
  });

  it("영문화 이전에 공유된 한글 월드 경로도 읽는다", () => {
    expect(parseRankingFilters(["스카니아"])).toEqual({
      worldName: "스카니아",
      page: 1,
    });
  });

  it("형태가 어긋나면 null 을 돌려 404 로 보낸다", () => {
    expect(parseRankingFilters(["없는월드"])).toBeNull();
    expect(parseRankingFilters(["scania", "0"])).toBeNull();
    // 앞자리 0 은 같은 내용의 다른 URL 이 된다
    expect(parseRankingFilters(["scania", "01"])).toBeNull();
    expect(parseRankingFilters(["scania", "-1"])).toBeNull();
    expect(parseRankingFilters(["scania", "1", "2"])).toBeNull();
  });

  it("깨진 퍼센트 인코딩에 예외를 던지지 않는다", () => {
    expect(parseRankingFilters(["%ZZ"])).toBeNull();
  });
});
