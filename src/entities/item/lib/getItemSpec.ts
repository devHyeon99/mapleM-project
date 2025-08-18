import { CharacterItemEquipment } from "@/entities/character";
import { MAGICAL_CLASSES } from "@/shared/config/constants/magic_class";

/**
 * 숫자 문자열 파싱
 */
const parseValue = (value: string | undefined | null): number => {
  if (!value) return 0;
  return parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
};

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
  const targetDamage = isMagical ? "마법 대미지" : "물리 대미지";
  const targetAtk = isMagical ? "마법 공격력" : "물리 공격력";

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
      if (
        opt.option_name === targetDamage ||
        opt.option_name === "보스 공격력"
      ) {
        summary.potential += parseValue(opt.option_value);
      }
    });

    // 에디셔널 -> 물/마댐 + 보공
    item.item_additional_potential_option?.forEach((opt) => {
      if (
        opt.option_name === targetDamage ||
        opt.option_name === "보스 공격력"
      ) {
        summary.additional += parseValue(opt.option_value);
      }
    });

    // 추가옵션 -> 최종, 방무, 공/마
    item.item_additional_option?.forEach((opt) => {
      if (opt.option_name === "최종 대미지") {
        summary.chuop.finalDamage += parseValue(opt.option_value);
      } else if (opt.option_name === "방어율 무시") {
        summary.chuop.ignoreDef += parseValue(opt.option_value);
      } else if (opt.option_name === targetAtk) {
        summary.chuop.atk += parseValue(opt.option_value);
      }
    });
  });

  return {
    labelDamage,
    labelAtk,
    ...summary,
  };
};
