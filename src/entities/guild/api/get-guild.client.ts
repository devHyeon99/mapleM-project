import type { Guild } from "../model/types";

interface FetchParams {
  worldName: string;
  guildName: string;
}

export const fetchGuildClient = async ({
  worldName,
  guildName,
}: FetchParams): Promise<Guild> => {
  const params = new URLSearchParams({
    type: "basic", // 기존 API Route 로직 활용
    world_name: worldName,
    guild_name: guildName,
  });

  const res = await fetch(`/api/guild?${params.toString()}`);

  if (!res.ok) {
    throw new Error("길드 정보를 불러오는데 실패했습니다.");
  }

  const json = await res.json();
  if (json.error) throw new Error(json.error.message);

  return json.data;
};
