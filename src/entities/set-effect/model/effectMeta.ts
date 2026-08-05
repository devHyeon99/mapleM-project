import { EffectKey, EffectUnit } from "./types";

// 능력치 표기와 단위는 세트가 아니라 키에 딸린 값임.
// 세트 데이터마다 적어두면 같은 키가 세트별로 다른 문구로 굳어짐
export const EFFECT_META: Record<
  EffectKey,
  { label: string; unit: EffectUnit }
> = {
  accuracy: { label: "명중률", unit: "%" },
  blockRate: { label: "블록률", unit: "%" },
  bossAttack: { label: "보스 공격력 증가", unit: "%" },
  bossDefense: { label: "보스 방어력 증가", unit: "%" },
  criticalDamage: { label: "치명타 피해", unit: "%" },
  criticalDamageReduction: { label: "치명타 피해 감소", unit: "%" },
  expRate: { label: "경험치 획득량", unit: "%" },
  finalDamage: { label: "최종 대미지", unit: "%" },
  hpRecovery: { label: "HP 회복력", unit: "flat" },
  ignoreDefense: { label: "방어율 무시", unit: "%" },
  jumpIncrease: { label: "점프 높이", unit: "%" },
  magicAttack: { label: "마법 공격력", unit: "%" },
  magicDamage: { label: "마법 대미지", unit: "%" },
  magicDamageReduction: { label: "마법 피해 감소", unit: "%" },
  magicDefense: { label: "마법 방어력", unit: "flat" },
  maxDamageIncrease: { label: "최대 대미지 증가", unit: "flat" },
  maxHp: { label: "최대 HP", unit: "flat" },
  maxMp: { label: "최대 MP", unit: "flat" },
  moveSpeedIncrease: { label: "이동 속도", unit: "%" },
  penetrationRate: { label: "관통률", unit: "%" },
  physicalAttack: { label: "물리 공격력", unit: "%" },
  physicalDamage: { label: "물리 대미지", unit: "%" },
  physicalDamageReduction: { label: "물리 피해 감소", unit: "%" },
  physicalDefense: { label: "물리 방어력", unit: "flat" },
  stance: { label: "스탠스", unit: "flat" },
};
