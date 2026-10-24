import { EffectKey, EffectUnit } from "./types";

// 능력치 표기와 단위는 세트가 아니라 키에 딸린 값임.
// 세트 데이터마다 적어두면 같은 키가 세트별로 다른 문구로 굳어짐
// 키 순서가 곧 화면 표시 순서임 (딜 관련 → 생존 → 기타)
export const EFFECT_META: Record<
  EffectKey,
  { label: string; unit: EffectUnit }
> = {
  physicalDamage: { label: "물리 대미지", unit: "%" },
  physicalAttack: { label: "물리 공격력", unit: "%" },
  magicDamage: { label: "마법 대미지", unit: "%" },
  magicAttack: { label: "마법 공격력", unit: "%" },
  bossAttack: { label: "보스 공격력 증가", unit: "%" },
  finalDamage: { label: "최종 대미지", unit: "%" },
  ignoreDefense: { label: "방어율 무시", unit: "%" },
  maxDamageIncrease: { label: "최대 대미지 증가", unit: "flat" },
  criticalDamage: { label: "치명타 피해", unit: "%" },
  criticalDamageReduction: { label: "치명타 피해 감소", unit: "%" },
  penetrationRate: { label: "관통률", unit: "%" },
  bossDefense: { label: "보스 방어력 증가", unit: "%" },
  physicalDamageReduction: { label: "물리 피해 감소", unit: "%" },
  magicDamageReduction: { label: "마법 피해 감소", unit: "%" },
  blockRate: { label: "블록률", unit: "%" },
  stance: { label: "스탠스", unit: "flat" },
  accuracy: { label: "명중률", unit: "%" },
  physicalDefense: { label: "물리 방어력", unit: "flat" },
  magicDefense: { label: "마법 방어력", unit: "flat" },
  maxHp: { label: "최대 HP", unit: "flat" },
  maxMp: { label: "최대 MP", unit: "flat" },
  hpRecovery: { label: "HP 회복력", unit: "flat" },
  expRate: { label: "경험치 획득량", unit: "%" },
  moveSpeedIncrease: { label: "이동 속도", unit: "%" },
  jumpIncrease: { label: "점프 높이", unit: "%" },
};

export const EFFECT_ORDER = Object.keys(EFFECT_META) as EffectKey[];
