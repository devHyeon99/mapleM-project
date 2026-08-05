import { EquipmentSetDefinition } from "../types";

export const ABSOLABS_SET: EquipmentSetDefinition = {
  id: "absolabs",
  displayName: "앱솔랩스",
  displayOrder: 2,
  minSetCount: 2,
  maxSetCount: 7,
  itemNamePrefixes: ["앱솔랩스"],
  setEffects: [
    {
      key: "bossAttack",
      values: { 2: 6.0, 3: 7.0, 4: 8.0, 5: 9.0, 6: 10.0, 7: 11.0 },
    },
    {
      key: "bossDefense",
      values: { 2: 6.0, 3: 7.0, 4: 8.0, 5: 9.0, 6: 10.0, 7: 11.0 },
    },
    {
      key: "physicalDamageReduction",
      values: { 2: 27.0, 3: 27.5, 4: 55.0, 5: 55.5, 6: 56.0, 7: 84.0 },
    },
    {
      key: "magicDamageReduction",
      values: { 2: 27.0, 3: 27.5, 4: 55.0, 5: 55.5, 6: 56.0, 7: 84.0 },
    },
    {
      key: "criticalDamageReduction",
      values: { 2: 22.0, 3: 24.0, 4: 69.0, 5: 76.0, 6: 83.0, 7: 130.0 },
    },
    {
      key: "criticalDamage",
      values: { 2: 22.0, 3: 24.0, 4: 69.0, 5: 76.0, 6: 83.0, 7: 130.0 },
    },
    {
      key: "penetrationRate",
      values: { 2: 12.0, 3: 13.5, 4: 36.5, 5: 38.0, 6: 39.5, 7: 63.5 },
    },
    {
      key: "blockRate",
      values: { 2: 12.0, 3: 13.5, 4: 36.5, 5: 38.0, 6: 39.5, 7: 63.5 },
    },
    {
      key: "jumpIncrease",
      values: { 2: 11.0, 3: 27.0, 4: 43.0, 5: 59.0, 6: 75.0, 7: 91.0 },
    },
    {
      key: "moveSpeedIncrease",
      values: { 2: 11.0, 3: 27.0, 4: 43.0, 5: 59.0, 6: 75.0, 7: 91.0 },
    },
    {
      key: "maxDamageIncrease",
      values: {
        2: 5_500_000,
        3: 11_000_000,
        4: 18_500_000,
        5: 28_000_000,
        6: 38_500_000,
        7: 49_000_000,
      },
    },
    {
      key: "physicalAttack",
      values: { 2: 5.0, 3: 6.5, 4: 8.0, 5: 9.5, 6: 11.0, 7: 57.0 },
    },
    {
      key: "magicAttack",
      values: { 2: 5.0, 3: 6.5, 4: 8.0, 5: 9.5, 6: 11.0, 7: 57.0 },
    },
    {
      key: "physicalDamage",
      values: { 2: 5.0, 3: 6.5, 4: 8.0, 5: 9.5, 6: 11.0, 7: 50.0 },
    },
    {
      key: "magicDamage",
      values: { 2: 5.0, 3: 6.5, 4: 8.0, 5: 9.5, 6: 11.0, 7: 50.0 },
    },
    {
      key: "ignoreDefense",
      values: { 2: 5.0, 3: 8.0, 4: 11.0, 5: 14.0, 6: 17.0, 7: 23.0 },
    },
  ],
  starForceEffects: [
    {
      key: "bossAttack",
      values: { 70: 10.0, 140: 13.0, 210: 16.0, 245: 19.0, 280: 22.0 },
    },
    {
      key: "physicalAttack",
      values: { 70: 12.0, 140: 14.5, 210: 17.0, 245: 19.5, 280: 22.0 },
    },
    {
      key: "magicAttack",
      values: { 70: 12.0, 140: 14.5, 210: 17.0, 245: 19.5, 280: 22.0 },
    },
    {
      key: "physicalDamage",
      values: { 70: 14.0, 140: 16.5, 210: 19.0, 245: 21.5, 280: 24.0 },
    },
    {
      key: "magicDamage",
      values: { 70: 14.0, 140: 16.5, 210: 19.0, 245: 21.5, 280: 24.0 },
    },
    {
      key: "ignoreDefense",
      values: { 70: 3.0, 140: 5.0, 210: 7.0, 245: 9.0, 280: 11.0 },
    },
    {
      key: "maxDamageIncrease",
      values: {
        70: 5_500_000,
        140: 11_000_000,
        210: 18_500_000,
        245: 29_000_000,
        280: 42_500_000,
      },
    },
    {
      key: "finalDamage",
      values: { 70: null, 140: null, 210: 5.0, 245: 10.0, 280: 15.0 },
    },
  ],
};
