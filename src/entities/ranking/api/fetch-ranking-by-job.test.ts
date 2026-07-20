import { describe, it, expect, vi, beforeEach } from "vitest";
import type { AnyRankingData } from "../model/types/ranking";

vi.mock("server-only", () => ({}));

// unstable_cache 는 캐시만 씌우고 결과를 그대로 돌려주므로 통째로 벗겨 둠
vi.mock("next/cache", () => ({
  unstable_cache: (fn: () => unknown) => fn,
}));

const fetchRankingCached = vi.fn();
vi.mock("./fetch-ranking", () => ({
  fetchRankingCached: (...args: unknown[]) => fetchRankingCached(...args),
}));

const { fetchRankingPageByJob } = await import("./fetch-ranking-by-job");

/** page 번째 API 페이지 200행. 짝수 순위만 히어로가 되게 섞음 */
const apiPage = (page: number, size = 200): AnyRankingData[] =>
  Array.from({ length: size }, (_, i) => {
    const ranking = (page - 1) * 200 + i + 1;
    return {
      date: "2026-09-06",
      ranking,
      world_ranking: ranking,
      world_name: "스카니아",
      character_name: `char${ranking}`,
      character_class: ranking % 2 === 0 ? "히어로" : "비숍",
      character_level: 300,
      guild_name: null,
      guild_mark_icon: null,
    } as AnyRankingData;
  });

const args = {
  type: "level" as const,
  date: "2026-09-06",
  jobName: "히어로",
};

beforeEach(() => fetchRankingCached.mockReset());

describe("fetchRankingPageByJob", () => {
  it("전 페이지를 훑어 거른 결과를 20행씩 자른다", async () => {
    fetchRankingCached.mockImplementation(
      async (_type, _date, _world, page: number) => ({
        ranking: page <= 50 ? apiPage(page) : [],
      }),
    );

    const first = await fetchRankingPageByJob({ ...args, page: 1 });

    // 1만 행 중 짝수 순위 5천 개 → 250페이지
    expect(first.totalPages).toBe(250);
    expect(first.page).toBe(1);
    expect(first.ranking).toHaveLength(20);
    expect(first.ranking[0].ranking).toBe(2);
    expect(first.ranking[19].ranking).toBe(40);

    // 전체 순위는 그대로 두고, 화면에 찍을 직업 순위를 따로 매긴다
    expect(first.ranking.map((r) => r.job_ranking)).toEqual(
      Array.from({ length: 20 }, (_, i) => i + 1),
    );

    // API 페이지 경계(200행=100건=5페이지)를 넘어가는 구간도 이어져야 한다
    const sixth = await fetchRankingPageByJob({ ...args, page: 6 });
    expect(sixth.ranking[0].ranking).toBe(202);
    // 직업 순위는 페이지를 넘어가도 이어진다
    expect(sixth.ranking[0].job_ranking).toBe(101);
  });

  it("빈 페이지가 나오면 뒤는 훑지 않는다", async () => {
    fetchRankingCached.mockImplementation(
      async (_type, _date, _world, page: number) => ({
        ranking: page <= 3 ? apiPage(page) : [],
      }),
    );

    const result = await fetchRankingPageByJob({
      ...args,
      worldName: "스카니아",
      page: 1,
    });

    // 첫 묶음 10페이지만 던지고 멈춤
    expect(fetchRankingCached).toHaveBeenCalledTimes(10);
    expect(result.totalPages).toBe(15); // 600행 중 300건 / 20
  });

  it("요청 페이지가 거른 결과의 마지막을 넘으면 마지막 페이지로 당긴다", async () => {
    fetchRankingCached.mockImplementation(
      async (_type, _date, _world, page: number) => ({
        ranking: page === 1 ? apiPage(1, 30) : [],
      }),
    );

    const result = await fetchRankingPageByJob({ ...args, page: 999 });

    expect(result.totalPages).toBe(1); // 히어로 15명
    expect(result.page).toBe(1);
    expect(result.ranking).toHaveLength(15);
  });

  it("한 명도 없으면 빈 목록에 1페이지다", async () => {
    fetchRankingCached.mockResolvedValue({ ranking: [] });

    const result = await fetchRankingPageByJob({
      ...args,
      jobName: "일리움",
      page: 1,
    });

    expect(result).toEqual({ ranking: [], page: 1, totalPages: 1 });
  });
});
