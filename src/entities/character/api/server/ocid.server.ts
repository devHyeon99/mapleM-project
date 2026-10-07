import "server-only";
import { nexonFetch } from "@/shared/api/nexon/server";
import { isNexonNotFoundError } from "@/shared/api/nexon/handler";
import type { CharacterOcidData } from "../../model/types/ocid";
import { unstable_cache } from "next/cache";

const OCID_CACHE_SECONDS = 60 * 60 * 24;

function buildOcidEndpoint(world: string, name: string): string {
  return `/id?character_name=${encodeURIComponent(name)}&world_name=${encodeURIComponent(world)}`;
}

// 캐시는 찾은 캐릭터만 담는 한 겹. 없는 캐릭터는 넥슨이 던지는 에러가 그대로 올라오고,
// unstable_cache 는 reject 를 저장하지 않으므로 캐시에 남지 않음.
// 예전엔 "없음"을 5분 캐싱하려고 바깥에 한 겹을 더 씌웠는데, 그 바깥 캐시가 찾은
// 결과까지 5분마다 다시 쓰면서 조회 한 번에 ISR 쓰기가 두 번씩 잡혔음
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

// 내부 API 라우트를 거치지 않고 바로 넥슨 API를 찌르는 순수 함수
export async function fetchOcid(
  world: string,
  name: string,
): Promise<CharacterOcidData | null> {
  try {
    return await fetchOcidCached(world, name);
  } catch (e: unknown) {
    if (isNexonNotFoundError(e)) return null;
    throw e;
  }
}
