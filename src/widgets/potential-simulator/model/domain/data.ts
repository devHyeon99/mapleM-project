import type {
  EquipmentCategory,
  EquipmentLevel,
  FlameType,
  HeartGrade,
  OptionDefinition,
  OptionPool,
} from "./types";

// 정수형(고정 수치) 옵션 정의.
// step은 MIN~MAX 범위 내 랜덤 샘플링 시 사용하는 증가값
const FLAT_OPTIONS = {
  attack: { key: "attack", label: "물리공격력", unit: "flat", step: 1 },
  magicAttack: {
    key: "magicAttack",
    label: "마법공격력",
    unit: "flat",
    step: 1,
  },
  maxHp: { key: "maxHp", label: "최대 HP", unit: "flat", step: 1 },
  maxMp: { key: "maxMp", label: "최대 MP", unit: "flat", step: 1 },
  hpRecovery: {
    key: "hpRecovery",
    label: "HP 회복력",
    unit: "flat",
    step: 1,
  },
  mpRecovery: {
    key: "mpRecovery",
    label: "MP 회복력",
    unit: "flat",
    step: 1,
  },
} as const satisfies Record<string, OptionDefinition>;

// 퍼센트형 옵션 정의.
// step은 MIN~MAX 범위 내 랜덤 샘플링 시 사용하는 증가값
const PERCENT_OPTIONS = {
  accuracy: {
    key: "accuracy",
    label: "명중률",
    unit: "percent",
    step: 0.1,
  },
  criticalRate: {
    key: "criticalRate",
    label: "치명타확률",
    unit: "percent",
    step: 0.1,
  },
  evasion: { key: "evasion", label: "회피율", unit: "percent", step: 0.1 },
  dropRate: {
    key: "dropRate",
    label: "아이템 드롭률",
    unit: "percent",
    step: 0.1,
  },
  mesoRate: {
    key: "mesoRate",
    label: "메소 획득량",
    unit: "percent",
    step: 0.1,
  },
  finalDamage: {
    key: "finalDamage",
    label: "최종 대미지 증가",
    unit: "percent",
    step: 0.1,
  },
  physicalDamage: {
    key: "physicalDamage",
    label: "물리대미지",
    unit: "percent",
    step: 0.001,
  },
  magicDamage: {
    key: "magicDamage",
    label: "마법대미지",
    unit: "percent",
    step: 0.001,
  },
  ignoreDefense: {
    key: "ignoreDefense",
    label: "방어율 무시",
    unit: "percent",
    step: 0.001,
  },
  expRate: {
    key: "expRate",
    label: "경험치 획득량",
    unit: "percent",
    step: 0.1,
  },
} as const satisfies Record<string, OptionDefinition>;

// 강환불 무기 옵션 (보조무기, 엠블렘, 감시자의 눈 아이템 포함 같은 수치 적용)
const POWERFUL_WEAPON_OPTIONS: OptionDefinition[] = [
  FLAT_OPTIONS.attack,
  FLAT_OPTIONS.magicAttack,
  FLAT_OPTIONS.maxHp,
  FLAT_OPTIONS.maxMp,
  FLAT_OPTIONS.hpRecovery,
  FLAT_OPTIONS.mpRecovery,
  PERCENT_OPTIONS.accuracy,
  PERCENT_OPTIONS.criticalRate,
  PERCENT_OPTIONS.evasion,
  PERCENT_OPTIONS.dropRate,
  PERCENT_OPTIONS.mesoRate,
  PERCENT_OPTIONS.finalDamage,
];

// 영환불, 검환불 무기 옵션 (보조무기, 엠블렘, 감시자의 눈 아이템 포함 같은 수치 적용)
const ETERNAL_WEAPON_OPTIONS: OptionDefinition[] = [
  FLAT_OPTIONS.attack,
  FLAT_OPTIONS.magicAttack,
  FLAT_OPTIONS.maxHp,
  FLAT_OPTIONS.maxMp,
  FLAT_OPTIONS.hpRecovery,
  FLAT_OPTIONS.mpRecovery,
  PERCENT_OPTIONS.accuracy,
  PERCENT_OPTIONS.criticalRate,
  PERCENT_OPTIONS.evasion,
  PERCENT_OPTIONS.dropRate,
  PERCENT_OPTIONS.mesoRate,
  PERCENT_OPTIONS.physicalDamage,
  PERCENT_OPTIONS.magicDamage,
  PERCENT_OPTIONS.finalDamage,
];

// 강환불 방어구(상의, 하의, 한벌옷, 장갑, 신발, 어깨, 벨트, 망토...) 옵션
const POWERFUL_ARMOR_OPTIONS: OptionDefinition[] = [
  FLAT_OPTIONS.maxHp,
  FLAT_OPTIONS.maxMp,
  FLAT_OPTIONS.hpRecovery,
  FLAT_OPTIONS.mpRecovery,
  PERCENT_OPTIONS.accuracy,
  PERCENT_OPTIONS.criticalRate,
  PERCENT_OPTIONS.evasion,
  PERCENT_OPTIONS.dropRate,
  PERCENT_OPTIONS.mesoRate,
  PERCENT_OPTIONS.ignoreDefense,
];

// 영환불 방어구(상의, 하의, 한벌옷, 장갑, 신발, 어깨, 벨트, 망토...) 옵션
const ETERNAL_ARMOR_OPTIONS: OptionDefinition[] = [
  FLAT_OPTIONS.maxHp,
  FLAT_OPTIONS.maxMp,
  FLAT_OPTIONS.hpRecovery,
  FLAT_OPTIONS.mpRecovery,
  PERCENT_OPTIONS.accuracy,
  PERCENT_OPTIONS.criticalRate,
  PERCENT_OPTIONS.evasion,
  PERCENT_OPTIONS.dropRate,
  PERCENT_OPTIONS.mesoRate,
  PERCENT_OPTIONS.expRate,
  PERCENT_OPTIONS.ignoreDefense,
];

// 강환불 포켓 옵션
const POWERFUL_POCKET_OPTIONS: OptionDefinition[] = [
  FLAT_OPTIONS.attack,
  FLAT_OPTIONS.magicAttack,
  FLAT_OPTIONS.maxHp,
  FLAT_OPTIONS.maxMp,
  FLAT_OPTIONS.hpRecovery,
  FLAT_OPTIONS.mpRecovery,
  PERCENT_OPTIONS.accuracy,
  PERCENT_OPTIONS.criticalRate,
  PERCENT_OPTIONS.evasion,
  PERCENT_OPTIONS.finalDamage,
];

// 영환불 포켓 옵션
const ETERNAL_POCKET_OPTIONS: OptionDefinition[] = [
  FLAT_OPTIONS.attack,
  FLAT_OPTIONS.magicAttack,
  FLAT_OPTIONS.maxHp,
  FLAT_OPTIONS.maxMp,
  FLAT_OPTIONS.hpRecovery,
  FLAT_OPTIONS.mpRecovery,
  PERCENT_OPTIONS.accuracy,
  PERCENT_OPTIONS.criticalRate,
  PERCENT_OPTIONS.evasion,
  PERCENT_OPTIONS.physicalDamage,
  PERCENT_OPTIONS.magicDamage,
  PERCENT_OPTIONS.finalDamage,
];

// 강환불 기계심장 옵션
const POWERFUL_HEART_OPTIONS: OptionDefinition[] = [
  FLAT_OPTIONS.attack,
  FLAT_OPTIONS.magicAttack,
  FLAT_OPTIONS.maxHp,
  FLAT_OPTIONS.maxMp,
  FLAT_OPTIONS.hpRecovery,
  FLAT_OPTIONS.mpRecovery,
  PERCENT_OPTIONS.accuracy,
  PERCENT_OPTIONS.criticalRate,
  PERCENT_OPTIONS.evasion,
  PERCENT_OPTIONS.finalDamage,
];

// 영환불 기계심장 옵션
const ETERNAL_HEART_OPTIONS: OptionDefinition[] = [
  FLAT_OPTIONS.attack,
  FLAT_OPTIONS.magicAttack,
  FLAT_OPTIONS.maxHp,
  FLAT_OPTIONS.maxMp,
  FLAT_OPTIONS.hpRecovery,
  FLAT_OPTIONS.mpRecovery,
  PERCENT_OPTIONS.accuracy,
  PERCENT_OPTIONS.criticalRate,
  PERCENT_OPTIONS.evasion,
  PERCENT_OPTIONS.physicalDamage,
  PERCENT_OPTIONS.magicDamage,
  PERCENT_OPTIONS.finalDamage,
];

// 레벨 범위 설정 (100, 120도 있는데 무의미 해서 140부터)
type WeaponFamilyLevel = 140 | 160 | 180 | 200;
type StandardLevel = 140 | 160 | 180 | 200;

// 무기 강환불 옵션 값 범위
const WEAPON_POWERFUL_DATA: Record<WeaponFamilyLevel, OptionPool> = {
  140: {
    options: POWERFUL_WEAPON_OPTIONS,
    ranges: {
      attack: { min: 288, max: 576 },
      magicAttack: { min: 288, max: 576 },
      maxHp: { min: 1051, max: 1200 },
      maxMp: { min: 301, max: 450 },
      hpRecovery: { min: 11, max: 13 },
      mpRecovery: { min: 7, max: 9 },
      accuracy: { min: 0.9, max: 1.1 },
      criticalRate: { min: 1.2, max: 1.4 },
      evasion: { min: 2.5, max: 2.7 },
      dropRate: { min: 1.5, max: 1.7 },
      mesoRate: { min: 1.5, max: 1.7 },
      finalDamage: { min: 1.3, max: 1.6 },
    },
  },
  160: {
    options: POWERFUL_WEAPON_OPTIONS,
    ranges: {
      attack: { min: 577, max: 679 },
      magicAttack: { min: 577, max: 679 },
      maxHp: { min: 1201, max: 1410 },
      maxMp: { min: 451, max: 585 },
      hpRecovery: { min: 14, max: 18 },
      mpRecovery: { min: 10, max: 11 },
      accuracy: { min: 1.2, max: 1.3 },
      criticalRate: { min: 1.5, max: 1.6 },
      evasion: { min: 2.8, max: 3.6 },
      dropRate: { min: 1.8, max: 2.1 },
      mesoRate: { min: 1.8, max: 2.1 },
      finalDamage: { min: 1.7, max: 2.0 },
    },
  },
  180: {
    options: POWERFUL_WEAPON_OPTIONS,
    ranges: {
      attack: { min: 680, max: 866 },
      magicAttack: { min: 680, max: 866 },
      maxHp: { min: 1411, max: 1560 },
      maxMp: { min: 586, max: 675 },
      hpRecovery: { min: 19, max: 20 },
      mpRecovery: { min: 12, max: 13 },
      accuracy: { min: 1.4, max: 1.6 },
      criticalRate: { min: 1.7, max: 1.9 },
      evasion: { min: 3.7, max: 3.9 },
      dropRate: { min: 2.2, max: 2.4 },
      mesoRate: { min: 2.2, max: 2.4 },
      finalDamage: { min: 2.1, max: 2.5 },
    },
  },
  200: {
    options: POWERFUL_WEAPON_OPTIONS,
    ranges: {
      attack: { min: 1127, max: 1352 },
      magicAttack: { min: 1127, max: 1352 },
      maxHp: { min: 1561, max: 1872 },
      maxMp: { min: 676, max: 810 },
      hpRecovery: { min: 21, max: 24 },
      mpRecovery: { min: 14, max: 16 },
      accuracy: { min: 1.7, max: 1.9 },
      criticalRate: { min: 2.0, max: 2.3 },
      evasion: { min: 4.0, max: 4.7 },
      dropRate: { min: 2.5, max: 2.9 },
      mesoRate: { min: 2.5, max: 2.9 },
      finalDamage: { min: 2.6, max: 3.1 },
    },
  },
};

// 무기 영환불 옵션 값 범위
const WEAPON_ETERNAL_DATA: Record<WeaponFamilyLevel, OptionPool> = {
  140: {
    options: ETERNAL_WEAPON_OPTIONS,
    ranges: {
      attack: { min: 359, max: 720 },
      magicAttack: { min: 359, max: 720 },
      maxHp: { min: 2117, max: 3514 },
      maxMp: { min: 848, max: 1406 },
      hpRecovery: { min: 30, max: 47 },
      mpRecovery: { min: 13, max: 19 },
      accuracy: { min: 1.9, max: 2.3 },
      criticalRate: { min: 2.6, max: 3.2 },
      evasion: { min: 6.1, max: 7.5 },
      dropRate: { min: 3.5, max: 4.2 },
      mesoRate: { min: 3.5, max: 4.2 },
      physicalDamage: { min: 5.1, max: 6.3 },
      magicDamage: { min: 5.1, max: 6.3 },
      finalDamage: { min: 3.4, max: 4.2 },
    },
  },
  160: {
    options: ETERNAL_WEAPON_OPTIONS,
    ranges: {
      attack: { min: 721, max: 822 },
      magicAttack: { min: 721, max: 822 },
      maxHp: { min: 3515, max: 4800 },
      maxMp: { min: 1407, max: 1725 },
      hpRecovery: { min: 48, max: 59 },
      mpRecovery: { min: 20, max: 22 },
      accuracy: { min: 2.4, max: 2.5 },
      criticalRate: { min: 3.3, max: 3.6 },
      evasion: { min: 7.6, max: 9.0 },
      dropRate: { min: 4.3, max: 5.1 },
      mesoRate: { min: 4.3, max: 5.1 },
      physicalDamage: { min: 6.4, max: 7.0 },
      magicDamage: { min: 6.4, max: 7.0 },
      finalDamage: { min: 4.3, max: 4.6 },
    },
  },
  180: {
    options: ETERNAL_WEAPON_OPTIONS,
    ranges: {
      attack: { min: 823, max: 1055 },
      magicAttack: { min: 823, max: 1055 },
      maxHp: { min: 4801, max: 5657 },
      maxMp: { min: 1726, max: 2078 },
      hpRecovery: { min: 60, max: 70 },
      mpRecovery: { min: 23, max: 27 },
      accuracy: { min: 2.6, max: 2.9 },
      criticalRate: { min: 3.7, max: 4.2 },
      evasion: { min: 9.1, max: 10.0 },
      dropRate: { min: 5.2, max: 5.7 },
      mesoRate: { min: 5.2, max: 5.7 },
      physicalDamage: { min: 7.1, max: 8.0 },
      magicDamage: { min: 7.1, max: 8.0 },
      finalDamage: { min: 4.7, max: 5.3 },
    },
  },
  200: {
    options: ETERNAL_WEAPON_OPTIONS,
    ranges: {
      attack: { min: 1609, max: 1931 },
      magicAttack: { min: 1609, max: 1931 },
      maxHp: { min: 5658, max: 6788 },
      maxMp: { min: 2079, max: 2494 },
      hpRecovery: { min: 71, max: 84 },
      mpRecovery: { min: 28, max: 32 },
      accuracy: { min: 3.0, max: 3.5 },
      criticalRate: { min: 4.3, max: 5.0 },
      evasion: { min: 10.1, max: 12.0 },
      dropRate: { min: 5.8, max: 6.8 },
      mesoRate: { min: 5.8, max: 6.8 },
      physicalDamage: { min: 8.1, max: 9.6 },
      magicDamage: { min: 8.1, max: 9.6 },
      finalDamage: { min: 5.4, max: 6.3 },
    },
  },
};

// 방어구 강환불 옵션값 범위
const ARMOR_POWERFUL_DATA: Record<StandardLevel, OptionPool> = {
  140: {
    options: POWERFUL_ARMOR_OPTIONS,
    ranges: {
      maxHp: { min: 1051, max: 1200 },
      maxMp: { min: 301, max: 450 },
      hpRecovery: { min: 11, max: 13 },
      mpRecovery: { min: 7, max: 9 },
      accuracy: { min: 0.9, max: 1.1 },
      criticalRate: { min: 1.2, max: 1.4 },
      evasion: { min: 2.5, max: 2.7 },
      dropRate: { min: 1.5, max: 1.7 },
      mesoRate: { min: 1.5, max: 1.7 },
      ignoreDefense: { min: 0.9, max: 1.1 },
    },
  },
  160: {
    options: POWERFUL_ARMOR_OPTIONS,
    ranges: {
      maxHp: { min: 1201, max: 1410 },
      maxMp: { min: 451, max: 585 },
      hpRecovery: { min: 14, max: 18 },
      mpRecovery: { min: 10, max: 11 },
      accuracy: { min: 1.2, max: 1.3 },
      criticalRate: { min: 1.5, max: 1.6 },
      evasion: { min: 2.8, max: 3.6 },
      dropRate: { min: 1.8, max: 2.1 },
      mesoRate: { min: 1.8, max: 2.1 },
      ignoreDefense: { min: 1.2, max: 1.4 },
    },
  },
  180: {
    options: POWERFUL_ARMOR_OPTIONS,
    ranges: {
      maxHp: { min: 1411, max: 1560 },
      maxMp: { min: 586, max: 675 },
      hpRecovery: { min: 19, max: 20 },
      mpRecovery: { min: 12, max: 13 },
      accuracy: { min: 1.4, max: 1.6 },
      criticalRate: { min: 1.7, max: 1.9 },
      evasion: { min: 3.7, max: 3.9 },
      dropRate: { min: 2.2, max: 2.4 },
      mesoRate: { min: 2.2, max: 2.4 },
      ignoreDefense: { min: 1.5, max: 1.8 },
    },
  },
  200: {
    options: POWERFUL_ARMOR_OPTIONS,
    ranges: {
      maxHp: { min: 1561, max: 1872 },
      maxMp: { min: 676, max: 810 },
      hpRecovery: { min: 21, max: 24 },
      mpRecovery: { min: 14, max: 16 },
      accuracy: { min: 1.7, max: 1.9 },
      criticalRate: { min: 2.0, max: 2.3 },
      evasion: { min: 4.0, max: 4.7 },
      dropRate: { min: 2.5, max: 2.9 },
      mesoRate: { min: 2.5, max: 2.9 },
      ignoreDefense: { min: 1.9, max: 2.3 },
    },
  },
};

// 방어구 영환불 옵션값 범위
const ARMOR_ETERNAL_DATA: Record<StandardLevel, OptionPool> = {
  140: {
    options: ETERNAL_ARMOR_OPTIONS,
    ranges: {
      maxHp: { min: 2117, max: 3514 },
      maxMp: { min: 848, max: 1406 },
      hpRecovery: { min: 30, max: 47 },
      mpRecovery: { min: 13, max: 19 },
      accuracy: { min: 1.9, max: 2.3 },
      criticalRate: { min: 2.6, max: 3.2 },
      evasion: { min: 6.1, max: 7.5 },
      dropRate: { min: 3.5, max: 4.2 },
      mesoRate: { min: 3.5, max: 4.2 },
      expRate: { min: 3.5, max: 4.2 },
      ignoreDefense: { min: 2.0, max: 2.9 },
    },
  },
  160: {
    options: ETERNAL_ARMOR_OPTIONS,
    ranges: {
      maxHp: { min: 3515, max: 4800 },
      maxMp: { min: 1407, max: 1725 },
      hpRecovery: { min: 48, max: 59 },
      mpRecovery: { min: 20, max: 22 },
      accuracy: { min: 2.4, max: 2.5 },
      criticalRate: { min: 3.3, max: 3.6 },
      evasion: { min: 7.6, max: 9.0 },
      dropRate: { min: 4.3, max: 5.1 },
      mesoRate: { min: 4.3, max: 5.1 },
      expRate: { min: 4.3, max: 5.1 },
      ignoreDefense: { min: 3.0, max: 3.9 },
    },
  },
  180: {
    options: ETERNAL_ARMOR_OPTIONS,
    ranges: {
      maxHp: { min: 4801, max: 5657 },
      maxMp: { min: 1726, max: 2078 },
      hpRecovery: { min: 60, max: 70 },
      mpRecovery: { min: 23, max: 27 },
      accuracy: { min: 2.6, max: 2.9 },
      criticalRate: { min: 3.7, max: 4.2 },
      evasion: { min: 9.1, max: 10.0 },
      dropRate: { min: 5.2, max: 5.7 },
      mesoRate: { min: 5.2, max: 5.7 },
      expRate: { min: 5.2, max: 5.7 },
      ignoreDefense: { min: 4.0, max: 4.8 },
    },
  },
  200: {
    options: ETERNAL_ARMOR_OPTIONS,
    ranges: {
      maxHp: { min: 5658, max: 6788 },
      maxMp: { min: 2079, max: 2494 },
      hpRecovery: { min: 71, max: 84 },
      mpRecovery: { min: 28, max: 32 },
      accuracy: { min: 3.0, max: 3.5 },
      criticalRate: { min: 4.3, max: 5.0 },
      evasion: { min: 10.1, max: 12.0 },
      dropRate: { min: 5.8, max: 6.8 },
      mesoRate: { min: 5.8, max: 6.8 },
      expRate: { min: 5.8, max: 6.8 },
      ignoreDefense: { min: 4.9, max: 5.9 },
    },
  },
};

// 포켓 강환불 옵션값 범위
const POCKET_POWERFUL_DATA: Record<140 | 160 | 180, OptionPool> = {
  140: {
    options: POWERFUL_POCKET_OPTIONS,
    ranges: {
      attack: { min: 288, max: 576 },
      magicAttack: { min: 288, max: 576 },
      maxHp: { min: 1051, max: 1200 },
      maxMp: { min: 301, max: 450 },
      hpRecovery: { min: 11, max: 13 },
      mpRecovery: { min: 7, max: 9 },
      accuracy: { min: 0.9, max: 1.1 },
      criticalRate: { min: 1.2, max: 1.4 },
      evasion: { min: 2.5, max: 2.7 },
      finalDamage: { min: 1.3, max: 1.6 },
    },
  },
  160: {
    options: POWERFUL_POCKET_OPTIONS,
    ranges: {
      attack: { min: 577, max: 679 },
      magicAttack: { min: 577, max: 679 },
      maxHp: { min: 1201, max: 1410 },
      maxMp: { min: 451, max: 585 },
      hpRecovery: { min: 14, max: 18 },
      mpRecovery: { min: 10, max: 11 },
      accuracy: { min: 1.2, max: 1.3 },
      criticalRate: { min: 1.5, max: 1.6 },
      evasion: { min: 2.8, max: 3.6 },
      finalDamage: { min: 1.7, max: 2.0 },
    },
  },
  180: {
    options: POWERFUL_POCKET_OPTIONS,
    ranges: {
      attack: { min: 680, max: 866 },
      magicAttack: { min: 680, max: 866 },
      maxHp: { min: 1411, max: 1560 },
      maxMp: { min: 586, max: 675 },
      hpRecovery: { min: 19, max: 20 },
      mpRecovery: { min: 12, max: 13 },
      accuracy: { min: 1.4, max: 1.6 },
      criticalRate: { min: 1.7, max: 1.9 },
      evasion: { min: 3.7, max: 3.9 },
      finalDamage: { min: 2.1, max: 2.5 },
    },
  },
};

// 포켓 영환불 옵션값 범위
const POCKET_ETERNAL_DATA: Record<140 | 160 | 180, OptionPool> = {
  140: {
    options: ETERNAL_POCKET_OPTIONS,
    ranges: {
      attack: { min: 359, max: 720 },
      magicAttack: { min: 359, max: 720 },
      maxHp: { min: 2117, max: 3514 },
      maxMp: { min: 848, max: 1406 },
      hpRecovery: { min: 30, max: 47 },
      mpRecovery: { min: 13, max: 19 },
      accuracy: { min: 1.9, max: 2.3 },
      criticalRate: { min: 2.6, max: 3.2 },
      evasion: { min: 6.1, max: 7.5 },
      physicalDamage: { min: 5.1, max: 6.3 },
      magicDamage: { min: 5.1, max: 6.3 },
      finalDamage: { min: 3.8, max: 4.5 },
    },
  },
  160: {
    options: ETERNAL_POCKET_OPTIONS,
    ranges: {
      attack: { min: 721, max: 822 },
      magicAttack: { min: 721, max: 822 },
      maxHp: { min: 3515, max: 4800 },
      maxMp: { min: 1407, max: 1725 },
      hpRecovery: { min: 48, max: 59 },
      mpRecovery: { min: 20, max: 22 },
      accuracy: { min: 2.4, max: 2.5 },
      criticalRate: { min: 3.3, max: 3.6 },
      evasion: { min: 7.6, max: 9.0 },
      physicalDamage: { min: 6.4, max: 7.0 },
      magicDamage: { min: 6.4, max: 7.0 },
      finalDamage: { min: 4.6, max: 5.5 },
    },
  },
  180: {
    options: ETERNAL_POCKET_OPTIONS,
    ranges: {
      attack: { min: 823, max: 1055 },
      magicAttack: { min: 823, max: 1055 },
      maxHp: { min: 4801, max: 5657 },
      maxMp: { min: 1726, max: 2078 },
      hpRecovery: { min: 60, max: 70 },
      mpRecovery: { min: 23, max: 27 },
      accuracy: { min: 2.6, max: 2.9 },
      criticalRate: { min: 3.7, max: 4.2 },
      evasion: { min: 9.1, max: 10.0 },
      physicalDamage: { min: 7.1, max: 8.0 },
      magicDamage: { min: 7.1, max: 8.0 },
      finalDamage: { min: 5.6, max: 6.7 },
    },
  },
};

// 기계심장 강환불 옵션값 범위
const HEART_POWERFUL_DATA: Record<HeartGrade, OptionPool> = {
  2: {
    options: POWERFUL_HEART_OPTIONS,
    ranges: {
      attack: { min: 68, max: 203 },
      magicAttack: { min: 68, max: 203 },
      maxHp: { min: 300, max: 900 },
      maxMp: { min: 90, max: 270 },
      hpRecovery: { min: 3, max: 9 },
      mpRecovery: { min: 2, max: 5 },
      accuracy: { min: 0.2, max: 0.6 },
      criticalRate: { min: 0.5, max: 0.9 },
      evasion: { min: 0.7, max: 2.1 },
      finalDamage: { min: 0.5, max: 0.9 },
    },
  },
  3: {
    options: POWERFUL_HEART_OPTIONS,
    ranges: {
      attack: { min: 204, max: 287 },
      magicAttack: { min: 204, max: 287 },
      maxHp: { min: 901, max: 1050 },
      maxMp: { min: 271, max: 300 },
      hpRecovery: { min: 10, max: 10 },
      mpRecovery: { min: 6, max: 6 },
      accuracy: { min: 0.7, max: 0.8 },
      criticalRate: { min: 1.0, max: 1.1 },
      evasion: { min: 2.2, max: 2.4 },
      finalDamage: { min: 1.0, max: 1.2 },
    },
  },
  5: {
    options: POWERFUL_HEART_OPTIONS,
    ranges: {
      attack: { min: 288, max: 576 },
      magicAttack: { min: 288, max: 576 },
      maxHp: { min: 1051, max: 1200 },
      maxMp: { min: 301, max: 450 },
      hpRecovery: { min: 11, max: 13 },
      mpRecovery: { min: 7, max: 9 },
      accuracy: { min: 0.9, max: 1.1 },
      criticalRate: { min: 1.2, max: 1.4 },
      evasion: { min: 2.5, max: 2.7 },
      finalDamage: { min: 1.3, max: 1.6 },
    },
  },
};

// 기계심장 영환불 옵션값 범위
const HEART_ETERNAL_DATA: Record<HeartGrade, OptionPool> = {
  2: {
    options: ETERNAL_HEART_OPTIONS,
    ranges: {
      attack: { min: 85, max: 204 },
      magicAttack: { min: 85, max: 204 },
      maxHp: { min: 600, max: 1800 },
      maxMp: { min: 234, max: 700 },
      hpRecovery: { min: 9, max: 25 },
      mpRecovery: { min: 4, max: 10 },
      accuracy: { min: 0.5, max: 1.5 },
      criticalRate: { min: 0.7, max: 2.0 },
      evasion: { min: 1.9, max: 5.5 },
      physicalDamage: { min: 1.5, max: 4.5 },
      magicDamage: { min: 1.5, max: 4.5 },
      finalDamage: { min: 2.5, max: 3.0 },
    },
  },
  3: {
    options: ETERNAL_HEART_OPTIONS,
    ranges: {
      attack: { min: 255, max: 358 },
      magicAttack: { min: 255, max: 358 },
      maxHp: { min: 1801, max: 2116 },
      maxMp: { min: 701, max: 847 },
      hpRecovery: { min: 26, max: 29 },
      mpRecovery: { min: 11, max: 12 },
      accuracy: { min: 1.6, max: 1.8 },
      criticalRate: { min: 2.1, max: 2.5 },
      evasion: { min: 5.6, max: 6.0 },
      physicalDamage: { min: 4.6, max: 5.0 },
      magicDamage: { min: 4.6, max: 5.0 },
      finalDamage: { min: 3.1, max: 3.6 },
    },
  },
  5: {
    options: ETERNAL_HEART_OPTIONS,
    ranges: {
      attack: { min: 359, max: 720 },
      magicAttack: { min: 359, max: 720 },
      maxHp: { min: 2117, max: 3514 },
      maxMp: { min: 848, max: 1406 },
      hpRecovery: { min: 30, max: 47 },
      mpRecovery: { min: 13, max: 19 },
      accuracy: { min: 1.9, max: 2.3 },
      criticalRate: { min: 2.6, max: 3.2 },
      evasion: { min: 6.1, max: 7.5 },
      physicalDamage: { min: 5.1, max: 6.3 },
      magicDamage: { min: 5.1, max: 6.3 },
      finalDamage: { min: 3.7, max: 4.4 },
    },
  },
};

// 환생의 불꽃 종류 정의 (영환불, 검환불은 같은 옵션 수치 적용)
export const FLAME_TYPE_OPTIONS: Array<{ type: FlameType; label: string }> = [
  { type: "powerful", label: "강력한 환생의 불꽃" },
  { type: "eternal", label: "영원한 환생의 불꽃" },
  { type: "black", label: "검은 환생의 불꽃" },
];

// 장비 종류 정의
export const EQUIPMENT_CATEGORY_OPTIONS: Array<{
  type: EquipmentCategory;
  label: string;
}> = [
  { type: "weapon", label: "무기" },
  { type: "secondaryWeapon", label: "보조무기" },
  { type: "emblem", label: "엠블렘" },
  { type: "watch", label: "감시자의 눈" },
  { type: "armor", label: "방어구 / 공용 방어구" },
  { type: "pocket", label: "포켓 장비" },
  { type: "heart", label: "기계심장" },
];

// 레벨 종류 정의
export const LEVEL_OPTIONS: Array<{ value: EquipmentLevel; label: string }> = [
  { value: 140, label: "140" },
  { value: 160, label: "160" },
  { value: 180, label: "180" },
  { value: 200, label: "200" },
];

// 기계심장은 레벨 단위가 아닌 등급 단위 정의
export const HEART_GRADE_OPTIONS: Array<{ value: HeartGrade; label: string }> =
  [
    { value: 2, label: "2등급" },
    { value: 3, label: "3등급" },
    { value: 5, label: "5등급" },
  ];

// 환생의 불꽃 1줄, 2줄 랜덤값 정의 (강환불만 50% 확률로 1줄이 뜨는데 2줄 뜨면 그 뒤로는 2줄이 계속 뜸 게임상에서는 그렇지만 확률 공개표에는 정의가 안되어있긴함.)
export const TWO_LINE_PROBABILITY: Record<FlameType, number> = {
  powerful: 0.5,
  eternal: 1,
  black: 1,
};

/**
 * 검은 환생의 불꽃은 영원한 환생의 불꽃과 동일한 옵션/수치 테이블을 사용함
 *
 * 동작 규칙:
 * - 데이터 조회 전 black 값을 eternal로 정규화
 *
 */
function resolveFlameDataType(
  flameType: FlameType,
): Exclude<FlameType, "black"> {
  return flameType === "black" ? "eternal" : flameType;
}

/**
 * 장비 분류별로 선택 가능한 레벨 목록을 반환
 *
 * 동작 규칙:
 * - 감시자의 눈은 200 고정
 * - 기계심장은 레벨 대신 등급(2/3/5)을 사용하므로 빈 배열 반환
 *
 */
export function getSupportedLevelsByCategory(
  equipmentCategory: EquipmentCategory,
): EquipmentLevel[] {
  if (equipmentCategory === "weapon") {
    return [140, 160, 180, 200];
  }

  if (equipmentCategory === "secondaryWeapon") {
    return [140, 180];
  }

  if (equipmentCategory === "emblem") {
    return [180, 200];
  }

  if (equipmentCategory === "watch") {
    return [200];
  }

  if (equipmentCategory === "pocket") {
    return [140, 160, 180];
  }

  if (equipmentCategory === "heart") {
    return [];
  }

  return [140, 160, 180, 200];
}

/**
 * 장비 레벨 기반 추가옵션 (옵션 목록 + 옵션별 MIN/MAX 범위)을 반환
 *
 * 동작 규칙:
 * - black(검은 환생의 불꽃)은 내부적으로 eternal(영원한 환생의 불꽃) 데이터로 매핑됨
 * - 무기/보조무기/엠블렘/감시자의 눈은 동일한 무기군 테이블을 공유함
 * - 방어구, 포켓 장비는 각각 전용 테이블을 사용함
 * - 전달된 분류/레벨 조합에 해당 데이터가 없으면 null을 반환
 */
export function getOptionPoolByLevel(params: {
  flameType: FlameType;
  equipmentCategory: Exclude<EquipmentCategory, "heart">;
  level: EquipmentLevel;
}): OptionPool | null {
  const flameType = resolveFlameDataType(params.flameType);

  if (
    params.equipmentCategory === "weapon" ||
    params.equipmentCategory === "secondaryWeapon" ||
    params.equipmentCategory === "emblem" ||
    params.equipmentCategory === "watch"
  ) {
    return flameType === "powerful"
      ? WEAPON_POWERFUL_DATA[params.level as WeaponFamilyLevel]
      : WEAPON_ETERNAL_DATA[params.level as WeaponFamilyLevel];
  }

  if (params.equipmentCategory === "armor") {
    return flameType === "powerful"
      ? ARMOR_POWERFUL_DATA[params.level as StandardLevel]
      : ARMOR_ETERNAL_DATA[params.level as StandardLevel];
  }

  if (params.equipmentCategory === "pocket") {
    const pocketLevel = params.level as 140 | 160 | 180;
    return flameType === "powerful"
      ? POCKET_POWERFUL_DATA[pocketLevel]
      : POCKET_ETERNAL_DATA[pocketLevel];
  }

  return null;
}

/**
 * 기계심장 전용 추가옵션 풀(옵션 목록 + 옵션별 MIN/MAX 범위)을 반환
 *
 * 동작 규칙:
 * - black(검은 환생의 불꽃)은 eternal(영원한 환생의 불꽃) 데이터로 매핑됨
 * - 기계심장은 레벨이 아닌 등급(2/3/5) 기준 테이블을 사용함
 */
export function getHeartOptionPool(params: {
  flameType: FlameType;
  grade: HeartGrade;
}): OptionPool {
  const flameType = resolveFlameDataType(params.flameType);
  return flameType === "powerful"
    ? HEART_POWERFUL_DATA[params.grade]
    : HEART_ETERNAL_DATA[params.grade];
}
