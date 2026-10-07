import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("server-only", () => ({}));

// 날짜별 표식을 흉내 내는 메모리 캐시. 같은 키면 콜백을 다시 돌리지 않음
const store = new Map<string, unknown>();
const revalidateTag = vi.fn();
vi.mock("next/cache", () => ({
  revalidateTag: (...args: unknown[]) => revalidateTag(...args),
  unstable_cache:
    (fn: () => Promise<unknown>, keyParts: string[]) => async () => {
      const key = keyParts.join("|");
      if (!store.has(key)) store.set(key, await fn());
      return store.get(key);
    },
}));

const nexonFetch = vi.fn();
vi.mock("@/shared/api/nexon/server", () => ({
  nexonFetch: (...args: unknown[]) => nexonFetch(...args),
}));

vi.mock("@/entities/ranking/server", () => ({
  RANKING_DATE_TAG: "ranking-date",
  rankingDataTag: (date: string) => `ranking-data:${date}`,
}));

const { GET } = await import("./route");

const call = (token = "secret") =>
  GET(
    new Request("https://x/api/cron/ranking-date", {
      headers: { authorization: `Bearer ${token}` },
    }),
  ).then((res) => res.json());

describe("랭킹 기준일 크론", () => {
  beforeEach(() => {
    process.env.CRON_SECRET = "secret";
    store.clear();
    revalidateTag.mockReset();
    nexonFetch.mockReset();
  });

  it("시크릿이 틀리면 막음", async () => {
    const res = await GET(
      new Request("https://x", { headers: { authorization: "Bearer nope" } }),
    );
    expect(res.status).toBe(401);
  });

  it("아직 안 올라왔으면 털지 않음", async () => {
    nexonFetch.mockResolvedValue({ ranking: [] });
    expect(await call()).toMatchObject({ published: false });

    nexonFetch.mockRejectedValue(new Error("not ready"));
    expect(await call()).toMatchObject({ published: false });

    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it("처음 확인한 날에만 한 번 털어냄", async () => {
    nexonFetch.mockResolvedValue({ ranking: [{ ranking: 1 }] });

    const first = await call();
    expect(first).toMatchObject({ published: true, revalidated: true });
    expect(revalidateTag).toHaveBeenCalledWith("ranking-date", { expire: 0 });
    expect(revalidateTag).toHaveBeenCalledWith(`ranking-data:${first.date}`, {
      expire: 0,
    });

    revalidateTag.mockClear();
    expect(await call()).toMatchObject({ published: true, revalidated: false });
    expect(revalidateTag).not.toHaveBeenCalled();
  });
});
