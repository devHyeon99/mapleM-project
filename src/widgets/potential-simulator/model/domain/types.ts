// 환생의 불꽃 종류
export type FlameType = "powerful" | "eternal" | "black";

// 시뮬레이터에서 지원하는 장비 분류
export type EquipmentCategory =
  | "weapon"
  | "secondaryWeapon"
  | "emblem"
  | "watch"
  | "armor"
  | "pocket"
  | "heart";

// 장비 레벨 선택값 (기계심장은 별도 등급 사용)
export type EquipmentLevel = 140 | 160 | 180 | 200;
// 기계심장 등급 선택값
export type HeartGrade = 2 | 3 | 5;

// 옵션 값 표현 단위 (정수/퍼센트)
export type OptionValueUnit = "flat" | "percent";

// 단일 옵션의 메타 정보
export type OptionDefinition = {
  key: string;
  label: string;
  unit: OptionValueUnit;
  step: number;
};

// 옵션 값 범위
export type ValueRange = {
  min: number;
  max: number;
};

// 특정 장비/불꽃 조합의 옵션 풀 데이터
export type OptionPool = {
  options: OptionDefinition[];
  ranges: Record<string, ValueRange>;
};

// 실제 시뮬레이션에서 뽑힌 옵션 결과 1개
export type RolledOption = {
  key: string;
  label: string;
  value: number;
  unit: OptionValueUnit;
  step: number;
};

// 1회 시뮬레이션 결과 스냅샷
export type SimulationResult = {
  flameType: FlameType;
  equipmentCategory: EquipmentCategory;
  lineCount: 1 | 2;
  options: RolledOption[];
};
