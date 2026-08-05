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
      values: { 2: 21.9, 3: 22.5, 4: 23.2 },
    },
    {
      key: "penetrationRate",
      values: { 2: 21.9, 3: 22.5, 4: 23.2 },
    },
    {
      key: "physicalDamageReduction",
      values: { 2: 24.6, 3: 25.2, 4: 25.8 },
    },
    {
      key: "criticalDamage",
      values: { 2: 42.4, 3: 46.9, 4: 51.5 },
    },
    {
      key: "criticalDamageReduction",
      values: { 2: 42.4, 3: 46.9, 4: 51.5 },
    },
    {
      key: "magicDamageReduction",
      values: { 2: 24.6, 3: 25.2, 4: 25.8 },
    },
    {
      key: "moveSpeedIncrease",
      values: { 2: 42.4, 3: 46.9, 4: 51.5 },
    },
    {
      key: "jumpIncrease",
      values: { 2: 48.5, 3: 50.0, 4: 51.5 },
    },
  ],
  starForceEffects: [
    {
      key: "physicalAttack",
      values: { 25: 1.5, 50: 3.0 },
    },
    {
      key: "physicalDamage",
      values: { 25: 1.5, 50: 3.0 },
    },
    {
      key: "magicAttack",
      values: { 25: 1.5, 50: 3.0 },
    },
    {
      key: "magicDamage",
      values: { 25: 1.5, 50: 3.0 },
    },
  ],
};
