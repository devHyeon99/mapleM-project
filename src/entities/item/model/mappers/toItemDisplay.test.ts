import { describe, expect, it } from "vitest";
import type {
  CharacterAndroidEquipment,
  CharacterHeartEquipment,
  CharacterItemEquipment,
} from "../types";
import {
  toAndroidDisplay,
  toEquipmentDisplay,
  toHeartDisplay,
} from "./toItemDisplay";

describe("toItemDisplay mappers", () => {
  it("equipment 아이템을 source=equipment로 변환한다", () => {
    const equipment: CharacterItemEquipment = {
      item_name: "파프니르 완드",
      item_equipment_page_name: "무기",
      item_equipment_slot_name: "무기",
      item_grade: "레전드리",
      item_icon: "/wand.png",
      item_basic_option: [],
      item_additional_option: [],
      item_potential_option: [],
      item_additional_potential_option: [],
    };

    const result = toEquipmentDisplay(equipment);
    expect(result.source).toBe("equipment");
    expect(result.item_equipment_slot_name).toBe("무기");
  });

  it("android 정보를 표시용 아이템으로 정규화한다", () => {
    const android: CharacterAndroidEquipment = {
      android_name: "메르세데스 안드로이드",
      android_nickname: "메르",
      android_icon: "/android.png",
      android_description: "android desc",
      android_grade: "3",
      android_gender: "F",
      android_non_humanoid_flag: "0",
      android_warehouse_usable_flag: "1",
      android_cash_item_equipment: [],
    };

    const result = toAndroidDisplay(android);
    expect(result.source).toBe("android");
    expect(result.item_equipment_slot_name).toBe("안드로이드");
    expect(result.item_basic_option).toEqual([]);
    expect(result.item_potential_option).toEqual([]);
  });

  it("heart 이름에 따라 등급을 매핑하고 옵션 배열을 유지한다", () => {
    const heart: CharacterHeartEquipment = {
      heart_name: "골드 하트",
      heart_icon: "/heart.png",
      heart_description: "heart desc",
      item_additional_option_grade: "레전드리",
      item_potential_option_grade: "유니크",
      item_additional_option: [
        { option_no: 1, option_name: "물리 공격력", option_value: "10" },
      ],
      item_potential_option: [
        { option_no: 1, option_name: "보스 공격력", option_value: "30%" },
      ],
    };

    const result = toHeartDisplay(heart);
    expect(result.source).toBe("heart");
    expect(result.item_grade).toBe("2");
    expect(result.item_equipment_slot_name).toBe("하트");
    expect(result.item_additional_option).toEqual(heart.item_additional_option);
    expect(result.item_potential_option).toEqual(heart.item_potential_option);
  });
});
