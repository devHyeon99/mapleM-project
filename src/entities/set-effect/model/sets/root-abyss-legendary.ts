import { EquipmentSetDefinition } from "../types";

export const ROOT_ABYSS_LEGENDARY_SET: EquipmentSetDefinition = {
  id: "root-abyss-legendary",
  displayName: "루타비스(레전더리)",
  minSetCount: 2,
  maxSetCount: 4,
  itemMatchers: [
    {
      itemNamePrefix: "이글아이",
      itemSlotName: "상의",
      itemGrades: ["레전더리"],
    },
    {
      itemNamePrefix: "트릭스터",
      itemSlotName: "하의",
      itemGrades: ["레전더리"],
    },
    {
      itemNamePrefix: "하이네스",
      itemSlotName: "모자",
      itemGrades: ["레전더리"],
    },
    {
      itemNamePrefix: "파프니르",
      itemSlotName: "무기",
      itemGrades: ["레전더리"],
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
      key: "maxDamageIncrease",
      values: { 2: 500_000, 3: 1_050_000, 4: 3_150_000 },
    },
    {
      key: "physicalAttack",
      values: { 2: 30.0, 3: 45.0, 4: 50.0 },
    },
    {
      key: "physicalDamage",
      values: { 2: 25.0, 3: 35.0, 4: 45.0 },
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
      key: "magicAttack",
      values: { 2: 30.0, 3: 45.0, 4: 50.0 },
    },
    {
      key: "magicDamage",
      values: { 2: 25.0, 3: 35.0, 4: 45.0 },
    },
    {
      key: "magicDamageReduction",
      values: { 2: 25.8, 3: 26.4, 4: 27.1 },
    },
    {
      key: "ignoreDefense",
      values: { 2: 5.0, 3: 10.0, 4: 15.0 },
    },
  ],
  starForceEffects: [
    {
      key: "maxDamageIncrease",
      values: {
        30: 2_100_000,
        60: 4_100_000,
        90: 6_100_000,
        120: 11_600_000,
      },
    },
    {
      key: "physicalAttack",
      values: { 30: 9.0, 60: 10.5, 90: 12.0, 120: 13.5 },
    },
    {
      key: "physicalDamage",
      values: { 30: 10.0, 60: 11.5, 90: 13.0, 120: 14.5 },
    },
    {
      key: "magicAttack",
      values: { 30: 9.0, 60: 10.5, 90: 12.0, 120: 13.5 },
    },
    {
      key: "magicDamage",
      values: { 30: 10.0, 60: 11.5, 90: 13.0, 120: 14.5 },
    },
    {
      key: "bossAttack",
      values: { 30: 7.5, 60: 10.0, 90: 12.5, 120: 15.0 },
    },
    {
      key: "finalDamage",
      values: { 30: null, 60: null, 90: 4.0, 120: 9.0 },
    },
    {
      key: "ignoreDefense",
      values: { 30: null, 60: null, 90: 2.0, 120: 7.0 },
    },
  ],
};
