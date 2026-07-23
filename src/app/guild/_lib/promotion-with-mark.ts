import "server-only";
import { getGuildFullData } from "@/entities/guild/api/get-guild.server";
import { getVisibleGuildSkills } from "@/entities/guild/lib/getVisibleGuildSkills";
import type { Guild } from "@/entities/guild";
import type {
  GuildPromotionGuildInfo,
  GuildPromotionItem,
  GuildPromotionWithMark,
} from "@/entities/guild-promotion/model/types";

/** 넥슨 응답에서 다이얼로그가 쓰는 값만 추림. 길드원 목록까지 실어 나르지 않기 위함 */
function toGuildInfo(guild: Guild): GuildPromotionGuildInfo {
  return {
    level: guild.guild_level,
    member_count: guild.guild_member_count,
    master_name: guild.guild_master_name,
    create_date: guild.guild_create_date,
    skills: getVisibleGuildSkills(guild.guild_skill ?? []).map((skill) => ({
      name: skill.skill_name,
      level: skill.skill_level,
    })),
    buildings: (guild.guild_building ?? []).map((building) => ({
      name: building.building_name,
      level: building.building_level,
    })),
  };
}

/**
 * 홍보에 넥슨 길드 정보를 붙인다.
 *
 * 길드마다 조회가 한 번씩 나가므로 반드시 화면에 그릴 만큼만 잘라서 넘길 것.
 * 마크는 DB 에 두지 않고 넥슨에서 가져옴. 길드가 마크를 바꾸면 DB 값은 낡아지는데
 * 넥슨 조회는 길드 상세 페이지와 캐시 키가 같아 대부분 캐시 히트로 끝남.
 *
 * 조회 실패(없는 길드명·넥슨 장애)는 guild 를 null 로 두고 홍보 자체는 그대로 노출함.
 * 길드 정보 하나 때문에 모집 글이 통째로 사라지면 안 됨.
 * 상세 페이지는 없는 길드면 notFound 라 이때는 길드 정보 링크도 걸지 않음
 */
export async function attachGuildInfo(
  items: GuildPromotionItem[],
): Promise<GuildPromotionWithMark[]> {
  const marks = await Promise.allSettled(
    items.map((item) =>
      getGuildFullData({
        worldName: item.world_name,
        guildName: item.guild_name,
      }),
    ),
  );

  return items.map((item, index) => {
    const result = marks[index];
    return {
      ...item,
      // 마크가 없는 멀쩡한 길드도 있어 mark_icon 만으로는 존재 여부를 못 가림
      mark_icon:
        result.status === "fulfilled"
          ? (result.value.guild_mark_icon ?? null)
          : null,
      guild: result.status === "fulfilled" ? toGuildInfo(result.value) : null,
    };
  });
}
