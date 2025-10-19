import "server-only";

import { nexonFetch } from "@/shared/api/nexon/server";
import type { Guild } from "../model/types";

interface GetGuildParams {
  worldName: string;
  guildName: string;
}

export async function getGuildFullData({
  worldName,
  guildName,
}: GetGuildParams): Promise<Guild> {
  const idParams = new URLSearchParams({
    world_name: worldName,
    guild_name: guildName,
  });

  const idData = await nexonFetch<{ oguild_id: string }>(
    `/guild/id?${idParams.toString()}`,
    {
      next: { revalidate: 86400 }, // 길드를 삭제하는 경우는 잘 없음 혹시 모르니 하루 동안 캐시
    },
  );

  if (!idData?.oguild_id) {
    throw new Error("길드 식별자를 찾을 수 없습니다.");
  }

  const oguildId = idData.oguild_id;

  // 상세 정보 조회: 넥슨 데이터 갱신 주기(15분)에 맞춤
  const detailParams = new URLSearchParams({ oguild_id: oguildId });

  const guildData = await nexonFetch<Guild>(
    `/guild/basic?${detailParams.toString()}`,
    {
      next: {
        revalidate: 900, // 15분 (900초) 캐시
        tags: [`guild-${oguildId}`],
      },
    },
  );

  if (!guildData) {
    throw new Error("길드 데이터를 불러올 수 없습니다.");
  }

  return guildData;
}
