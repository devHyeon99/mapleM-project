import { EquipmentSetDefinition } from "../types";

export const PENSALIR_UNIQUE_SET: EquipmentSetDefinition = {
  id: "pensalir-unique",
  displayName: "펜살리르(유니크)",
  displayOrder: 6,
  minSetCount: 2,
  maxSetCount: 4,
  itemMatchers: [
    {
      itemNamePrefix: "펜살리르",
      itemSlotName: "모자",
      itemGrades: ["유니크"],
      equipmentLevels: [156],
    },
    {
      itemNamePrefix: "펜살리르",
      itemSlotName: "한벌옷",
      itemGrades: ["유니크"],
      equipmentLevels: [156],
    },
    {
      itemNamePrefix: "펜살리르",
      itemSlotName: "장갑",
      itemGrades: ["유니크"],
      equipmentLevels: [156],
    },
    {
      itemNamePrefix: "펜살리르",
      itemSlotName: "신발",
      itemGrades: ["유니크"],
      equipmentLevels: [156],
    },
  ],
  setEffects: [
    {
      key: "blockRate",
      values: { 2: 22.8, 3: 23.2, 4: 23.6 },
    },
    {
      key: "penetrationRate",
      values: { 2: 22.8, 3: 23.2, 4: 23.6 },
    },
    {
      key: "physicalDamageReduction",
      values: { 2: 25.5, 3: 25.9, 4: 26.3 },
    },
    {
      key: "criticalDamage",
      values: { 2: 44.1, 3: 48.3, 4: 52.5 },
    },
    {
      key: "criticalDamageReduction",
      values: { 2: 44.1, 3: 48.3, 4: 52.5 },
    },
    {
      key: "magicDamageReduction",
      values: { 2: 25.5, 3: 25.9, 4: 26.3 },
    },
    {
      key: "moveSpeedIncrease",
      values: { 2: 44.1, 3: 48.3, 4: 52.5 },
    },
    {
      key: "jumpIncrease",
      values: { 2: 50.4, 3: 51.5, 4: 52.5 },
    },
  ],
  starForceEffects: [
    {
      key: "physicalAttack",
      values: { 30: 3.0, 60: 6.0, 90: 9.0 },
    },
    {
      key: "physicalDamage",
      values: { 30: 3.0, 60: 6.0, 90: 9.0 },
    },
    {
      key: "magicAttack",
      values: { 30: 3.0, 60: 6.0, 90: 9.0 },
    },
    {
      key: "magicDamage",
      values: { 30: 3.0, 60: 6.0, 90: 9.0 },
    },
  ],
};
