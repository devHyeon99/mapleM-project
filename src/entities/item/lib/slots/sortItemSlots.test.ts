import { describe, expect, it } from "vitest";
import {
  EQUIP_SLOT_ORDER_GRID_ONEPIECE,
  EQUIP_SLOT_ORDER_GRID_TOPBOTTOM,
  EQUIP_SLOT_ORDER_LIST_ONEPIECE,
  EQUIP_SLOT_ORDER_LIST_TOPBOTTOM,
} from "@/shared/config/constants/item_slot";
import type {
  AndroidEquipment,
  HeartEquipment,
  CharacterItemEquipment,
} from "../../model/types";
import { sortItems, sortItemsForList } from "./sortItemSlots";

const createEquipment = (
  slotName: string,
  overrides: Partial<CharacterItemEquipment> = {},
): CharacterItemEquipment => ({
  item_name: `${slotName} 아이템`,
  item_equipment_page_name: slotName,
  item_equipment_slot_name: slotName,
  item_grade: "레전드리",
  item_icon: "/item.png",
  item_basic_option: [],
  item_additional_option: [],
  item_potential_option: [],
  item_additional_potential_option: [],
  ...overrides,
});

const android: AndroidEquipment = {
  android_name: "테스트 안드로이드",
  android_nickname: "안드",
  android_icon: "/android.png",
  android_description: "android desc",
  android_grade: "3",
  android_gender: "F",
  android_non_humanoid_flag: "0",
  android_warehouse_usable_flag: "1",
  android_cash_item_equipment: [],
};

const heart: HeartEquipment = {
  heart_name: "골드 하트",
  heart_icon: "/heart.png",
  heart_description: "heart desc",
  item_additional_option_grade: "레전드리",
  item_potential_option_grade: "유니크",
  item_additional_option: [],
  item_potential_option: [],
};

describe("sortItems", () => {
  it("한벌옷이 없으면 grid top/bottom 슬롯 순서를 사용한다", () => {
    const result = sortItems([createEquipment("상의"), createEquipment("하의")], null, null);
    expect(result.map((slot) => slot.slotName)).toEqual(EQUIP_SLOT_ORDER_GRID_TOPBOTTOM);
  });

  it("한벌옷이 있으면 grid onepiece 슬롯 순서를 사용한다", () => {
    const result = sortItems([createEquipment("한벌옷")], null, null);
    expect(result.map((slot) => slot.slotName)).toEqual(EQUIP_SLOT_ORDER_GRID_ONEPIECE);
    expect(result.find((slot) => slot.slotName === "상의")).toBeUndefined();
  });

  it("android/heart 정보를 display item으로 삽입한다", () => {
    const result = sortItems([createEquipment("무기")], android, heart);
    const androidSlot = result.find((slot) => slot.slotName === "안드로이드");
    const heartSlot = result.find((slot) => slot.slotName === "하트");

    expect(androidSlot?.item?.source).toBe("android");
    expect(heartSlot?.item?.source).toBe("heart");
    expect(heartSlot?.item?.item_grade).toBe("2");
  });
});

describe("sortItemsForList", () => {
  it("한벌옷이 없으면 list top/bottom 슬롯 순서를 사용한다", () => {
    const result = sortItemsForList([createEquipment("상의"), createEquipment("하의")], null, null);
    expect(result.map((slot) => slot.slotName)).toEqual(EQUIP_SLOT_ORDER_LIST_TOPBOTTOM);
  });

  it("한벌옷이 있으면 list onepiece 슬롯 순서를 사용한다", () => {
    const result = sortItemsForList([createEquipment("한벌옷")], null, null);
    expect(result.map((slot) => slot.slotName)).toEqual(EQUIP_SLOT_ORDER_LIST_ONEPIECE);
    expect(result.find((slot) => slot.slotName === "상의")).toBeUndefined();
  });
});
