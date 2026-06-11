import { describe, it, expect } from "vitest";
import { tallyWorldCounts } from "./tallyWorldCounts";

const rows = (...names: string[]) =>
  names.map((world_name) => ({ world_name }));

describe("tallyWorldCounts", () => {
  it("월드별로 세고 많은 순으로 정렬한다", () => {
    expect(
      tallyWorldCounts(rows("루나", "스카니아", "루나", "스카니아", "루나")),
    ).toEqual([
      { worldName: "루나", count: 3 },
      { worldName: "스카니아", count: 2 },
    ]);
  });

  it("동률이면 월드명 순으로 고정해 렌더 순서가 흔들리지 않게 한다", () => {
    expect(
      tallyWorldCounts(rows("크로아", "아케인")).map((w) => w.worldName),
    ).toEqual(["아케인", "크로아"]);
  });

  it("빈 입력은 빈 배열", () => {
    expect(tallyWorldCounts([])).toEqual([]);
  });
});
