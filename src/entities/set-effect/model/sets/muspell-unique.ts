import { EquipmentSetDefinition } from "../types";

export const MUSPELL_UNIQUE_SET: EquipmentSetDefinition = {
  id: "muspell-unique",
  displayName: "무스펠(유니크)",
  displayOrder: 8,
  minSetCount: 2,
  maxSetCount: 4,
  itemMatchers: [
    {
      itemNamePrefix: "무스펠",
      itemSlotName: "모자",
      itemGrades: ["유니크"],
      equipmentLevels: [136],
    },
    {
      itemNamePrefix: "무스펠",
      itemSlotName: "한벌옷",
      itemGrades: ["유니크"],
      equipmentLevels: [136],
    },
    {
      itemNamePrefix: "무스펠",
      itemSlotName: "장갑",
      itemGrades: ["유니크"],
      equipmentLevels: [136],
    },
    {
      itemNamePrefix: "무스펠",
      itemSlotName: "신발",
      itemGrades: ["유니크"],
      equipmentLevels: [136],
    },
  ],
  setEffects: [
    {
      key: "blockRate",
      label: "블록률",
      unit: "%",
      values: { 2: 21.7, 3: 22.1, 4: 22.5 },
    },
    {
      key: "penetrationRate",
      label: "관통률",
      unit: "%",
      values: { 2: 21.7, 3: 22.1, 4: 22.5 },
    },
    {
      key: "physicalDamageReduction",
      label: "물리 피해 감소",
      unit: "%",
      values: { 2: 24.4, 3: 24.7, 4: 25.0 },
    },
    {
      key: "criticalDamage",
      label: "치명타 피해",
      unit: "%",
      values: { 2: 42.0, 3: 46.0, 4: 50.0 },
    },
    {
      key: "criticalDamageReduction",
      label: "치명타 피해 감소",
      unit: "%",
      values: { 2: 42.0, 3: 46.0, 4: 50.0 },
    },
    {
      key: "magicDamageReduction",
      label: "마법 피해 감소",
      unit: "%",
      values: { 2: 24.4, 3: 24.7, 4: 25.0 },
    },
    {
      key: "moveSpeedIncrease",
      label: "이동 속도",
      unit: "%",
      values: { 2: 42.0, 3: 46.0, 4: 50.0 },
    },
    {
      key: "jumpIncrease",
      label: "점프 높이",
      unit: "%",
      values: { 2: 48.0, 3: 49.0, 4: 50.0 },
    },
  ],
  starForceEffects: [
    {
      key: "physicalAttack",
      label: "물리 공격력",
      unit: "%",
      values: { 25: 1.0, 50: 2.0 },
    },
    {
      key: "physicalDamage",
      label: "물리 대미지",
      unit: "%",
      values: { 25: 1.0, 50: 2.0 },
    },
    {
      key: "magicAttack",
      label: "마법 공격력",
      unit: "%",
      values: { 25: 1.0, 50: 2.0 },
    },
    {
      key: "magicDamage",
      label: "마법 대미지",
      unit: "%",
      values: { 25: 1.0, 50: 2.0 },
    },
  ],
};
