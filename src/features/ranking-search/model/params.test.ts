import { describe, it, expect } from "vitest";
import {
  rankingSearchTargetHref,
  readRankingSearchQuery,
  readSearchableRankingType,
} from "./params";

/** 화면과 라우트 핸들러 모두 URLSearchParams 를 넘기므로 테스트도 같은 타입으로 준다. */
const sp = (record: Record<string, string>) =>
  readRankingSearchQuery(new URLSearchParams(record));

describe("readRankingSearchQuery", () => {
  it("월드와 닉네임이 모두 유효하면 검색 조건을 돌려준다", () => {
    expect(sp({ find_world: "스카니아", find_name: " 발자취 " })).toEqual({
      world: "스카니아",
      name: "발자취",
    });
  });

  it("존재하지 않는 월드나 규칙에 안 맞는 닉네임은 검색하지 않는다", () => {
    expect(sp({ find_world: "없는월드", find_name: "발자취" })).toBeNull();
    // ocid 조회는 월드가 특정돼야 하므로 "전체" 는 대상이 아니다
    expect(sp({ find_world: "전체", find_name: "발자취" })).toBeNull();
    expect(sp({ find_world: "스카니아", find_name: "가" })).toBeNull();
    expect(sp({ find_world: "스카니아", find_name: "발자취!" })).toBeNull();
    expect(sp({ find_world: "스카니아" })).toBeNull();
  });
});

describe("readSearchableRankingType", () => {
  const typeOf = (type: string) =>
    readSearchableRankingType(new URLSearchParams({ type }));

  it("샤레니안을 뺀 랭킹 종류만 검색 대상이다", () => {
    expect(typeOf("level")).toBe("level");
    expect(typeOf("achievement")).toBe("achievement");
    // 길드 랭킹이라 찾을 캐릭터가 없다
    expect(typeOf("sharenian-battlefield")).toBeNull();
    expect(typeOf("sharenian-waterway")).toBeNull();
    expect(typeOf("없는타입")).toBeNull();
    expect(readSearchableRankingType(new URLSearchParams())).toBeNull();
  });
});

describe("rankingSearchTargetHref", () => {
  const query = { world: "스카니아", name: "발자취" };
  const urlOf = (href: string) => new URL(href, "https://mmgg.gg");

  it("월드 필터와 페이지는 경로에, 검색 조건은 쿼리에 싣는다", () => {
    const url = urlOf(
      rankingSearchTargetHref("level", query, {
        page: 7,
        worldName: "스카니아",
      }),
    );

    expect(url.pathname).toBe("/ranking/level/scania/7");
    expect(url.searchParams.get("find_world")).toBe("스카니아");
    expect(url.searchParams.get("find_name")).toBe("발자취");
  });

  it("월드를 생략하면 전체 월드 목록으로 보낸다", () => {
    const url = urlOf(rankingSearchTargetHref("level", query, { page: 19 }));

    expect(url.pathname).toBe("/ranking/level/all/19");
    expect(url.searchParams.get("find_name")).toBe("발자취");
  });

  it("랭킹 종류는 경로 세그먼트로 나간다", () => {
    const url = urlOf(
      rankingSearchTargetHref("dojang", query, {
        page: 7,
        worldName: "스카니아",
      }),
    );

    expect(url.pathname).toBe("/ranking/dojang/scania/7");
  });
});
