import "server-only";
import { ALL_WORLD_NAME, WORLD_NAMES } from "@/shared/config/constants/worlds";
import { fetchOcid } from "@/entities/character/server";
import type { CharacterOcidData } from "@/entities/character";
import { unstable_cache } from "next/cache";

const SEARCH_ALL_CACHE_SECONDS = 60 * 5;

export interface CharacterSearchAllResult {
  characters: CharacterOcidData[];
  failedWorlds: number;
}

async function searchAllWorlds(
  name: string,
): Promise<CharacterSearchAllResult> {
  const worlds = WORLD_NAMES.filter((w) => w !== ALL_WORLD_NAME);

  const settled = await Promise.allSettled(
    worlds.map((world) => fetchOcid(world, name)),
  );

  const characters = settled
    .filter(
      (r): r is PromiseFulfilledResult<CharacterOcidData | null> =>
        r.status === "fulfilled",
    )
    .map((r) => r.value)
    .filter((v): v is CharacterOcidData => v !== null);

  return {
    characters,
    failedWorlds: settled.filter((r) => r.status === "rejected").length,
  };
}

const getCharacterSearchAllCached = unstable_cache(
  async (normalizedName: string) => searchAllWorlds(normalizedName),
  ["character-search-all-v1"],
  { revalidate: SEARCH_ALL_CACHE_SECONDS },
);

export async function getCharacterSearchAll(
  name: string,
): Promise<CharacterSearchAllResult> {
  const normalized = name.trim();
  if (!normalized) return { characters: [], failedWorlds: 0 };

  const cached = await getCharacterSearchAllCached(normalized);
  if (cached.failedWorlds === 0) return cached;

  // 일부 월드가 실패한 반쪽짜리 결과가 5분간 캐시에 고정되면 실제로 존재하는 캐릭터가
  // 계속 "없음"으로 보인다. 실패가 섞였으면 캐시를 무시하고 다시 조회한다
  return searchAllWorlds(normalized);
}
