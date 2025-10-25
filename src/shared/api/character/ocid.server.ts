import { nexonFetch } from "@/shared/api/nexon/server";
import { isNexonNotFoundError } from "@/shared/api/nexon/handler";
import type { CharacterOcidData } from "@/entities/character";

// 내부 API 라우트를 거치지 않고 바로 넥슨 API를 찌르는 순수 함수
export async function fetchOcid(
  world: string,
  name: string,
): Promise<CharacterOcidData | null> {
  try {
    const { ocid } = await nexonFetch<{ ocid: string }>(
      `/id?character_name=${encodeURIComponent(name)}&world_name=${encodeURIComponent(world)}`,
      { cache: "no-store" },
    );
    return { world_name: world, ocid, character_name: name };
  } catch (e: unknown) {
    if (isNexonNotFoundError(e)) return null;
    throw e;
  }
}
