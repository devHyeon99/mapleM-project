/** 길드 개인 스킬 및 길드 스킬 공통 정보 */
export interface GuildSkill {
  skill_name: string;
  skill_level: number;
  skill_option: string;
  skill_icon: string;
}

/** 길드원 상세 정보 */
export interface GuildMember {
  character_name: string;
  character_level: number;
  guild_activity: number;
  guild_personal_skill: GuildSkill[];
}

/** 길드 시설물 정보 */
export interface GuildBuilding {
  building_name: string;
  building_level: number;
}

/** 길드 어빌리티 정보 */
export interface GuildAbility {
  ability_no: number;
  ability_name: string;
  ability_level: number;
  ability_option: string;
  ability_icon: string;
}

/** 길드 기본 및 상세 정보 통합 인터페이스 (GuildBasic) */
export interface Guild {
  guild_name: string;
  world_name: string;
  guild_level: number;
  guild_create_date: string; // 스키마의 world_create_date는 문맥상 guild_create_date로 추정됨
  guild_keyword: string[];
  guild_mark_icon: string;
  guild_master_name: string;
  guild_member_count: number;
  guild_member: GuildMember[];
  guild_building: GuildBuilding[];
  guild_skill: GuildSkill[];
  guild_ability: GuildAbility[];
}
