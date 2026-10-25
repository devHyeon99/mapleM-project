import "server-only";
import { ALL_WORLD_NAME, WORLD_NAMES } from "@/shared/config/constants/worlds";
import { CHARACTER_NAME_REGEX } from "@/shared/config/constants/character";
import { fetchOcid } from "@/entities/character/server";
import { unstable_cache } from "next/cache";

const SEARCH_ALL_CACHE_SECONDS = 60 * 5;
const SEARCH_WORLDS = WORLD_NAMES.filter((w) => w !== ALL_WORLD_NAME);

/** 클라이언트로 내려가는 값이라 ocid 는 뺌 */
export interface CharacterSearchHit {
  world_name: string;
  character_name: string;
}

export interface CharacterSearchAllResult {
  characters: CharacterSearchHit[];
  failedWorlds: number;
}

const EMPTY_RESULT: CharacterSearchAllResult = {
  characters: [],
  failedWorlds: 0,
};

/** 부분 실패 결과를 캐시 밖으로 꺼내기 위한 운반용 에러 */
class PartialSearchError extends Error {
  constructor(readonly result: CharacterSearchAllResult) {
    super("partial character search");
  }
}

async function searchAllWorlds(
  name: string,
): Promise<CharacterSearchAllResult> {
  const settled = await Promise.allSettled(
    SEARCH_WORLDS.map((world) => fetchOcid(world, name)),
  );

  const characters: CharacterSearchHit[] = [];
  let failedWorlds = 0;
  for (const r of settled) {
    if (r.status === "rejected") failedWorlds++;
    else if (r.value)
      characters.push({
        world_name: r.value.world_name,
        character_name: r.value.character_name,
      });
  }

  return { characters, failedWorlds };
}

// unstable_cache 는 reject 를 저장하지 않으므로, 일부 월드가 실패한 결과는 throw 로
// 캐시 쓰기 자체를 건너뜀. 반쪽 결과가 5분간 고정되는 것과 버려질 쓰기를 함께 막음
const getCharacterSearchAllCached = unstable_cache(
  async (name: string) => {
    const result = await searchAllWorlds(name);
    if (result.failedWorlds > 0) throw new PartialSearchError(result);
    return result;
  },
  ["character-search-all-v2"],
  { revalidate: SEARCH_ALL_CACHE_SECONDS },
);

export async function getCharacterSearchAll(
  name: string,
): Promise<CharacterSearchAllResult> {
  const normalized = name.trim();
  // URL 직접 진입도 막아야 하므로 클라이언트와 같은 규칙으로 서버에서 다시 거름.
  // 규칙 밖 이름은 넥슨 호출·캐시 쓰기 없이 빈 결과
  if (!CHARACTER_NAME_REGEX.test(normalized)) return EMPTY_RESULT;

  try {
    return await getCharacterSearchAllCached(normalized);
  } catch (e) {
    if (e instanceof PartialSearchError) return e.result;
    throw e;
  }
}
