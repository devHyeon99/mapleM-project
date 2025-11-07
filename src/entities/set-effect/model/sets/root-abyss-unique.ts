import { EquipmentSetDefinition } from "../types";

export const ROOT_ABYSS_UNIQUE_SET: EquipmentSetDefinition = {
  id: "root-abyss-unique",
  displayName: "루타비스(유니크)",
  displayOrder: 5,
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
      label: "블록률",
      unit: "%",
      values: { 2: 22.8, 3: 23.2, 4: 23.6 },
    },
    {
      key: "penetrationRate",
      label: "관통률",
      unit: "%",
      values: { 2: 22.8, 3: 23.2, 4: 23.6 },
    },
    {
      key: "physicalDamageReduction",
      label: "물리 피해 감소",
      unit: "%",
      values: { 2: 25.5, 3: 25.9, 4: 26.3 },
    },
    {
      key: "criticalDamage",
      label: "치명타 피해",
      unit: "%",
      values: { 2: 44.1, 3: 48.3, 4: 52.5 },
    },
    {
      key: "criticalDamageReduction",
      label: "치명타 피해 감소",
      unit: "%",
      values: { 2: 44.1, 3: 48.3, 4: 52.5 },
    },
    {
      key: "magicDamageReduction",
      label: "마법 피해 감소",
      unit: "%",
      values: { 2: 25.5, 3: 25.9, 4: 26.3 },
    },
    {
      key: "physicalAttack",
      label: "물리 공격력",
      unit: "%",
      values: { 3: 40.0, 4: 45.0 },
    },
    {
      key: "magicAttack",
      label: "마법 공격력",
      unit: "%",
      values: { 3: 40.0, 4: 45.0 },
    },
    {
      key: "physicalDamage",
      label: "물리 대미지",
      unit: "%",
      values: { 4: 40.0 },
    },
    {
      key: "magicDamage",
      label: "마법 대미지",
      unit: "%",
      values: { 4: 40.0 },
    },
  ],
  starForceEffects: [
    {
      key: "physicalAttack",
      label: "물리 공격력",
      unit: "%",
      values: { 30: 8.0, 60: 9.5, 90: 11.0, 120: 12.5 },
    },
    {
      key: "physicalDamage",
      label: "물리 대미지",
      unit: "%",
      values: { 30: 9.0, 60: 10.5, 90: 12.0, 120: 13.5 },
    },
    {
      key: "magicAttack",
      label: "마법 공격력",
      unit: "%",
      values: { 30: 8.0, 60: 9.5, 90: 11.0, 120: 12.5 },
    },
    {
      key: "magicDamage",
      label: "마법 대미지",
      unit: "%",
      values: { 30: 9.0, 60: 10.5, 90: 12.0, 120: 13.5 },
    },
    {
      key: "bossAttack",
      label: "보스 공격력 증가",
      unit: "%",
      values: { 30: 5.0, 60: 7.5, 90: null, 120: 12.5 },
    },
    {
      key: "maxDamageIncrease",
      label: "최대 대미지 증가",
      unit: "flat",
      values: { 30: null, 60: null, 90: 1_000_000, 120: 2_400_000 },
    },
    {
      key: "finalDamage",
      label: "최종 대미지",
      unit: "%",
      values: { 30: null, 60: null, 90: null, 120: 5.0 },
    },
    {
      key: "ignoreDefense",
      label: "방어율 무시",
      unit: "%",
      values: { 30: null, 60: null, 90: null, 120: 5.0 },
    },
  ],
};
