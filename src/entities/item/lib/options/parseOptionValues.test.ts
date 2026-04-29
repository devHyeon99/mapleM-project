import { describe, expect, it } from "vitest";
import { getItemSpec } from "../specs/summarizeItemSpecs";
import { parseNumericOptionValue } from "./parseOptionValues";
import type { CharacterItemEquipment } from "../../model/types";

const createItem = (
  overrides: Partial<CharacterItemEquipment> = {},
): CharacterItemEquipment => ({
  item_name: "테스트 장비",
  item_equipment_page_name: "무기",
  item_equipment_slot_name: "무기",
  item_grade: "레전드리",
  item_icon: "/test.png",
  item_basic_option: [],
  item_additional_option: [],
  item_potential_option: [],
  item_additional_potential_option: [],
  ...overrides,
});

describe("parseNumericOptionValue", () => {
  it("부호, 백분율, 천단위 구분자가 붙은 값을 숫자로 변환한다", () => {
    expect(parseNumericOptionValue("12%")).toBe(12);
    expect(parseNumericOptionValue("+1,200")).toBe(1200);
    expect(parseNumericOptionValue("-3.5%")).toBe(-3.5);
  });

  it("숫자가 여러 개인 값은 첫 번째 숫자만 사용한다", () => {
    expect(parseNumericOptionValue("12% ~ 15%")).toBe(12);
  });

  it("숫자가 없거나 빈 값은 0으로 처리한다", () => {
    expect(parseNumericOptionValue("")).toBe(0);
    expect(parseNumericOptionValue(null)).toBe(0);
    expect(parseNumericOptionValue("없음")).toBe(0);
  });
});

describe("getItemSpec", () => {
  it("직업 유형에 맞는 주옵션과 별칭 옵션을 정확히 집계한다", () => {
    const items = [
      createItem({
        item_potential_option: [
          { option_no: 1, option_name: "마댐", option_value: "12%" },
          { option_no: 2, option_name: "보공", option_value: "30%" },
        ],
        item_additional_potential_option: [
          { option_no: 1, option_name: "마법 대미지", option_value: "9%" },
        ],
        item_additional_option: [
          { option_no: 1, option_name: "최종 대미지", option_value: "3%" },
          { option_no: 2, option_name: "방어율 무시", option_value: "4%" },
          { option_no: 3, option_name: "마공", option_value: "21" },
        ],
      }),
    ];

    const summary = getItemSpec(items, "비숍");

    expect(summary.labelDamage).toBe("마댐");
    expect(summary.potential).toBe(42);
    expect(summary.additional).toBe(9);
    expect(summary.chuop.finalDamage).toBe(3);
    expect(summary.chuop.ignoreDef).toBe(4);
    expect(summary.chuop.atk).toBe(21);
  });
});
