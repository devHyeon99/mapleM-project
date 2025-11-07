import { EquipmentSetDefinition } from "../types";

export const CHALLENGER_SET: EquipmentSetDefinition = {
  id: "challenger",
  displayName: "도전자의 장비",
  displayOrder: 3,
  minSetCount: 8,
  maxSetCount: 8,
  itemMatchers: [
    {
      itemNamePrefix: "도전자의",
      itemSlotName: "무기",
    },
    {
      itemNamePrefix: "도전자의",
      itemSlotName: "상의",
    },
    {
      itemNamePrefix: "도전자의",
      itemSlotName: "하의",
    },
    {
      itemNamePrefix: "도전자의",
      itemSlotName: "모자",
    },
    {
      itemNamePrefix: "도전자의",
      itemSlotName: "장갑",
    },
    {
      itemNamePrefix: "도전자의",
      itemSlotName: "신발",
    },
    {
      itemNamePrefix: "도전자의",
      itemSlotName: "어깨",
    },
    {
      itemNamePrefix: "도전자의",
      itemSlotName: "망토",
    },
  ],
  setEffects: [
    {
      key: "blockRate",
      label: "블록률",
      unit: "%",
      values: { 8: 23.6 },
    },
    {
      key: "penetrationRate",
      label: "관통률",
      unit: "%",
      values: { 8: 23.6 },
    },
    {
      key: "physicalAttack",
      label: "물리 공격력",
      unit: "%",
      values: { 8: 45.0 },
    },
    {
      key: "physicalDamage",
      label: "물리 대미지",
      unit: "%",
      values: { 8: 40.0 },
    },
    {
      key: "physicalDamageReduction",
      label: "물리 피해 감소",
      unit: "%",
      values: { 8: 26.3 },
    },
    {
      key: "criticalDamage",
      label: "치명타 피해",
      unit: "%",
      values: { 8: 52.5 },
    },
    {
      key: "criticalDamageReduction",
      label: "치명타 피해 감소",
      unit: "%",
      values: { 8: 52.5 },
    },
    {
      key: "magicAttack",
      label: "마법 공격력",
      unit: "%",
      values: { 8: 45.0 },
    },
    {
      key: "magicDamage",
      label: "마법 대미지",
      unit: "%",
      values: { 8: 40.0 },
    },
    {
      key: "magicDamageReduction",
      label: "마법 피해 감소",
      unit: "%",
      values: { 8: 26.3 },
    },
  ],
  starForceEffects: [
    {
      key: "blockRate",
      label: "블록률",
      unit: "%",
      values: { 160: 4.0, 170: 8.0, 200: 15.9 },
    },
    {
      key: "penetrationRate",
      label: "관통률",
      unit: "%",
      values: { 160: 4.0, 170: 8.0, 200: 15.9 },
    },
    {
      key: "maxDamageIncrease",
      label: "최대 대미지 증가",
      unit: "flat",
      values: { 160: 10_000_000, 170: 15_000_000, 200: 35_000_000 },
    },
    {
      key: "physicalAttack",
      label: "물리 공격력",
      unit: "%",
      values: { 160: 14.5, 170: 17.0, 200: 19.5 },
    },
    {
      key: "physicalDamage",
      label: "물리 대미지",
      unit: "%",
      values: { 160: 16.5, 170: 19.0, 200: 21.5 },
    },
    {
      key: "physicalDamageReduction",
      label: "물리 피해 감소",
      unit: "%",
      values: { 160: 7.5, 170: 15.0, 200: 29.7 },
    },
    {
      key: "criticalDamage",
      label: "치명타 피해",
      unit: "%",
      values: { 160: 7.5, 170: 15.0, 200: 30.5 },
    },
    {
      key: "criticalDamageReduction",
      label: "치명타 피해 감소",
      unit: "%",
      values: { 160: 7.5, 170: 15.0, 200: 30.5 },
    },
    {
      key: "magicAttack",
      label: "마법 공격력",
      unit: "%",
      values: { 160: 14.5, 170: 17.0, 200: 19.5 },
    },
    {
      key: "magicDamage",
      label: "마법 대미지",
      unit: "%",
      values: { 160: 16.5, 170: 19.0, 200: 21.5 },
    },
    {
      key: "magicDamageReduction",
      label: "마법 피해 감소",
      unit: "%",
      values: { 160: 7.5, 170: 15.0, 200: 29.7 },
    },
    {
      key: "bossAttack",
      label: "보스 공격력 증가",
      unit: "%",
      values: { 160: 13.0, 170: 16.0, 200: 19.0 },
    },
    {
      key: "bossDefense",
      label: "보스 방어력 증가",
      unit: "%",
      values: { 160: 5.0, 170: 10.0, 200: 11.0 },
    },
    {
      key: "moveSpeedIncrease",
      label: "이동 속도",
      unit: "%",
      values: { 160: 11.0, 170: 22.0, 200: 44.1 },
    },
    {
      key: "jumpIncrease",
      label: "점프 높이",
      unit: "%",
      values: { 160: 12.5, 170: 25.0, 200: 50.4 },
    },
    {
      key: "ignoreDefense",
      label: "방어율 무시",
      unit: "%",
      values: { 160: 10.0, 170: 15.0, 200: 20.0 },
    },
    {
      key: "finalDamage",
      label: "최종 대미지",
      unit: "%",
      values: { 160: null, 170: 5.0, 200: 10.0 },
    },
  ],
};
