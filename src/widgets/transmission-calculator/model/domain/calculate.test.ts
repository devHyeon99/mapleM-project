import { describe, expect, it } from "vitest";

import {
  calculateTransmission,
  canTransmit,
  getClampedStarforce,
  getTargetTiers,
  sanitizeState,
} from "./calculate";
import { createInitialState } from "./data";
import type { TransmissionState } from "./types";

const makeState = (overrides: Partial<TransmissionState> = {}) => ({
  ...createInitialState(),
  ...overrides,
});

const toRootAbyss = (overrides: Partial<TransmissionState> = {}) =>
  makeState({ sourceTier: "pensalir", targetTier: "rootAbyss", ...overrides });

const findRow = (state: TransmissionState, key: string) =>
  calculateTransmission(state).rows.find((row) => row.key === key);

describe("calculateTransmission", () => {
  it("앱솔랩스 스타포스는 성당 3,000만 메소 · 주문서 2개로 쌓인다", () => {
    const row = findRow(
      makeState({ sourceTier: "rootAbyss", targetTier: "absolabs", starforce: 30 }),
      "starforce",
    );

    expect(row?.cost).toEqual({ meso: 900_000_000, scroll: 60 });
  });

  it("아케인셰이드 스타포스 35성은 공개 표와 같다", () => {
    const row = findRow(makeState({ starforce: 35 }), "starforce");

    expect(row?.cost).toEqual({ meso: 1_575_000_000, scroll: 175 });
  });

  it("루타비스 스타포스는 성당 2,750만 메소 · 주문서 1개로 쌓인다", () => {
    const row = findRow(toRootAbyss({ starforce: 3 }), "starforce");

    expect(row?.cost).toEqual({ meso: 82_500_000, scroll: 3 });
  });

  it("잠재 3줄은 2줄의 1.5배이고 주문서는 반올림한다", () => {
    const arcane = findRow(makeState({ potential: "legendary-3" }), "potential");
    const rootAbyss = findRow(toRootAbyss({ potential: "epic-3" }), "potential");

    // 아케인셰이드 레전드 2줄 1,125,000,000 · 125개 기준
    expect(arcane?.cost).toEqual({ meso: 1_687_500_000, scroll: 188 });
    // 루타비스 에픽 2줄 137,500,000 · 5개 기준
    expect(rootAbyss?.cost).toEqual({ meso: 206_250_000, scroll: 8 });
  });

  it("추가옵션 1줄은 2줄의 절반이고 주문서는 반올림한다", () => {
    const twoLines = findRow(
      toRootAbyss({ additionalOption: "unique-2" }),
      "additionalOption",
    );
    const oneLine = findRow(
      toRootAbyss({ additionalOption: "unique-1" }),
      "additionalOption",
    );

    expect(twoLines?.cost).toEqual({ meso: 687_500_000, scroll: 25 });
    expect(oneLine?.cost).toEqual({ meso: 343_750_000, scroll: 13 });
  });

  it("윗잠과 아랫잠은 같은 표를 각각 적용한다", () => {
    const result = calculateTransmission(
      makeState({ potential: "epic-2", additionalPotential: "epic-2" }),
    );

    expect(result.total).toEqual({ meso: 450_000_000, scroll: 50 });
  });

  it("에디셔널을 부여할 수 없는 루타비스는 아랫잠을 계산하지 않는다", () => {
    const result = calculateTransmission(
      toRootAbyss({ potential: "epic-2", additionalPotential: "epic-2" }),
    );

    expect(result.rows).toHaveLength(1);
    expect(result.total).toEqual({ meso: 137_500_000, scroll: 5 });
  });

  it("펜살리르에서 뽑으면 전수 장비와 무관하게 아랫잠을 계산하지 않는다", () => {
    // 160제라 에디셔널이 부여되지 않는 장비임
    const result = calculateTransmission(
      makeState({
        sourceTier: "pensalir",
        targetTier: "arcaneShade",
        additionalPotential: "legendary-2",
      }),
    );

    expect(result.rows).toHaveLength(0);
  });

  it("전수 장비가 받지 못하는 잠재 등급은 계산하지 않는다", () => {
    // 루타비스는 유니크 등급까지만 받음
    const result = calculateTransmission(toRootAbyss({ potential: "legendary-2" }));

    expect(result.rows).toHaveLength(0);
  });

  it("추가옵션과 소울을 더한 합계를 낸다", () => {
    const result = calculateTransmission(
      makeState({
        sourceTier: "rootAbyss",
        targetTier: "absolabs",
        additionalOption: "unique-2",
        soul: true,
      }),
    );

    expect(result.total).toEqual({ meso: 1_500_000_000, scroll: 100 });
  });

  it("전수 안 함만 고르면 비용이 0이다", () => {
    const result = calculateTransmission(makeState());

    expect(result.rows).toHaveLength(0);
    expect(result.total).toEqual({ meso: 0, scroll: 0 });
  });

  it("확장권 구간까지 계산한다", () => {
    // 루타비스는 확장권을 써야 31성이 되고, 앱솔랩스가 받으면 그대로 들어감
    const row = findRow(
      makeState({ sourceTier: "rootAbyss", targetTier: "absolabs", starforce: 31 }),
      "starforce",
    );

    expect(row?.cost).toEqual({ meso: 930_000_000, scroll: 62 });
  });

  it("스타포스는 추출 장비와 전수 장비 상한 중 낮은 쪽까지만 계산한다", () => {
    // 펜살리르 25성 < 아케인셰이드 36성
    expect(getClampedStarforce("pensalir", "arcaneShade", 36)).toBe(25);
    // 루타비스 31성 < 앱솔랩스 36성
    expect(getClampedStarforce("rootAbyss", "absolabs", 36)).toBe(31);
    expect(getClampedStarforce("absolabs", "arcaneShade", 40)).toBe(36);
    expect(getClampedStarforce("absolabs", "arcaneShade", -1)).toBe(0);
  });
});

describe("sanitizeState", () => {
  it("전수 장비가 받지 못하는 선택을 비운다", () => {
    const sanitized = sanitizeState(
      toRootAbyss({
        starforce: 31,
        potential: "legendary-3",
        additionalPotential: "epic-2",
      }),
    );

    expect(sanitized.starforce).toBe(25);
    expect(sanitized.potential).toBe("none");
    expect(sanitized.additionalPotential).toBe("none");
  });

  it("추출 장비가 에디셔널을 갖지 못하면 아랫잠을 비운다", () => {
    const sanitized = sanitizeState(
      makeState({
        sourceTier: "pensalir",
        targetTier: "arcaneShade",
        additionalPotential: "unique-2",
      }),
    );

    expect(sanitized.additionalPotential).toBe("none");
  });

  it("받을 수 있는 선택은 그대로 둔다", () => {
    const sanitized = sanitizeState(makeState({ potential: "legendary-3" }));

    expect(sanitized.potential).toBe("legendary-3");
  });
});

describe("canTransmit", () => {
  it("상위 등급대로만 전수할 수 있다", () => {
    expect(canTransmit("pensalir", "absolabs")).toBe(true);
    expect(canTransmit("absolabs", "absolabs")).toBe(false);
    expect(canTransmit("absolabs", "rootAbyss")).toBe(false);
  });

  it("추출 장비보다 상위인 전수 장비만 목록에 남는다", () => {
    expect(getTargetTiers("pensalir")).toEqual([
      "rootAbyss",
      "absolabs",
      "arcaneShade",
    ]);
    expect(getTargetTiers("rootAbyss")).toEqual(["absolabs", "arcaneShade"]);
    expect(getTargetTiers("absolabs")).toEqual(["arcaneShade"]);
  });
});
