import { EquipmentSetDefinition } from "../types";

export const MUSPELL_UNIQUE_SET: EquipmentSetDefinition = {
  id: "muspell-unique",
  displayName: "무스펠(유니크)",
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
      values: { 2: 21.7, 3: 22.1, 4: 22.5 },
    },
    {
      key: "penetrationRate",
      values: { 2: 21.7, 3: 22.1, 4: 22.5 },
    },
    {
      key: "physicalDamageReduction",
      values: { 2: 24.4, 3: 24.7, 4: 25.0 },
    },
    {
      key: "criticalDamage",
      values: { 2: 42.0, 3: 46.0, 4: 50.0 },
    },
    {
      key: "criticalDamageReduction",
      values: { 2: 42.0, 3: 46.0, 4: 50.0 },
    },
    {
      key: "magicDamageReduction",
      values: { 2: 24.4, 3: 24.7, 4: 25.0 },
    },
    {
      key: "moveSpeedIncrease",
      values: { 2: 42.0, 3: 46.0, 4: 50.0 },
    },
    {
      key: "jumpIncrease",
      values: { 2: 48.0, 3: 49.0, 4: 50.0 },
    },
  ],
  starForceEffects: [
    {
      key: "physicalAttack",
      values: { 25: 1.0, 50: 2.0 },
    },
    {
      key: "physicalDamage",
      values: { 25: 1.0, 50: 2.0 },
    },
    {
      key: "magicAttack",
      values: { 25: 1.0, 50: 2.0 },
    },
    {
      key: "magicDamage",
      values: { 25: 1.0, 50: 2.0 },
    },
  ],
};
