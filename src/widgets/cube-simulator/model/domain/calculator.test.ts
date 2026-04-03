import { describe, expect, it } from "vitest";

import { getAvailableTiers, rollPotentialCube } from "./calculator";
import type { EquipmentPotentialData, PotentialTier } from "./potential-types";

const option = (key: string) => ({
  key,
  label: key,
  value: 1,
  valueType: "percent" as const,
  chance: 100,
});

const tierData = (key: string) => ({
  first: [option(key)],
  secondary: [option(key)],
});

// 지정한 등급의 확률표가 비어 있는 장비 데이터
// (기계심장, 보조무기 100/140은 레전더리 표가 비어 있어 유니크가 상한)
const createPotentialData = (
  emptyTiers: PotentialTier[],
): EquipmentPotentialData => {
  const data: EquipmentPotentialData = {
    equipmentType: "heart",
    label: "기계심장",
    level: 5,
    tiers: {
      rare: tierData("rare"),
      epic: tierData("epic"),
      unique: tierData("unique"),
      legendary: tierData("legendary"),
    },
  };

  for (const tier of emptyTiers) {
    data.tiers[tier] = { first: [], secondary: [] };
  }

  return data;
};

// 항상 등급업이 터지는 rng
const alwaysUpgrade = () => 0;

describe("rollPotentialCube", () => {
  it("확률표가 있는 등급은 정상적으로 등급업된다", () => {
    const roll = rollPotentialCube(
      createPotentialData([]),
      "unique",
      "red",
      alwaysUpgrade,
    );

    expect(roll?.resolvedTier).toBe("legendary");
    expect(roll?.lines).toHaveLength(3);
  });

  it("확률표가 비어 있는 상위 등급으로는 등급업하지 않는다", () => {
    const roll = rollPotentialCube(
      createPotentialData(["legendary"]),
      "unique",
      "red",
      alwaysUpgrade,
    );

    // 등급업이 막혀도 롤 자체는 성공해야 함 (예전엔 null이라 실행 버튼이 먹통)
    expect(roll).not.toBeNull();
    expect(roll?.resolvedTier).toBe("unique");
    expect(roll?.lines).toHaveLength(3);
  });
});

describe("getAvailableTiers", () => {
  it("확률표가 비어 있는 등급은 제외한다", () => {
    expect(getAvailableTiers(createPotentialData(["legendary"]))).toEqual([
      "rare",
      "epic",
      "unique",
    ]);
  });
});
