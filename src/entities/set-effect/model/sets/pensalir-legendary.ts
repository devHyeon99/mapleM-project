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
      label: "블록률",
      unit: "%",
      values: { 2: 23.0, 3: 23.7, 4: 24.3 },
    },
    {
      key: "penetrationRate",
      label: "관통률",
      unit: "%",
      values: { 2: 23.0, 3: 23.7, 4: 24.3 },
    },
    {
      key: "physicalDamageReduction",
      label: "물리 피해 감소",
      unit: "%",
      values: { 2: 25.8, 3: 26.4, 4: 27.1 },
    },
    {
      key: "criticalDamage",
      label: "치명타 피해",
      unit: "%",
      values: { 2: 44.5, 3: 49.3, 4: 54.1 },
    },
    {
      key: "criticalDamageReduction",
      label: "치명타 피해 감소",
      unit: "%",
      values: { 2: 44.5, 3: 49.3, 4: 54.1 },
    },
    {
      key: "magicDamageReduction",
      label: "마법 피해 감소",
      unit: "%",
      values: { 2: 25.8, 3: 26.4, 4: 27.1 },
    },
    {
      key: "moveSpeedIncrease",
      label: "이동 속도",
      unit: "%",
      values: { 2: 44.5, 3: 49.3, 4: 54.1 },
    },
    {
      key: "jumpIncrease",
      label: "점프 높이",
      unit: "%",
      values: { 2: 50.9, 3: 52.5, 4: 54.1 },
    },
    {
      key: "maxDamageIncrease",
      label: "최대 대미지 증가",
      unit: "flat",
      values: { 3: 500_000, 4: 1_000_000 },
    },
  ],
  starForceEffects: [
    {
      key: "physicalAttack",
      label: "물리 공격력",
      unit: "%",
      values: { 30: 4.0, 60: 8.0, 90: 12.0 },
    },
    {
      key: "physicalDamage",
      label: "물리 대미지",
      unit: "%",
      values: { 30: 4.0, 60: 8.0, 90: 12.0 },
    },
    {
      key: "magicAttack",
      label: "마법 공격력",
      unit: "%",
      values: { 30: 4.0, 60: 8.0, 90: 12.0 },
    },
    {
      key: "magicDamage",
      label: "마법 대미지",
      unit: "%",
      values: { 30: 4.0, 60: 8.0, 90: 12.0 },
    },
  ],
};
