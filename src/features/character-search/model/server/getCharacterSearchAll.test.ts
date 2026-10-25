import { beforeEach, describe, expect, it, vi } from "vitest";

const fetchOcid = vi.fn();
const cacheWrites: unknown[] = [];

vi.mock("server-only", () => ({}));

vi.mock("@/entities/character/index.server", () => ({ fetchOcid }));

// unstable_cache 처럼 resolve 만 저장하고 reject 는 그대로 던짐
vi.mock("next/cache", () => ({
  unstable_cache:
    (fn: (...args: unknown[]) => Promise<unknown>) =>
    async (...args: unknown[]) => {
      const value = await fn(...args);
      cacheWrites.push(value);
      return value;
    },
}));

describe("getCharacterSearchAll", () => {
  beforeEach(() => {
    fetchOcid.mockReset();
    cacheWrites.length = 0;
  });

  it("규칙 밖 이름은 넥슨을 호출하지 않음", async () => {
    const { getCharacterSearchAll } = await import("./getCharacterSearchAll");

    expect(await getCharacterSearchAll("a")).toEqual({
      characters: [],
      failedWorlds: 0,
    });
    expect(await getCharacterSearchAll("<script>")).toEqual({
      characters: [],
      failedWorlds: 0,
    });
    expect(fetchOcid).not.toHaveBeenCalled();
  });

  it("찾은 캐릭터에서 ocid 를 빼고 캐시에 씀", async () => {
    fetchOcid.mockImplementation(async (world: string, name: string) =>
      world === "루나"
        ? { world_name: world, ocid: "secret", character_name: name }
        : null,
    );
    const { getCharacterSearchAll } = await import("./getCharacterSearchAll");

    const result = await getCharacterSearchAll(" 테스트 ");

    expect(result).toEqual({
      characters: [{ world_name: "루나", character_name: "테스트" }],
      failedWorlds: 0,
    });
    expect(JSON.stringify(result)).not.toContain("secret");
    expect(cacheWrites).toHaveLength(1);
  });

  it("일부 월드 실패 시 결과는 돌려주되 캐시에 쓰지 않음", async () => {
    fetchOcid.mockImplementation(async (world: string, name: string) => {
      if (world === "스카니아") throw new Error("timeout");
      return world === "루나"
        ? { world_name: world, ocid: "x", character_name: name }
        : null;
    });
    const { getCharacterSearchAll } = await import("./getCharacterSearchAll");

    const result = await getCharacterSearchAll("테스트");

    expect(result.failedWorlds).toBe(1);
    expect(result.characters).toHaveLength(1);
    expect(cacheWrites).toHaveLength(0);
  });
});
