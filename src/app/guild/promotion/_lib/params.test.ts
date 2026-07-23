import { describe, it, expect } from "vitest";
import { promotionHref, readPromotionQuery } from "./params";

describe("readPromotionQuery", () => {
  it("빈 쿼리는 전체 월드·최신순·1페이지로 떨어진다", () => {
    expect(readPromotionQuery({})).toEqual({
      world: undefined,
      sort: "latest",
      page: 1,
    });
  });

  it("유효한 값은 그대로 읽는다", () => {
    expect(
      readPromotionQuery({ world: "스카니아", sort: "oldest", page: "3" }),
    ).toEqual({ world: "스카니아", sort: "oldest", page: 3 });
  });

  it("사용자가 손으로 고친 값은 기본값으로 떨어뜨린다", () => {
    // "전체" 는 실제 월드가 아니라 필터 대상이 아니다
    expect(readPromotionQuery({ world: "전체" }).world).toBeUndefined();
    expect(readPromotionQuery({ world: "없는월드" }).world).toBeUndefined();
    // 같은 키가 두 번 오면 배열로 들어온다
    expect(
      readPromotionQuery({ world: ["스카니아", "루나"] }).world,
    ).toBeUndefined();
    expect(readPromotionQuery({ sort: "랜덤" }).sort).toBe("latest");
  });

  it("페이지는 1 이상 정수만 받는다", () => {
    expect(readPromotionQuery({ page: "0" }).page).toBe(1);
    expect(readPromotionQuery({ page: "-2" }).page).toBe(1);
    expect(readPromotionQuery({ page: "1.5" }).page).toBe(1);
    expect(readPromotionQuery({ page: "두번째" }).page).toBe(1);
  });
});

describe("promotionHref", () => {
  it("기본값은 빼서 URL 을 짧게 유지한다", () => {
    expect(promotionHref({ world: undefined, sort: "latest", page: 1 })).toBe(
      "/guild/promotion",
    );
  });

  it("기본값이 아닌 것만 쿼리에 싣는다", () => {
    expect(promotionHref({ world: "스카니아", sort: "latest", page: 1 })).toBe(
      "/guild/promotion?world=%EC%8A%A4%EC%B9%B4%EB%8B%88%EC%95%84",
    );
    expect(promotionHref({ world: undefined, sort: "oldest", page: 2 })).toBe(
      "/guild/promotion?sort=oldest&page=2",
    );
  });

  it("읽은 쿼리를 다시 링크로 만들면 같은 값으로 돌아온다", () => {
    const query = readPromotionQuery({
      world: "루나",
      sort: "oldest",
      page: "4",
    });
    const params = Object.fromEntries(
      new URL(promotionHref(query), "https://maplemgg.com").searchParams,
    );

    expect(readPromotionQuery(params)).toEqual(query);
  });
});
