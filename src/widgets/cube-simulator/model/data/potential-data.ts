import type {
  EquipmentLevelOption,
  EquipmentPotentialFamily,
  PotentialDataset,
} from "../domain/potential-types";
import type { PotentialMode } from "../domain/types";

type EquipmentTypeOption = {
  type: string;
  label: string;
};

// 일반 잠재 모드에서 노출할 장비 타입 옵션
const POTENTIAL_EQUIPMENT_TYPE_OPTIONS: EquipmentTypeOption[] = [
  { type: "weapon", label: "무기" },
  { type: "secondaryWeapon", label: "보조무기" },
  { type: "top", label: "상의" },
  { type: "bottom", label: "하의" },
  { type: "overall", label: "한벌옷" },
  { type: "hat", label: "모자" },
  { type: "cape", label: "망토" },
  { type: "shoes", label: "신발" },
  { type: "gloves", label: "장갑" },
  { type: "shoulder", label: "어깨" },
  { type: "belt", label: "벨트" },
  { type: "heart", label: "기계심장" },
  { type: "emblem", label: "엠블렘" },
  { type: "watch", label: "감시자의 눈(반지)" },
];

// 에디셔널은 170레벨 이상부터 가능한데 아직 적합한 기계심장(언더 컨트롤 하트)이
// 없어서 제외한다. 해당 하트가 나오면 목록을 하나로 합치면 됨.
const ADDITIONAL_EQUIPMENT_TYPE_OPTIONS =
  POTENTIAL_EQUIPMENT_TYPE_OPTIONS.filter((option) => option.type !== "heart");

// 잠재능력별 장비 타입 옵션 묶음
const TYPE_OPTIONS_BY_MODE: Record<PotentialMode, EquipmentTypeOption[]> = {
  potential: POTENTIAL_EQUIPMENT_TYPE_OPTIONS,
  additional: ADDITIONAL_EQUIPMENT_TYPE_OPTIONS,
};

// 동일 dataset 중복 로딩 방지 캐시
const datasetPromiseCache = new Map<string, Promise<PotentialDataset>>();

// 모드 + 장비 타입 조합을 캐시 키로 변환
const createDatasetCacheKey = (mode: PotentialMode, equipmentType: string) =>
  `${mode}:${equipmentType}`;

const isKnownEquipmentType = (mode: PotentialMode, equipmentType: string) =>
  TYPE_OPTIONS_BY_MODE[mode].some((option) => option.type === equipmentType);

// 캐시 우선으로 dataset을 로드한다. (없으면 dynamic import 실행)
async function loadDataset(
  mode: PotentialMode,
  equipmentType: string,
): Promise<PotentialDataset | null> {
  if (!isKnownEquipmentType(mode, equipmentType)) return null;

  const cacheKey = createDatasetCacheKey(mode, equipmentType);
  const cachedPromise = datasetPromiseCache.get(cacheKey);
  if (cachedPromise) return cachedPromise;

  // 장비별 JSON을 필요 시점에 개별 청크로 불러온다.
  // 실패한 요청이 캐시에 남으면 새로고침 전까지 재시도가 막히므로 캐시에서 제거
  const promise = import(`./generated/${mode}/${equipmentType}.json`)
    .then((module) => module.default as PotentialDataset)
    .catch((error: unknown) => {
      datasetPromiseCache.delete(cacheKey);
      throw error;
    });

  datasetPromiseCache.set(cacheKey, promise);
  return promise;
}

// 잠재 종류(윗잠, 아랫잠)에 따른 장비 타입 옵션 목록 반환
export function getEquipmentTypeOptions(mode: PotentialMode) {
  return TYPE_OPTIONS_BY_MODE[mode];
}

// 장비 타입 하나의 전체 레벨별 잠재 데이터 반환
// 레벨 목록과 개별 레벨 데이터가 모두 이 하나에서 파생된다.
export async function loadEquipmentPotentials(
  mode: PotentialMode,
  equipmentType: string,
): Promise<EquipmentPotentialFamily | null> {
  const dataset = await loadDataset(mode, equipmentType);
  return dataset?.equipmentPotentials[equipmentType] ?? null;
}

// Select용 레벨 옵션 목록 (내림차순)
export function toLevelOptions(
  family: EquipmentPotentialFamily | null,
): EquipmentLevelOption[] {
  if (!family) return [];

  return Object.values(family.levels)
    .map((entry) => ({ level: entry.level, label: `${entry.level}` }))
    .sort((left, right) => right.level - left.level);
}
