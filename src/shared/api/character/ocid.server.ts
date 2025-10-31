import "server-only";
import { nexonFetch } from "@/shared/api/nexon/server";
import { isNexonNotFoundError } from "@/shared/api/nexon/handler";
import type { CharacterOcidData } from "@/entities/character";
import { unstable_cache } from "next/cache";

const OCID_CACHE_SECONDS = 60 * 60 * 24;
const OCID_NOT_FOUND_ERROR = "OCID_NOT_FOUND";

const fetchOcidCached = unstable_cache(
  async (world: string, name: string): Promise<CharacterOcidData> => {
    try {
      const { ocid } = await nexonFetch<{ ocid: string }>(
        `/id?character_name=${encodeURIComponent(name)}&world_name=${encodeURIComponent(world)}`,
      );
      return { world_name: world, ocid, character_name: name };
    } catch (e: unknown) {
      // not-found는 throw 처리해서 캐시에 저장되지 않도록 한다.
      if (isNexonNotFoundError(e)) {
        throw new Error(OCID_NOT_FOUND_ERROR);
      }
      throw e;
    }
  },
  ["character-ocid-v1"],
  { revalidate: OCID_CACHE_SECONDS },
);

// 내부 API 라우트를 거치지 않고 바로 넥슨 API를 찌르는 순수 함수
export async function fetchOcid(
  world: string,
  name: string,
): Promise<CharacterOcidData | null> {
  try {
    return await fetchOcidCached(world, name);
  } catch (e: unknown) {
    if (e instanceof Error && e.message === OCID_NOT_FOUND_ERROR) return null;
    throw e;
  }
}
