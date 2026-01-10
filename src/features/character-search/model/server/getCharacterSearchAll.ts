import "server-only";
import { ALL_WORLD_NAME, WORLD_NAMES } from "@/shared/config/constants/worlds";
import { fetchOcid } from "@/entities/character/api/server/ocid.server";
import type { CharacterOcidData } from "@/entities/character/model/types";
import { unstable_cache } from "next/cache";

const SEARCH_ALL_CACHE_SECONDS = 60 * 5;

async function searchAllWorlds(name: string): Promise<CharacterOcidData[]> {
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

  return characters;
}

const getCharacterSearchAllCached = unstable_cache(
  async (normalizedName: string) => searchAllWorlds(normalizedName),
  ["character-search-all-v1"],
  { revalidate: SEARCH_ALL_CACHE_SECONDS },
);

export async function getCharacterSearchAll(name: string) {
  const normalized = name.trim();
  if (!normalized) return [];
  return getCharacterSearchAllCached(normalized);
}
