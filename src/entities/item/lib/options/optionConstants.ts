export const OPTION_KEYS = {
  PHYSICAL_ATTACK: "물리 공격력",
  MAGICAL_ATTACK: "마법 공격력",
  PHYSICAL_DAMAGE: "물리 대미지",
  MAGICAL_DAMAGE: "마법 대미지",
  BOSS_DAMAGE: "보스 공격력",
  CRITICAL_RATE: "치명타 확률",
  CRITICAL_DAMAGE: "치명타 피해",
  MAX_DAMAGE: "최대 대미지",
  FINAL_DAMAGE: "최종 대미지",
  IGNORE_DEFENSE: "방어율 무시",
  MAX_HP: "최대 HP",
  MAX_MP: "최대 MP",
  PHYSICAL_DEFENSE: "물리 방어력",
  MAGICAL_DEFENSE: "마법 방어력",
  PHYSICAL_DAMAGE_REDUCTION: "물리 피해 감소",
  MAGICAL_DAMAGE_REDUCTION: "마법 피해 감소",
  MOVE_SPEED: "이동 속도",
  JUMP_HEIGHT: "점프 높이",
} as const;

export const OPTION_ALIASES: Record<string, string> = {
  물공: OPTION_KEYS.PHYSICAL_ATTACK,
  마공: OPTION_KEYS.MAGICAL_ATTACK,
  물댐: OPTION_KEYS.PHYSICAL_DAMAGE,
  마댐: OPTION_KEYS.MAGICAL_DAMAGE,
  보공: OPTION_KEYS.BOSS_DAMAGE,
  보스대미지: OPTION_KEYS.BOSS_DAMAGE,
};
