import { EquipmentSetDefinition } from "../types";

export const PENSALIR_LEGENDARY_SET: EquipmentSetDefinition = {
  id: "pensalir-legendary",
  displayName: "펜살리르(레전더리)",
  displayOrder: 7,
  minSetCount: 2,
  maxSetCount: 4,
  itemMatchers: [
    {
      itemNamePrefix: "펜살리르",
      itemSlotName: "모자",
      itemGrades: ["레전더리"],
      equipmentLevels: [156],
    },
    {
      itemNamePrefix: "펜살리르",
      itemSlotName: "한벌옷",
      itemGrades: ["레전더리"],
      equipmentLevels: [156],
    },
    {
      itemNamePrefix: "펜살리르",
      itemSlotName: "장갑",
      itemGrades: ["레전더리"],
      equipmentLevels: [156],
    },
    {
      itemNamePrefix: "펜살리르",
      itemSlotName: "신발",
      itemGrades: ["레전더리"],
      equipmentLevels: [156],
    },
  ],
  setEffects: [
    {
      key: "blockRate",
      values: { 2: 23.0, 3: 23.7, 4: 24.3 },
    },
    {
      key: "penetrationRate",
      values: { 2: 23.0, 3: 23.7, 4: 24.3 },
    },
    {
      key: "physicalDamageReduction",
      values: { 2: 25.8, 3: 26.4, 4: 27.1 },
    },
    {
      key: "criticalDamage",
      values: { 2: 44.5, 3: 49.3, 4: 54.1 },
    },
    {
      key: "criticalDamageReduction",
      values: { 2: 44.5, 3: 49.3, 4: 54.1 },
    },
    {
      key: "magicDamageReduction",
      values: { 2: 25.8, 3: 26.4, 4: 27.1 },
    },
    {
      key: "moveSpeedIncrease",
      values: { 2: 44.5, 3: 49.3, 4: 54.1 },
    },
    {
      key: "jumpIncrease",
      values: { 2: 50.9, 3: 52.5, 4: 54.1 },
    },
    {
      key: "maxDamageIncrease",
      values: { 3: 500_000, 4: 1_000_000 },
    },
  ],
  starForceEffects: [
    {
      key: "physicalAttack",
      values: { 30: 4.0, 60: 8.0, 90: 12.0 },
    },
    {
      key: "physicalDamage",
      values: { 30: 4.0, 60: 8.0, 90: 12.0 },
    },
    {
      key: "magicAttack",
      values: { 30: 4.0, 60: 8.0, 90: 12.0 },
    },
    {
      key: "magicDamage",
      values: { 30: 4.0, 60: 8.0, 90: 12.0 },
    },
  ],
};
