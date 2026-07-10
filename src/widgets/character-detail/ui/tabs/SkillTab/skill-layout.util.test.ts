import { describe, it, expect } from "vitest";
import { getPageRows } from "./skill-layout.util";

describe("skill-layout.util", () => {
  it("세트 1 앞면 배치", () => {
    expect(getPageRows(1, "front")).toEqual([
      ["88", "87", "86", "85"],
      ["81", "82", "83", "84"],
      ["80", "79", "78", "101"],
    ]);
  });

  it("앞뒷면이 겹치지 않고 세트의 24칸을 모두 채운다", () => {
    const all = [
      ...getPageRows(1, "front").flat(),
      ...getPageRows(1, "back").flat(),
    ].map(Number);

    expect(new Set(all).size).toBe(24);
    expect(Math.min(...all)).toBe(78);
    expect(Math.max(...all)).toBe(101);
  });

  it("세트마다 배치가 그대로 24칸씩 뒤로 밀린다", () => {
    for (const page of ["front", "back"] as const) {
      const shifted = getPageRows(1, page)
        .flat()
        .map((id) => String(Number(id) + 24));

      expect(getPageRows(2, page).flat()).toEqual(shifted);
    }
  });
});
