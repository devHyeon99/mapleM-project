import { unstable_cache } from "next/cache";
import { WORLD_NAMES } from "@/shared/config/constants/worlds";
import { fetchOcid } from "@/shared/api/character/ocid.server";
import type { CharacterOcidData } from "@/entities/character";
import { normalizeCharacterName } from "@/shared/lib/character";

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

const _getCharacterSearchAll = unstable_cache(
  async (normalizedName: string) => {
    return searchAllWorlds(normalizedName);
  },
  ["character-search-all"],
  {
    revalidate: 60 * 60 * 24,
  },
);

export async function getCharacterSearchAll(name: string) {
  const normalized = normalizeCharacterName(name);
  return _getCharacterSearchAll(normalized);
}
