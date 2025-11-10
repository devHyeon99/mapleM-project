import { MAGICAL_CLASSES } from "@/shared/config/constants/magic_class";
import { CharacterItemEquipment } from "@/entities/item/model/types";
import { parseItemOption } from "../options/parseOptionValues";
import { OPTION_KEYS } from "../options/optionConstants";

/**
 * 아이템 목록과 직업을 받아 모든 스펙 합계를 계산하는 통합 함수
 */
export const getItemSpec = (
  items: (CharacterItemEquipment | null)[] | undefined,
  characterClass: string,
) => {
  const safeItems = items || [];

  // 직업 타입 판별 및 타겟 설정
  const isMagical = MAGICAL_CLASSES.includes(characterClass);
  const targetDamage = isMagical
    ? OPTION_KEYS.MAGICAL_DAMAGE
    : OPTION_KEYS.PHYSICAL_DAMAGE;
  const targetAtk = isMagical
    ? OPTION_KEYS.MAGICAL_ATTACK
    : OPTION_KEYS.PHYSICAL_ATTACK;

  // UI 표기용 라벨
  const labelDamage = isMagical ? "마댐" : "물댐";
  const labelAtk = isMagical ? "마법 공격력" : "물리 공격력";

  // 합산 변수 초기화
  const summary = {
    potential: 0, // 잠재능력 (댐+보공)
    additional: 0, // 에디셔널 (댐+보공)
    chuop: {
      finalDamage: 0, // 추옵: 최종댐
      ignoreDef: 0, // 추옵: 방무
      atk: 0, // 추옵: 공/마
    },
  };

  // 아이템 순회 및 합산
  safeItems.forEach((item) => {
    if (!item) return;

    // 잠재능력 -> 물/마댐 + 보공
    item.item_potential_option?.forEach((opt) => {
      const parsed = parseItemOption(opt.option_name, opt.option_value);
      if (
        parsed.normalizedName === targetDamage ||
        parsed.normalizedName === OPTION_KEYS.BOSS_DAMAGE
      ) {
        summary.potential += parsed.numericValue ?? 0;
      }
    });

    // 에디셔널 -> 물/마댐 + 보공
    item.item_additional_potential_option?.forEach((opt) => {
      const parsed = parseItemOption(opt.option_name, opt.option_value);
      if (
        parsed.normalizedName === targetDamage ||
        parsed.normalizedName === OPTION_KEYS.BOSS_DAMAGE
      ) {
        summary.additional += parsed.numericValue ?? 0;
      }
    });

    // 추가옵션 -> 최종, 방무, 공/마
    item.item_additional_option?.forEach((opt) => {
      const parsed = parseItemOption(opt.option_name, opt.option_value);
      if (parsed.normalizedName === OPTION_KEYS.FINAL_DAMAGE) {
        summary.chuop.finalDamage += parsed.numericValue ?? 0;
      } else if (parsed.normalizedName === OPTION_KEYS.IGNORE_DEFENSE) {
        summary.chuop.ignoreDef += parsed.numericValue ?? 0;
      } else if (parsed.normalizedName === targetAtk) {
        summary.chuop.atk += parsed.numericValue ?? 0;
      }
    });
  });

  return {
    labelDamage,
    labelAtk,
    ...summary,
  };
};
