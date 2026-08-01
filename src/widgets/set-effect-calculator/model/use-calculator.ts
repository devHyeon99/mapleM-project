"use client";

import {
  useCallback,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

import {
  buildComparisonRows,
  buildResultFromState,
  getClampedCount,
  getClampedStarForce,
} from "./calculator";
import {
  createBuildRow,
  createInitialBuildState,
  MAX_BUILD_ROWS,
} from "./constants";
import type { BuildHandlers, BuildState } from "./types";

function useBuildActions(
  setState: Dispatch<SetStateAction<BuildState>>,
): BuildHandlers {
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
    // 상한까지만 장비 입력 행 추가
    setState((prev) =>
      prev.length >= MAX_BUILD_ROWS ? prev : [...prev, createBuildRow()],
    );
  }, [setState]);

  const onRemoveRow = useCallback(
    (rowId: string) => {
      // 마지막 한 줄은 남겨 둬야 다시 입력할 자리가 생김
      setState((prev) =>
        prev.length <= 1 ? prev : prev.filter((row) => row.id !== rowId),
      );
    },
    [setState],
  );

  const onReset = useCallback(() => {
    // 기본 상태로 초기화
    setState(createInitialBuildState());
  }, [setState]);

  return {
    onSetChange,
    onCountChange,
    onStarForceChange,
    onAddRow,
    onRemoveRow,
    onReset,
  };
}

export function useCalculator() {
  // 세팅 A/B 상태와 계산 결과 관리
  const [buildA, setBuildA] = useState<BuildState>(createInitialBuildState);
  const [buildB, setBuildB] = useState<BuildState>(createInitialBuildState);
  const buildAHandlers = useBuildActions(setBuildA);
  const buildBHandlers = useBuildActions(setBuildB);

  // 한쪽만 바꿔도 매 렌더마다 양쪽을 다시 계산하던 것을 세팅별로 끊음
  const resultA = useMemo(() => buildResultFromState(buildA), [buildA]);
  const resultB = useMemo(() => buildResultFromState(buildB), [buildB]);
  // 두 세팅의 총합 효과를 한 줄씩 짝지어 비교표로 만듦
  const comparisonRows = useMemo(
    () => buildComparisonRows(resultA.totalEffects, resultB.totalEffects),
    [resultA, resultB],
  );

  return {
    buildA,
    buildB,
    resultA,
    resultB,
    comparisonRows,
    buildAHandlers,
    buildBHandlers,
  };
}
