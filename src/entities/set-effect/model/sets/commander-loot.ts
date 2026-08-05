import { EquipmentSetDefinition } from "../types";

export const COMMANDER_LOOT_SET: EquipmentSetDefinition = {
  id: "commander-loot",
  displayName: "군단장 전리품",
  minSetCount: 1,
  maxSetCount: 6,
  itemNames: [
    "카오스 영생의 돌",
    "영생의 돌",
    "지옥의 불꽃",
    "고귀한 이피아의 반지",
    "검은 노바의 휘장",
    "폭군의 위상",
    "매커네이터 펜던트",
    "도미네이터 펜던트",
  ],
  setEffects: [
    {
      key: "maxMp",
      values: {
        1: 2_000,
        2: 4_000,
        3: 6_000,
        4: 10_000,
        5: 12_000,
        6: 14_000,
      },
    },
    {
      key: "maxHp",
      values: {
        1: 3_000,
        2: 5_000,
        3: 8_000,
        4: 12_000,
        5: 14_000,
        6: 16_000,
      },
    },
    {
      key: "accuracy",
      values: {
        1: 5,
        2: 8,
        3: 12,
        4: 15,
        5: 18,
        6: 21,
      },
    },
    {
      key: "bossDefense",
      values: {
        2: 4,
        3: 4,
        4: 7,
        5: 7,
        6: 10,
      },
    },
    {
      key: "physicalDamageReduction",
      values: {
        3: 1,
        4: 4,
        5: 8,
        6: 8,
      },
    },
    {
      key: "magicDamageReduction",
      values: {
        3: 1,
        4: 4,
        5: 8,
        6: 8,
      },
    },
    {
      key: "bossAttack",
      values: {
        3: 4,
        4: 7,
        5: 7,
        6: 10,
      },
    },
    {
      key: "expRate",
      values: {
        4: 5,
        5: 7,
        6: 9,
      },
    },
    {
      key: "stance",
      values: {
        4: 5,
        5: 10,
        6: 20,
      },
    },
    {
      key: "finalDamage",
      values: {
        5: 0.5,
        6: 2.5,
      },
    },
    {
      key: "maxDamageIncrease",
      values: {
        5: 50_000,
        6: 250_000,
      },
    },
  ],
};
