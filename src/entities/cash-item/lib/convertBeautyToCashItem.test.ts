import { describe, expect, it } from "vitest";
import type { CharacterBeautyData } from "../model/types";
import { convertBeautyToCashItem } from "./convertBeautyToCashItem";

const emptyStyle = {
  base_color: null,
  mix_color: null,
  mix_rate: null,
  freestyle_coupon_flag: null,
};

// 넥슨이 실제로 보낸 빈 뷰티 응답 형태 (메이플스토리M 엘리시움 캐릭터 실측)
const emptyBeauty: CharacterBeautyData = {
  character_class: null,
  character_gender: null,
  character_hair: { hair_name: null, ...emptyStyle },
  character_face: { face_name: null, ...emptyStyle },
  character_skin_name: null,
  additional_character_hair: { hair_name: null, ...emptyStyle },
  additional_character_face: { face_name: null, ...emptyStyle },
  additional_character_skin_name: null,
};

describe("convertBeautyToCashItem", () => {
  it("값이 전부 null 이면 슬롯을 만들지 않음", () => {
    expect(convertBeautyToCashItem(emptyBeauty)).toEqual([]);
  });

  it("성별이 null 이면 여자로 단정하지 않음", () => {
    const [hair] = convertBeautyToCashItem({
      ...emptyBeauty,
      character_hair: { hair_name: "검은 헤어", ...emptyStyle },
    });
    expect(hair.cash_item_name).toBe("검은 헤어");
    expect(hair.cash_item_gender).toBeNull();
  });

  it("성별 코드를 한글로 변환", () => {
    const [male] = convertBeautyToCashItem({
      ...emptyBeauty,
      character_gender: "Male",
      character_skin_name: "피부",
    });
    const [female] = convertBeautyToCashItem({
      ...emptyBeauty,
      character_gender: "Female",
      character_skin_name: "피부",
    });
    expect(male.cash_item_gender).toBe("남자");
    expect(female.cash_item_gender).toBe("여자");
  });
});
