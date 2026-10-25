import { describe, expect, it } from "vitest";
import { getTabScrollTarget } from "./tabScroll";

// 뷰포트 500px 기준 탭 바: 보이는 너비 468, 전체 935 → 최대 scrollLeft 467
const NARROW = { clientWidth: 468, scrollWidth: 935 };
// 한 화면에 두 번 이상 넘겨야 하는 긴 목록: 최대 scrollLeft 1600
const WIDE = { clientWidth: 400, scrollWidth: 2000 };

describe("getTabScrollTarget", () => {
  it("남은 거리가 한 스텝에 못 미치면 한 번에 끝까지 간다", () => {
    expect(getTabScrollTarget({ ...NARROW, scrollLeft: 0 }, "right")).toBe(467);
    expect(getTabScrollTarget({ ...NARROW, scrollLeft: 467 }, "left")).toBe(0);
  });

  it("아직 멀면 한 스텝만 이동한다", () => {
    expect(getTabScrollTarget({ ...WIDE, scrollLeft: 0 }, "right")).toBe(320);
    expect(getTabScrollTarget({ ...WIDE, scrollLeft: 1300 }, "left")).toBe(980);
  });

  it("이동 결과는 항상 0 과 최대 scrollLeft 사이에 있다", () => {
    for (const metrics of [NARROW, WIDE]) {
      const max = metrics.scrollWidth - metrics.clientWidth;

      for (const scrollLeft of [0, max / 2, max]) {
        for (const direction of ["left", "right"] as const) {
          const target = getTabScrollTarget(
            { ...metrics, scrollLeft },
            direction,
          );

          expect(target).toBeGreaterThanOrEqual(0);
          expect(target).toBeLessThanOrEqual(max);
        }
      }
    }
  });

  it("스크롤할 내용이 없으면 제자리인 0 을 돌려준다", () => {
    const noOverflow = { clientWidth: 500, scrollWidth: 400, scrollLeft: 0 };

    expect(getTabScrollTarget(noOverflow, "right")).toBe(0);
    expect(getTabScrollTarget(noOverflow, "left")).toBe(0);
  });
});
