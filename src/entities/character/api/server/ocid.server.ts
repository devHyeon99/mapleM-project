import "server-only";
import { nexonFetch } from "@/shared/api/nexon/server";
import { isNexonNotFoundError } from "@/shared/api/nexon/handler";
import type { CharacterOcidData } from "../../model/types/ocid";
import { unstable_cache } from "next/cache";

const OCID_CACHE_SECONDS = 60 * 60 * 24;
const OCID_NOT_FOUND_CACHE_SECONDS = 60 * 5;

function buildOcidEndpoint(world: string, name: string): string {
  return `/id?character_name=${encodeURIComponent(name)}&world_name=${encodeURIComponent(world)}`;
}

const fetchOcidCached = unstable_cache(
  async (world: string, name: string): Promise<CharacterOcidData> => {
    const { ocid } = await nexonFetch<{ ocid: string }>(
      buildOcidEndpoint(world, name),
    );

    return { world_name: world, ocid, character_name: name };
  },
  ["character-ocid-v2"],
  { revalidate: OCID_CACHE_SECONDS },
);

const fetchOcidResultCached = unstable_cache(
  async (world: string, name: string): Promise<CharacterOcidData | null> => {
    try {
      return await fetchOcidCached(world, name);
    } catch (e: unknown) {
      if (isNexonNotFoundError(e)) return null;
      throw e;
    }
  },
  ["character-ocid-result-v1"],
  { revalidate: OCID_NOT_FOUND_CACHE_SECONDS },
);

// 내부 API 라우트를 거치지 않고 바로 넥슨 API를 찌르는 순수 함수
export async function fetchOcid(
  world: string,
  name: string,
): Promise<CharacterOcidData | null> {
  return fetchOcidResultCached(world, name);
}
