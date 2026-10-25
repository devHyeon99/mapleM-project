import type { PotentialOption, PotentialTier } from "./potential-types";

// 잠재 모드(잠재/에디셔널)와 큐브 타입의 허용값 정의
// 새로운 모드/큐브를 지원하면 여기 유니온 타입을 함께 확장해야 함.
export type PotentialMode = "potential" | "additional";
export type CubeType = "red" | "black" | "additional" | "whiteAdditional";

// 한 번의 롤에서 생성되는 단일 줄 정보(1/2/3번째 줄)
export type RolledPotentialLine = {
  slot: "first" | "second" | "third";
  option: PotentialOption;
};

// 큐브 1회 사용 결과 스냅샷
// - startingTier/resolvedTier: 등급업 전/후 등급
export type CubeRollResult = {
  cubeType: CubeType;
  startingTier: PotentialTier;
  resolvedTier: PotentialTier;
  lines: RolledPotentialLine[];
};
