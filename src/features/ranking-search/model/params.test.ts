import { describe, it, expect } from "vitest";
import { rankingSearchTargetHref, readRankingSearchQuery } from "./params";

describe("readRankingSearchQuery", () => {
  it("월드와 닉네임이 모두 유효하면 검색 조건을 돌려준다", () => {
    expect(
      readRankingSearchQuery({ find_world: "스카니아", find_name: " 발자취 " }),
    ).toEqual({ world: "스카니아", name: "발자취" });
  });

  it("존재하지 않는 월드나 규칙에 안 맞는 닉네임은 검색하지 않는다", () => {
    expect(
      readRankingSearchQuery({ find_world: "없는월드", find_name: "발자취" }),
    ).toBeNull();
    // ocid 조회는 월드가 특정돼야 하므로 "전체" 는 대상이 아니다
    expect(
      readRankingSearchQuery({ find_world: "전체", find_name: "발자취" }),
    ).toBeNull();
    expect(
      readRankingSearchQuery({ find_world: "스카니아", find_name: "가" }),
    ).toBeNull();
    expect(
      readRankingSearchQuery({ find_world: "스카니아", find_name: "발자취!" }),
    ).toBeNull();
    expect(readRankingSearchQuery({ find_world: "스카니아" })).toBeNull();
  });
});

describe("rankingSearchTargetHref", () => {
  const query = { world: "스카니아", name: "발자취" };
  const paramsOf = (href: string) =>
    new URL(href, "https://mmgg.gg").searchParams;

  it("월드 필터와 페이지를 건 URL 에 검색 조건을 유지한다", () => {
    const params = paramsOf(
      rankingSearchTargetHref(query, { page: 7, worldName: "스카니아" }),
    );

    expect(params.get("world_name")).toBe("스카니아");
    expect(params.get("page")).toBe("7");
    expect(params.get("find_world")).toBe("스카니아");
    expect(params.get("find_name")).toBe("발자취");
  });

  it("월드를 생략하면 전체 월드 목록으로 보낸다", () => {
    const params = paramsOf(rankingSearchTargetHref(query, { page: 19 }));

    expect(params.get("world_name")).toBeNull();
    expect(params.get("page")).toBe("19");
    expect(params.get("find_name")).toBe("발자취");
  });
});
