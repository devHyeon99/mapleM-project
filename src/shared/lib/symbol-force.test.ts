import { describe, it, expect } from "vitest";
import { sumSymbolStats } from "./symbol-force";

const symbol = (symbol_option: string) => ({ symbol_option });

describe("sumSymbolStats", () => {
  it("표기 형태가 달라도 같은 이름끼리 합산한다", () => {
    expect(
      sumSymbolStats([
        symbol("STR 증가 : +1,500, 아케인포스 증가 : +30"),
        symbol("STR +500"),
      ]),
    ).toEqual([{ name: "STR", value: "2,000" }]);
  });

  it("정률과 정액은 이름이 같아도 따로 합산한다", () => {
    expect(
      sumSymbolStats([symbol("최대 HP +5%"), symbol("최대 HP +1,000")]),
    ).toEqual([
      { name: "최대 HP", value: "5%" },
      { name: "최대 HP", value: "1,000" },
    ]);
  });

  it("값이 없는 옵션과 빈 입력은 무시한다", () => {
    expect(sumSymbolStats([symbol(""), symbol("설명만 있는 옵션")])).toEqual([]);
    expect(sumSymbolStats(undefined)).toEqual([]);
  });
});
