import { describe, expect, it } from "vitest";
import { CharacterItemEquipment } from "@/entities/item";
import { getActiveEquipmentSets } from "./getActiveEquipmentSets";

function createItem(
  item_name: string,
  item_equipment_slot_name: string,
  overrides: Partial<CharacterItemEquipment> = {},
): CharacterItemEquipment {
  return {
    item_name,
    item_equipment_slot_name,
    item_equipment_page_name: item_equipment_slot_name,
    item_grade: "유니크",
    item_icon: "",
    item_basic_option: [],
    item_additional_option: [],
    item_potential_option: [],
    item_additional_potential_option: [],
    ...overrides,
  };
}

describe("getActiveEquipmentSets", () => {
  it("keeps fixed render order from EQUIPMENT_SET_DEFINITIONS", () => {
    const items: CharacterItemEquipment[] = [
      createItem("앱솔랩스 나이트헬름", "모자"),
      createItem("아케인셰이드 보우", "무기"),
      createItem("데아 시두스 이어링", "귀고리"),
      createItem("블랙빈 마크", "눈장식"),
      createItem("고귀한 이피아의 반지", "반지"),
      createItem("영생의 돌", "포켓"),
      createItem("몽환의 벨트", "벨트"),
      createItem("거대한 공포", "눈장식"),
    ];

    const orderedSetIds = getActiveEquipmentSets(items).map((set) => set.id);

    expect(orderedSetIds).toEqual([
      "arcane-shade",
      "absolabs",
      "dawn-boss",
      "commander-loot",
      "expedition-boss-loot",
    ]);
  });

  it("matches [프리미엄] prefixed root abyss unique weapon names", () => {
    const items: CharacterItemEquipment[] = [
      createItem("이글아이 레인저후드", "상의", { item_grade: "유니크" }),
      createItem("트릭스터 레인저팬츠", "하의", { item_grade: "유니크" }),
      createItem("[프리미엄] 파프니르 체인", "무기", { item_grade: "유니크" }),
    ];

    const rootAbyss = getActiveEquipmentSets(items).find(
      (set) => set.id === "root-abyss-unique",
    );

    expect(rootAbyss?.count).toBe(3);
  });

  it("does not normalize names for sets without nameNormalization option", () => {
    const items: CharacterItemEquipment[] = [
      createItem("[프리미엄] 도전자의 무기", "무기"),
      createItem("도전자의 상의", "상의"),
      createItem("도전자의 하의", "하의"),
      createItem("도전자의 모자", "모자"),
      createItem("도전자의 장갑", "장갑"),
      createItem("도전자의 신발", "신발"),
      createItem("도전자의 어깨장식", "어깨"),
      createItem("도전자의 망토", "망토"),
    ];

    const challenger = getActiveEquipmentSets(items).find(
      (set) => set.id === "challenger",
    );

    expect(challenger?.count).toBe(7);
  });

  it("counts all 8 challenger slots correctly", () => {
    const items: CharacterItemEquipment[] = [
      createItem("도전자의 무기", "무기"),
      createItem("도전자의 상의", "상의"),
      createItem("도전자의 하의", "하의"),
      createItem("도전자의 모자", "모자"),
      createItem("도전자의 장갑", "장갑"),
      createItem("도전자의 신발", "신발"),
      createItem("도전자의 어깨장식", "어깨"),
      createItem("도전자의 망토", "망토"),
    ];

    const challenger = getActiveEquipmentSets(items).find(
      (set) => set.id === "challenger",
    );

    expect(challenger?.count).toBe(8);
    expect(challenger?.effects.length).toBeGreaterThan(0);
  });

  it("applies challenger starforce threshold at 170 when total starforce is 175", () => {
    const items: CharacterItemEquipment[] = [
      createItem("도전자의 무기", "무기", { starforce_upgrade: "25" }),
      createItem("도전자의 상의", "상의", { starforce_upgrade: "25" }),
      createItem("도전자의 하의", "하의", { starforce_upgrade: "25" }),
      createItem("도전자의 모자", "모자", { starforce_upgrade: "25" }),
      createItem("도전자의 장갑", "장갑", { starforce_upgrade: "25" }),
      createItem("도전자의 신발", "신발", { starforce_upgrade: "25" }),
      createItem("도전자의 어깨장식", "어깨", { starforce_upgrade: "25" }),
      createItem("도전자의 망토", "망토", { starforce_upgrade: "0" }),
    ];

    const challenger = getActiveEquipmentSets(items).find(
      (set) => set.id === "challenger",
    );

    expect(challenger?.totalStarForce).toBe(175);
    expect(challenger?.appliedStarForceThreshold).toBe(170);
  });
});
