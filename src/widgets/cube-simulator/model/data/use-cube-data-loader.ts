import { useEffect, useMemo, useState } from "react";

import {
  getAvailableEquipmentLevels,
  getEquipmentPotentialData,
} from "./potential-data";
import type { PotentialMode } from "../domain/types";
import type {
  EquipmentLevelOption,
  EquipmentPotentialData,
} from "../domain/potential-types";

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
  // 레벨 목록 조회 요청의 식별 키 (모드+장비 타입)
  // 이 키가 바뀌면 레벨 목록을 다시 불러옴
  const levelsRequestKey = useMemo(() => {
    if (!potentialMode || !equipmentType) return null;
    return `${potentialMode}:${equipmentType}`;
  }, [potentialMode, equipmentType]);

  // 잠재 데이터 조회 요청의 식별 키 (모드+장비 타입+레벨)
  // 이 키가 바뀌면 실제 잠재 데이터를 다시 불러옴
  const potentialDataRequestKey = useMemo(() => {
    if (!potentialMode || !equipmentType || equipmentLevel == null) return null;
    return `${potentialMode}:${equipmentType}:${equipmentLevel}`;
  }, [potentialMode, equipmentLevel, equipmentType]);

  // 현재 요청 키에 대응되는 잠재 데이터
  const [potentialData, setPotentialData] =
    useState<EquipmentPotentialData | null>(null);
  // 현재 요청 키에 대응되는 장비 레벨 선택 목록
  const [availableLevels, setAvailableLevels] = useState<
    EquipmentLevelOption[]
  >([]);
  // 레벨 목록 요청 키
  const [loadedLevelsKey, setLoadedLevelsKey] = useState<string | null>(null);
  // 잠재 데이터 요청 키
  const [loadedPotentialDataKey, setLoadedPotentialDataKey] = useState<
    string | null
  >(null);

  // 장비 타입/모드가 바뀌면 선택 가능한 레벨 목록을 다시 불러온다.
  useEffect(() => {
    if (!potentialMode || !equipmentType || !levelsRequestKey) return;

    // 이전 요청의 늦은 응답이 현재 상태를 덮지 않도록 취소 플래그 사용
    let isMounted = true;

    void getAvailableEquipmentLevels(potentialMode, equipmentType)
      .then((levels) => {
        if (!isMounted) return;

        setAvailableLevels(levels);
      })
      .catch(() => {
        if (!isMounted) return;
        setAvailableLevels([]);
      })
      .finally(() => {
        if (!isMounted) return;
        setLoadedLevelsKey(levelsRequestKey);
      });

    return () => {
      isMounted = false;
    };
  }, [equipmentType, levelsRequestKey, potentialMode]);

  // 현재 (모드, 장비 타입, 레벨) 조합에 맞는 잠재 데이터를 불러옴
  useEffect(() => {
    if (!potentialMode || !equipmentType || equipmentLevel == null) return;

    // 이전 요청의 늦은 응답이 현재 상태를 덮지 않도록 취소 플래그 사용
    let isMounted = true;

    void getEquipmentPotentialData(potentialMode, equipmentType, equipmentLevel)
      .then((data) => {
        if (!isMounted) return;
        setPotentialData(data);
      })
      .catch(() => {
        if (!isMounted) return;
        setPotentialData(null);
      })
      .finally(() => {
        if (!isMounted) return;
        setLoadedPotentialDataKey(potentialDataRequestKey);
      });

    return () => {
      isMounted = false;
    };
  }, [equipmentLevel, equipmentType, potentialDataRequestKey, potentialMode]);

  // 요청 키가 있고, 아직 해당 키가 완료되지 않았다면 레벨 목록 로딩 중
  const isLevelsLoading =
    levelsRequestKey != null && loadedLevelsKey !== levelsRequestKey;
  // 요청 키가 있고, 아직 해당 키가 완료되지 않았다면 잠재 데이터 로딩 중
  const isPotentialDataLoading =
    potentialDataRequestKey != null &&
    loadedPotentialDataKey !== potentialDataRequestKey;

  // 요청 조건이 불충분하면 빈 목록을 반환해 UI를 일관되게 유지
  const resolvedAvailableLevels =
    levelsRequestKey != null ? availableLevels : [];
  // 요청 조건이 불충분하면 null을 반환해 UI를 일관되게 유지
  const resolvedPotentialData =
    potentialDataRequestKey != null ? potentialData : null;

  return {
    availableLevels: resolvedAvailableLevels,
    potentialData: resolvedPotentialData,
    isDataLoading: isLevelsLoading || isPotentialDataLoading,
  };
}
