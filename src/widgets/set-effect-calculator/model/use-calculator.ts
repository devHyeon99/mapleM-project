"use client";

import {
  useCallback,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

import {
  buildDiffEffects,
  buildResultFromState,
  createBuildRow,
  createInitialBuildState,
  getClampedCount,
  getClampedStarForce,
  type BuildState,
} from ".";

function formatBuildSummary(
  label: string,
  result: ReturnType<typeof buildResultFromState>,
) {
  // 선택 세트 요약을 한 줄 문자열로 구성
  if (result.activeSets.length === 0) return `${label}: 없음`;

  return `${label}: ${result.activeSets
    .map(
      (set) =>
        `${set.displayName} ${set.count}세트 | ${set.totalStarForce} 스타포스`,
    )
    .join(", ")}`;
}

function useBuildActions(setState: Dispatch<SetStateAction<BuildState>>) {
  // 특정 row를 찾아 부분 업데이트
  const updateRow = useCallback(
    (
      rowId: string,
      updater: (row: BuildState[number]) => BuildState[number],
    ) => {
      setState((prev) =>
        prev.map((row) => (row.id === rowId ? updater(row) : row)),
      );
    },
    [setState],
  );

  const onSetChange = useCallback(
    (rowId: string, setId: string) => {
      // 세트 변경 시 count와 starForce 보정
      updateRow(rowId, (row) => ({
        ...row,
        setId,
        count: getClampedCount(setId, row.count),
        starForce: getClampedStarForce(setId, row.starForce),
      }));
    },
    [updateRow],
  );

  const onCountChange = useCallback(
    (rowId: string, countValue: number) => {
      // count만 갱신하고 현재 세트 상한에 맞게 보정
      updateRow(rowId, (row) => ({
        ...row,
        count: getClampedCount(row.setId, countValue),
      }));
    },
    [updateRow],
  );

  const onStarForceChange = useCallback(
    (rowId: string, value: number) => {
      // starForce만 갱신하고 허용 값으로 보정
      updateRow(rowId, (row) => ({
        ...row,
        starForce: getClampedStarForce(row.setId, value),
      }));
    },
    [updateRow],
  );

  const onAddRow = useCallback(() => {
    // 장비 입력 행 추가
    setState((prev) => [...prev, createBuildRow()]);
  }, [setState]);

  const onReset = useCallback(() => {
    // 기본 상태로 초기화
    setState(createInitialBuildState);
  }, [setState]);

  const onRemoveRow = useCallback(
    (rowId: string) => {
      // 최소 한 행은 유지하고 선택 행만 제거
      setState((prev) => {
        if (prev.length <= 1) return prev;
        return prev.filter((row) => row.id !== rowId);
      });
    },
    [setState],
  );

  return {
    onSetChange,
    onCountChange,
    onStarForceChange,
    onAddRow,
    onReset,
    onRemoveRow,
  };
}

export function useCalculator() {
  // 세팅 A/B 상태와 계산 결과 관리
  const [buildA, setBuildA] = useState<BuildState>(createInitialBuildState);
  const [buildB, setBuildB] = useState<BuildState>(createInitialBuildState);
  const buildAHandlers = useBuildActions(setBuildA);
  const buildBHandlers = useBuildActions(setBuildB);

  const resultA = buildResultFromState(buildA);
  const resultB = buildResultFromState(buildB);
  // 두 세팅의 총합 효과 차이 계산
  const diffEffects = buildDiffEffects(
    resultA.totalEffects,
    resultB.totalEffects,
  );
  // 비교 카드용 요약 문구 생성
  const diffDescription = [
    formatBuildSummary("세팅 A", resultA),
    formatBuildSummary("세팅 B", resultB),
  ].join("\n");

  return {
    buildA,
    buildB,
    resultA,
    resultB,
    diffEffects,
    diffDescription,
    buildAHandlers,
    buildBHandlers,
  };
}
