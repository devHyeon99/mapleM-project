import { describe, expect, it } from "vitest";
import type { CharacterItemEquipment } from "@/entities/item";
import { EQUIPMENT_SET_DEFINITIONS } from "../model";
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
      arcaneShade?.combinedEffects.find(
        (effect) => effect.key === "finalDamage",
      )?.value,
    ).toBe(21);
  });

  it("아케인셰이드 1종은 앱솔랩스 세트 수를 1 보정한다", () => {
    const items: CharacterItemEquipment[] = [
      createItem("아케인셰이드 시프슈트", "한벌옷", {
        starforce_upgrade: "35",
      }),
      createItem("앱솔랩스 시프캡", "모자", { starforce_upgrade: "18" }),
      createItem("앱솔랩스 시프글러브", "장갑", { starforce_upgrade: "18" }),
      createItem("앱솔랩스 시프슈즈", "신발", { starforce_upgrade: "18" }),
      createItem("앱솔랩스 시프숄더", "어깨", { starforce_upgrade: "18" }),
      createItem("앱솔랩스 시프케이프", "망토", { starforce_upgrade: "18" }),
      createItem("앱솔랩스 시프대거", "무기", { starforce_upgrade: "18" }),
    ];

    const sets = getActiveEquipmentSets(items);
    const absolabs = sets.find((set) => set.id === "absolabs");
    const arcaneShade = sets.find((set) => set.id === "arcane-shade");

    expect(absolabs?.count).toBe(7);
    expect(absolabs?.correctedFromArcaneShade).toBe(true);
    // 아케인셰이드 한벌옷 35성은 2배인 70으로 계산돼 앱솔랩스 108에 합산된다
    expect(absolabs?.totalStarForce).toBe(178);
    expect(absolabs?.appliedStarForceThreshold).toBe(140);
    expect(arcaneShade?.totalStarForce).toBe(70);
    expect(arcaneShade?.effects).toEqual([]);
  });

  it("아케인셰이드 2종부터는 보정이 해제된다", () => {
    const items: CharacterItemEquipment[] = [
      createItem("아케인셰이드 나이트로드", "한벌옷"),
      createItem("아케인셰이드 대거", "무기"),
      createItem("앱솔랩스 나이트헬름", "모자"),
      createItem("앱솔랩스 나이트글러브", "장갑"),
    ];

    const sets = getActiveEquipmentSets(items);

    expect(sets.find((set) => set.id === "absolabs")?.count).toBe(2);
    expect(
      sets.find((set) => set.id === "absolabs")?.correctedFromArcaneShade,
    ).toBe(false);
    expect(sets.find((set) => set.id === "arcane-shade")?.count).toBe(2);
  });

  it("앱솔랩스를 하나도 안 입으면 보정하지 않는다", () => {
    const items: CharacterItemEquipment[] = [
      createItem("아케인셰이드 나이트로드", "한벌옷"),
    ];

    const sets = getActiveEquipmentSets(items);

    expect(sets.find((set) => set.id === "absolabs")).toBeUndefined();
  });

  it("칠흑의 보스는 엠블렘·마도서까지 포함해 9세트까지 계산한다", () => {
    const items: CharacterItemEquipment[] = [
      createItem("루즈 컨트롤 머신 마크", "얼굴장식"),
      createItem("마력이 깃든 안대", "눈장식"),
      createItem("몽환의 벨트", "벨트"),
      createItem("저주받은 적의 마도서", "포켓"),
      createItem("거대한 공포", "반지"),
      createItem("고통의 근원", "목걸이"),
      createItem("커맨더 포스 이어링", "귀고리"),
      createItem("창세의 뱃지", "뱃지"),
      createItem("미트라의 분노 : 도적", "엠블렘"),
    ];

    const dawnBoss = getActiveEquipmentSets(items).find(
      (set) => set.id === "dawn-boss",
    );
    const effect = (key: string) =>
      dawnBoss?.effects.find((row) => row.key === key)?.value;

    expect(dawnBoss?.count).toBe(9);
    expect(effect("maxDamageIncrease")).toBe(60_000_000);
    expect(effect("finalDamage")).toBe(28);
    expect(effect("ignoreDefense")).toBe(30);
    expect(effect("stance")).toBe(30);
  });
});

// 배열 순서가 곧 아이템 탭·계산기의 노출 순서라 순서가 밀리면 여기서 걸림
describe("EQUIPMENT_SET_DEFINITIONS", () => {
  it("등급 쌍은 레전더리를 먼저 둔다", () => {
    expect(
      EQUIPMENT_SET_DEFINITIONS.map((definition) => definition.id),
    ).toEqual([
      "arcane-shade",
      "absolabs",
      "challenger",
      "root-abyss-legendary",
      "root-abyss-unique",
      "pensalir-legendary",
      "pensalir-unique",
      "muspell-legendary",
      "muspell-unique",
      "dawn-boss",
      "commander-loot",
      "expedition-boss-loot",
    ]);
  });
});
