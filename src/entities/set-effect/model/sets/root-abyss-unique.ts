import { EquipmentSetDefinition } from "../types";

export const ROOT_ABYSS_UNIQUE_SET: EquipmentSetDefinition = {
  id: "root-abyss-unique",
  displayName: "루타비스(유니크)",
  minSetCount: 2,
  maxSetCount: 4,
  nameNormalization: "stripBracketPrefix",
  itemMatchers: [
    {
      itemNamePrefix: "이글아이",
      itemSlotName: "상의",
      itemGrades: ["유니크"],
    },
    {
      itemNamePrefix: "트릭스터",
      itemSlotName: "하의",
      itemGrades: ["유니크"],
    },
    {
      itemNamePrefix: "하이네스",
      itemSlotName: "모자",
      itemGrades: ["유니크"],
    },
    {
      itemNamePrefix: "파프니르",
      itemSlotName: "무기",
      itemGrades: ["유니크"],
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
      key: "physicalAttack",
      values: { 3: 40.0, 4: 45.0 },
    },
    {
      key: "magicAttack",
      values: { 3: 40.0, 4: 45.0 },
    },
    {
      key: "physicalDamage",
      values: { 4: 40.0 },
    },
    {
      key: "magicDamage",
      values: { 4: 40.0 },
    },
  ],
  starForceEffects: [
    {
      key: "physicalAttack",
      values: { 30: 8.0, 60: 9.5, 90: 11.0, 120: 12.5 },
    },
    {
      key: "physicalDamage",
      values: { 30: 9.0, 60: 10.5, 90: 12.0, 120: 13.5 },
    },
    {
      key: "magicAttack",
      values: { 30: 8.0, 60: 9.5, 90: 11.0, 120: 12.5 },
    },
    {
      key: "magicDamage",
      values: { 30: 9.0, 60: 10.5, 90: 12.0, 120: 13.5 },
    },
    {
      key: "bossAttack",
      values: { 30: 5.0, 60: 7.5, 90: null, 120: 12.5 },
    },
    {
      key: "maxDamageIncrease",
      values: { 30: null, 60: null, 90: 1_000_000, 120: 2_400_000 },
    },
    {
      key: "finalDamage",
      values: { 30: null, 60: null, 90: null, 120: 5.0 },
    },
    {
      key: "ignoreDefense",
      values: { 30: null, 60: null, 90: null, 120: 5.0 },
    },
  ],
};
