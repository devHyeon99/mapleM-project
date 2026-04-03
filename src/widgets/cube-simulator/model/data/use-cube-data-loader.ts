import { useEffect, useMemo, useState } from "react";

import { loadEquipmentPotentials, toLevelOptions } from "./potential-data";
import type { PotentialMode } from "../domain/types";
import type { EquipmentPotentialFamily } from "../domain/potential-types";

type Params = {
  potentialMode: PotentialMode | null;
  equipmentType: string | null;
  equipmentLevel: number | null;
};

export function useCubeDataLoader({
  potentialMode,
  equipmentType,
  equipmentLevel,
}: Params) {
  // 레벨 목록과 잠재 데이터 모두 (모드 + 장비 타입) 하나의 dataset에서 파생되므로
  // 로딩 단위도 그 조합 하나로 충분하다.
  const requestKey =
    potentialMode && equipmentType ? `${potentialMode}:${equipmentType}` : null;

  const [loaded, setLoaded] = useState<{
    key: string;
    family: EquipmentPotentialFamily | null;
  } | null>(null);

  useEffect(() => {
    if (!potentialMode || !equipmentType || !requestKey) return;

    // 이전 요청의 늦은 응답이 현재 상태를 덮지 않도록 취소 플래그 사용
    let isCurrent = true;
    const settle = (family: EquipmentPotentialFamily | null) => {
      if (isCurrent) setLoaded({ key: requestKey, family });
    };

    void loadEquipmentPotentials(potentialMode, equipmentType)
      .then(settle)
      .catch(() => settle(null));

    return () => {
      isCurrent = false;
    };
  }, [equipmentType, potentialMode, requestKey]);

  // 현재 요청 키에 해당하는 응답만 사용한다. (조건 미충족이거나 로딩 중이면 null)
  const family = loaded?.key === requestKey ? loaded.family : null;

  const availableLevels = useMemo(() => toLevelOptions(family), [family]);

  const potentialData =
    equipmentLevel != null ? (family?.levels[equipmentLevel] ?? null) : null;

  return {
    availableLevels,
    potentialData,
    isDataLoading: requestKey != null && loaded?.key !== requestKey,
  };
}
