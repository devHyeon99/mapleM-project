import type {
  EquipmentLevelOption,
  EquipmentPotentialData,
  PotentialDataset,
} from "../domain/potential-types";
import type { PotentialMode } from "../domain/types";

type EquipmentTypeOption = {
  type: string;
  label: string;
};

// 장비별 JSON 파일을 필요 시점에 동적 로드하기 위한 로더 타입
type DatasetLoader = () => Promise<PotentialDataset>;

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

// 에디셔널 잠재 모드에서 노출할 장비 타입 옵션
const ADDITIONAL_EQUIPMENT_TYPE_OPTIONS: EquipmentTypeOption[] = [
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
  { type: "emblem", label: "엠블렘" },
  { type: "watch", label: "감시자의 눈(반지)" },
];

// 일반 잠재 JSON 로더 맵 (장비 타입 -> dynamic import 함수)
const POTENTIAL_DATASET_LOADERS: Record<string, DatasetLoader> = {
  weapon: () =>
    import("./generated/potential/weapon.json").then(
      (mod) => mod.default as PotentialDataset,
    ),
  secondaryWeapon: () =>
    import("./generated/potential/secondaryWeapon.json").then(
      (mod) => mod.default as PotentialDataset,
    ),
  top: () =>
    import("./generated/potential/top.json").then(
      (mod) => mod.default as PotentialDataset,
    ),
  bottom: () =>
    import("./generated/potential/bottom.json").then(
      (mod) => mod.default as PotentialDataset,
    ),
  overall: () =>
    import("./generated/potential/overall.json").then(
      (mod) => mod.default as PotentialDataset,
    ),
  hat: () =>
    import("./generated/potential/hat.json").then(
      (mod) => mod.default as PotentialDataset,
    ),
  cape: () =>
    import("./generated/potential/cape.json").then(
      (mod) => mod.default as PotentialDataset,
    ),
  shoes: () =>
    import("./generated/potential/shoes.json").then(
      (mod) => mod.default as PotentialDataset,
    ),
  gloves: () =>
    import("./generated/potential/gloves.json").then(
      (mod) => mod.default as PotentialDataset,
    ),
  shoulder: () =>
    import("./generated/potential/shoulder.json").then(
      (mod) => mod.default as PotentialDataset,
    ),
  belt: () =>
    import("./generated/potential/belt.json").then(
      (mod) => mod.default as PotentialDataset,
    ),
  heart: () =>
    import("./generated/potential/heart.json").then(
      (mod) => mod.default as PotentialDataset,
    ),
  emblem: () =>
    import("./generated/potential/emblem.json").then(
      (mod) => mod.default as PotentialDataset,
    ),
  watch: () =>
    import("./generated/potential/watch.json").then(
      (mod) => mod.default as PotentialDataset,
    ),
};

// 에디셔널 잠재 JSON 로더 맵 (장비 타입 -> dynamic import 함수)
const ADDITIONAL_DATASET_LOADERS: Record<string, DatasetLoader> = {
  weapon: () =>
    import("./generated/additional/weapon.json").then(
      (mod) => mod.default as PotentialDataset,
    ),
  secondaryWeapon: () =>
    import("./generated/additional/secondaryWeapon.json").then(
      (mod) => mod.default as PotentialDataset,
    ),
  top: () =>
    import("./generated/additional/top.json").then(
      (mod) => mod.default as PotentialDataset,
    ),
  bottom: () =>
    import("./generated/additional/bottom.json").then(
      (mod) => mod.default as PotentialDataset,
    ),
  overall: () =>
    import("./generated/additional/overall.json").then(
      (mod) => mod.default as PotentialDataset,
    ),
  hat: () =>
    import("./generated/additional/hat.json").then(
      (mod) => mod.default as PotentialDataset,
    ),
  cape: () =>
    import("./generated/additional/cape.json").then(
      (mod) => mod.default as PotentialDataset,
    ),
  shoes: () =>
    import("./generated/additional/shoes.json").then(
      (mod) => mod.default as PotentialDataset,
    ),
  gloves: () =>
    import("./generated/additional/gloves.json").then(
      (mod) => mod.default as PotentialDataset,
    ),
  shoulder: () =>
    import("./generated/additional/shoulder.json").then(
      (mod) => mod.default as PotentialDataset,
    ),
  belt: () =>
    import("./generated/additional/belt.json").then(
      (mod) => mod.default as PotentialDataset,
    ),
  emblem: () =>
    import("./generated/additional/emblem.json").then(
      (mod) => mod.default as PotentialDataset,
    ),
  watch: () =>
    import("./generated/additional/watch.json").then(
      (mod) => mod.default as PotentialDataset,
    ),
};

// 모드별 로더 묶음
const DATASET_LOADERS_BY_MODE: Record<
  PotentialMode,
  Record<string, DatasetLoader>
> = {
  potential: POTENTIAL_DATASET_LOADERS,
  additional: ADDITIONAL_DATASET_LOADERS,
};

// 잠재능력별 장비 타입 옵션 묶음
const TYPE_OPTIONS_BY_MODE: Record<PotentialMode, EquipmentTypeOption[]> = {
  potential: POTENTIAL_EQUIPMENT_TYPE_OPTIONS,
  additional: ADDITIONAL_EQUIPMENT_TYPE_OPTIONS,
};

// 동일 dataset 중복 로딩 방지 캐시
const datasetPromiseCache = new Map<string, Promise<PotentialDataset>>();
// 장비 레벨 옵션 계산 결과 캐시
const levelOptionsCache = new Map<string, EquipmentLevelOption[]>();

// 모드 + 장비 타입 조합을 캐시 키로 변환
const createDatasetCacheKey = (mode: PotentialMode, equipmentType: string) =>
  `${mode}:${equipmentType}`;

// 캐시 우선으로 dataset을 로드한다. (없으면 dynamic import 실행)
async function loadDataset(
  mode: PotentialMode,
  equipmentType: string,
): Promise<PotentialDataset | null> {
  const cacheKey = createDatasetCacheKey(mode, equipmentType);
  const cachedPromise = datasetPromiseCache.get(cacheKey);
  if (cachedPromise) return cachedPromise;

  const loader = DATASET_LOADERS_BY_MODE[mode][equipmentType];
  if (!loader) return null;

  const promise = loader();
  datasetPromiseCache.set(cacheKey, promise);
  return promise;
}

// dataset에서 Select용 레벨 옵션을 생성한다. (내림차순)
function createLevelOptions(dataset: PotentialDataset, equipmentType: string) {
  const family = dataset.equipmentPotentials[equipmentType];
  if (!family) return [];

  return Object.values(family.levels)
    .map((entry) => ({ level: entry.level, label: `${entry.level}` }))
    .sort((left, right) => right.level - left.level);
}

// 잠재 종류(윗잠, 아랫잠)에 따른 장비 타입 옵션 목록 반환
export function getEquipmentTypeOptions(mode: PotentialMode) {
  return TYPE_OPTIONS_BY_MODE[mode];
}

// 특정 장비 타입의 선택 가능한 레벨 목록 반환 (캐시 사용)
export async function getAvailableEquipmentLevels(
  mode: PotentialMode,
  equipmentType: string,
) {
  const cacheKey = createDatasetCacheKey(mode, equipmentType);
  const cachedLevelOptions = levelOptionsCache.get(cacheKey);
  if (cachedLevelOptions) return cachedLevelOptions;

  const dataset = await loadDataset(mode, equipmentType);
  if (!dataset) return [];

  const levelOptions = createLevelOptions(dataset, equipmentType);
  levelOptionsCache.set(cacheKey, levelOptions);
  return levelOptions;
}

// 모드/장비 타입/레벨 조합의 잠재 데이터 반환
export async function getEquipmentPotentialData(
  mode: PotentialMode,
  equipmentType: string,
  level: number,
): Promise<EquipmentPotentialData | null> {
  const dataset = await loadDataset(mode, equipmentType);
  if (!dataset) return null;

  return dataset.equipmentPotentials[equipmentType]?.levels[level] ?? null;
}
