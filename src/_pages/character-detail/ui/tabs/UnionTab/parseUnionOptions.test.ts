import { describe, expect, it } from "vitest";
import { parseUnionOptions, splitUnionOptionValue } from "./parseUnionOptions";

describe("parseUnionOptions", () => {
  it("배열 응답은 옵션명과 값을 한 줄로 합친다", () => {
    expect(
      parseUnionOptions([
        { option_name: "STR", option_value: "40" },
        { option_name: "크리티컬 확률", option_value: "3%" },
      ]),
    ).toEqual(["STR 40", "크리티컬 확률 3%"]);
  });

  it("문자열 응답은 콤마로 나누되 숫자 사이 콤마는 유지한다", () => {
    expect(parseUnionOptions("STR 1,000, 버프 지속시간 40%")).toEqual([
      "STR 1,000",
      "버프 지속시간 40%",
    ]);
  });

  it("값이 없으면 빈 배열", () => {
    expect(parseUnionOptions(null)).toEqual([]);
    expect(parseUnionOptions("")).toEqual([]);
  });
});

describe("splitUnionOptionValue", () => {
  it("끝에 붙은 수치를 라벨과 분리한다", () => {
    expect(splitUnionOptionValue("STR 1,000")).toEqual({
      label: "STR",
      value: "1,000",
    });
    expect(splitUnionOptionValue("보스 데미지 +5.5%")).toEqual({
      label: "보스 데미지",
      value: "+5.5%",
    });
  });

  it("수치가 없으면 전체를 라벨로 둔다", () => {
    expect(splitUnionOptionValue("공격 시 일정 확률로 회복")).toEqual({
      label: "공격 시 일정 확률로 회복",
      value: null,
    });
  });
});
