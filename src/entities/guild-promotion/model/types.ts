export interface GuildPromotionItem {
  id: string;
  world_name: string;
  guild_name: string;
  /** 카드에 한 줄로 노출되는 모집 문구 */
  headline: string;
  /** 다이얼로그에 펼쳐지는 상세 소개 */
  description: string;
  /** 오픈카톡 등 길드가 받을 연락 창구 */
  contact_url: string | null;
  created_at: string;
  start_at: string | null;
  end_at: string | null;
}

/** 이름과 레벨만 남긴 길드 스킬·시설물. 아이콘과 옵션 설명은 상세 페이지에서 봄 */
export interface GuildPromotionEntry {
  name: string;
  level: number;
}

/** 다이얼로그에 펼치는 넥슨 길드 정보. 목록이 통째로 클라이언트로 실려가 쓰는 값만 담음 */
export interface GuildPromotionGuildInfo {
  level: number;
  member_count: number;
  master_name: string;
  create_date: string;
  skills: GuildPromotionEntry[];
  buildings: GuildPromotionEntry[];
}

/** 넥슨에서 붙여 온 길드 정보까지 담은 형태. 목록 렌더에 쓰는 타입임 */
export interface GuildPromotionWithMark extends GuildPromotionItem {
  mark_icon: string | null;
  /** 조회 실패(없는 길드명·넥슨 장애)면 null. 상세 링크를 걸지도 이 값으로 판단함 */
  guild: GuildPromotionGuildInfo | null;
}
