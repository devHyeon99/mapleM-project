import { EquipmentSetDefinition } from "../types";

export const MUSPELL_LEGENDARY_SET: EquipmentSetDefinition = {
  id: "muspell-legendary",
  displayName: "무스펠(레전더리)",
  displayOrder: 9,
  minSetCount: 2,
  maxSetCount: 4,
  itemMatchers: [
    {
      itemNamePrefix: "무스펠",
      itemSlotName: "모자",
      itemGrades: ["레전더리"],
      equipmentLevels: [136],
    },
    {
      itemNamePrefix: "무스펠",
      itemSlotName: "한벌옷",
      itemGrades: ["레전더리"],
      equipmentLevels: [136],
    },
    {
      itemNamePrefix: "무스펠",
      itemSlotName: "장갑",
      itemGrades: ["레전더리"],
      equipmentLevels: [136],
    },
    {
      itemNamePrefix: "무스펠",
      itemSlotName: "신발",
      itemGrades: ["레전더리"],
      equipmentLevels: [136],
    },
  ],
  setEffects: [
    {
      key: "blockRate",
      label: "블록률",
      unit: "%",
      values: { 2: 21.9, 3: 22.5, 4: 23.2 },
    },
    {
      key: "penetrationRate",
      label: "관통률",
      unit: "%",
      values: { 2: 21.9, 3: 22.5, 4: 23.2 },
    },
    {
      key: "physicalDamageReduction",
      label: "물리 피해 감소",
      unit: "%",
      values: { 2: 24.6, 3: 25.2, 4: 25.8 },
    },
    {
      key: "criticalDamage",
      label: "치명타 피해",
      unit: "%",
      values: { 2: 42.4, 3: 46.9, 4: 51.5 },
    },
    {
      key: "criticalDamageReduction",
      label: "치명타 피해 감소",
      unit: "%",
      values: { 2: 42.4, 3: 46.9, 4: 51.5 },
    },
    {
      key: "magicDamageReduction",
      label: "마법 피해 감소",
      unit: "%",
      values: { 2: 24.6, 3: 25.2, 4: 25.8 },
    },
    {
      key: "moveSpeedIncrease",
      label: "이동 속도",
      unit: "%",
      values: { 2: 42.4, 3: 46.9, 4: 51.5 },
    },
    {
      key: "jumpIncrease",
      label: "점프 높이",
      unit: "%",
      values: { 2: 48.5, 3: 50.0, 4: 51.5 },
    },
  ],
  starForceEffects: [
    {
      key: "physicalAttack",
      label: "물리 공격력",
      unit: "%",
      values: { 25: 1.5, 50: 3.0 },
    },
    {
      key: "physicalDamage",
      label: "물리 대미지",
      unit: "%",
      values: { 25: 1.5, 50: 3.0 },
    },
    {
      key: "magicAttack",
      label: "마법 공격력",
      unit: "%",
      values: { 25: 1.5, 50: 3.0 },
    },
    {
      key: "magicDamage",
      label: "마법 대미지",
      unit: "%",
      values: { 25: 1.5, 50: 3.0 },
    },
  ],
};
