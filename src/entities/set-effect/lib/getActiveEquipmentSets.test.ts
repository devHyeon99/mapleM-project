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
  it("세트 정의 순서대로 렌더링 순서를 유지한다", () => {
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

  it("[프리미엄] 접두사가 붙은 루타비스 유니크 무기 이름도 매칭한다", () => {
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

  it("nameNormalization 옵션이 없는 세트는 이름 정규화를 적용하지 않는다", () => {
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

  it("도전자 세트 8개 부위를 모두 올바르게 계산한다", () => {
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

  it("도전자 세트의 총 스타포스가 175면 170 구간 효과를 적용한다", () => {
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

  it("무기 포함 세트를 3부위 이상 착용하면 제네시스 무기를 럭키 아이템으로 계산한다", () => {
    const items: CharacterItemEquipment[] = [
      createItem("이글아이 레인저후드", "상의", {
        item_grade: "유니크",
        starforce_upgrade: "15",
      }),
      createItem("트릭스터 레인저팬츠", "하의", {
        item_grade: "유니크",
        starforce_upgrade: "15",
      }),
      createItem("하이네스 레인저햇", "모자", {
        item_grade: "유니크",
        starforce_upgrade: "15",
      }),
      createItem("제네시스 보우", "무기", {
        item_grade: "레전더리",
        starforce_upgrade: "25",
      }),
    ];

    const rootAbyss = getActiveEquipmentSets(items).find(
      (set) => set.id === "root-abyss-unique",
    );

    expect(rootAbyss?.count).toBe(4);
    expect(rootAbyss?.totalStarForce).toBe(70);
    expect(rootAbyss?.appliedStarForceThreshold).toBe(60);
  });

  it("기본 세트 착용 수가 3 미만이면 제네시스 럭키 아이템 효과를 적용하지 않는다", () => {
    const items: CharacterItemEquipment[] = [
      createItem("이글아이 레인저후드", "상의", {
        item_grade: "유니크",
        starforce_upgrade: "15",
      }),
      createItem("트릭스터 레인저팬츠", "하의", {
        item_grade: "유니크",
        starforce_upgrade: "15",
      }),
      createItem("제네시스 보우", "무기", {
        item_grade: "레전더리",
        starforce_upgrade: "25",
      }),
    ];

    const rootAbyss = getActiveEquipmentSets(items).find(
      (set) => set.id === "root-abyss-unique",
    );

    expect(rootAbyss?.count).toBe(2);
    expect(rootAbyss?.totalStarForce).toBe(30);
    expect(rootAbyss?.appliedStarForceThreshold).toBe(30);
  });

  it("제네시스 무기와 앱솔랩스 3부위, 아케인셰이드 3부위를 함께 착용하면 두 세트 모두 4세트로 계산한다", () => {
    const items: CharacterItemEquipment[] = [
      createItem("앱솔랩스 나이트헬름", "모자", { starforce_upgrade: "15" }),
      createItem("앱솔랩스 나이트슈트", "한벌옷", {
        item_equipment_page_name: "한벌옷",
        starforce_upgrade: "15",
      }),
      createItem("앱솔랩스 나이트글러브", "장갑", {
        starforce_upgrade: "15",
      }),
      createItem("아케인셰이드 보우", "견장", { starforce_upgrade: "15" }),
      createItem("아케인셰이드 아처슈즈", "신발", { starforce_upgrade: "15" }),
      createItem("아케인셰이드 아처케이프", "망토", {
        starforce_upgrade: "15",
      }),
      createItem("제네시스 보우", "무기", {
        item_grade: "레전더리",
        starforce_upgrade: "25",
      }),
    ];

    const activeSets = getActiveEquipmentSets(items);
    const absolabs = activeSets.find((set) => set.id === "absolabs");
    const arcaneShade = activeSets.find((set) => set.id === "arcane-shade");

    // 앱솔랩스 3부위 + 제네시스 무기(25성) => 4세트, 한벌옷은 2배 합산되어 총 스타포스 85
    expect(absolabs?.count).toBe(4);
    expect(absolabs?.totalStarForce).toBe(85);
    expect(absolabs?.appliedStarForceThreshold).toBe(70);
    expect(
      absolabs?.effects.find((effect) => effect.key === "bossAttack")?.value,
    ).toBe(8);
    expect(
      absolabs?.starForceEffects.find((effect) => effect.key === "bossAttack")
        ?.value,
    ).toBe(10);
    expect(
      absolabs?.combinedEffects.find((effect) => effect.key === "bossAttack")
        ?.value,
    ).toBe(18);

    // 아케인셰이드 3부위 + 제네시스 무기(25성) => 4세트, 총 스타포스 70
    expect(arcaneShade?.count).toBe(4);
    expect(arcaneShade?.totalStarForce).toBe(70);
    expect(arcaneShade?.appliedStarForceThreshold).toBe(55);
    expect(
      arcaneShade?.effects.find((effect) => effect.key === "finalDamage")
        ?.value,
    ).toBe(12);
    expect(
      arcaneShade?.starForceEffects.find(
        (effect) => effect.key === "finalDamage",
      )?.value,
    ).toBe(9);
    expect(
      arcaneShade?.combinedEffects.find((effect) => effect.key === "finalDamage")
        ?.value,
    ).toBe(21);
  });
});
