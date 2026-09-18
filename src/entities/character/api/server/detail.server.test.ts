import { beforeEach, describe, expect, it, vi } from "vitest";

const requested: string[] = [];
let releaseRankingDate: (date: string) => void = () => {};

vi.mock("server-only", () => ({}));

vi.mock("@/shared/api/nexon/server", () => ({
  nexonFetch: vi.fn(async (path: string) => {
    requested.push(path.split("?")[0]);
    return { ranking: [{}] };
  }),
}));

vi.mock("@/shared/api/nexon/handler", () => ({
  isNexonNotFoundError: () => false,
}));

vi.mock("@/entities/ranking/server", () => ({
  resolveRankingDate: () =>
    new Promise<string>((resolve) => {
      releaseRankingDate = resolve;
    }),
}));

describe("fetchCharacterDetail", () => {
  beforeEach(() => {
    requested.length = 0;
  });

  it("기준일이 정해지기 전에 날짜와 무관한 요청을 먼저 보낸다", async () => {
    const { fetchCharacterDetail } = await import("./detail.server");

    const pending = fetchCharacterDetail("test-ocid");
    await new Promise((resolve) => setTimeout(resolve, 0));

    // 기준일 판정은 아직 끝나지 않았다.
    expect(requested).toEqual([
      "/character/basic",
      "/character/item-equipment",
      "/character/guild",
      "/character/android-equipment",
      "/user/union",
    ]);

    releaseRankingDate("2026-09-18");
    await pending;

    expect(requested.slice(5)).toEqual(["/ranking/level", "/ranking/union"]);
  });
});
