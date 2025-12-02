import { WORLD_NAMES } from "@/shared/config/constants/worlds";
import { fetchOcid } from "@/shared/api/character/ocid.server";
import type { CharacterOcidData } from "@/entities/character";
import { normalizeCharacterName } from "@/shared/lib/character";
import { unstable_cache } from "next/cache";

const SEARCH_ALL_CACHE_SECONDS = 60 * 5;

async function searchAllWorlds(name: string): Promise<CharacterOcidData[]> {
  const worlds = WORLD_NAMES.filter((w) => w !== "전체");

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

  if (characters.length > 0) return characters;

  const rejected = settled.filter(
    (r): r is PromiseRejectedResult => r.status === "rejected",
  );

  if (rejected.length > 0) throw rejected[0].reason;

  return [];
}

const getCharacterSearchAllCached = unstable_cache(
  async (normalizedName: string) => searchAllWorlds(normalizedName),
  ["character-search-all-v1"],
  { revalidate: SEARCH_ALL_CACHE_SECONDS },
);

export async function getCharacterSearchAll(name: string) {
  const normalized = normalizeCharacterName(name);
  return getCharacterSearchAllCached(normalized);
}
