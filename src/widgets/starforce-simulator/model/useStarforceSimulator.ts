"use client";

import { useCallback, useMemo, useState } from "react";

import {
  DEFAULT_STARFORCE_OPTIONS,
  LUCKY_DAY_RATE_OPTIONS,
  STARFORCE_EQUIPMENT_CATEGORY_OPTIONS,
  getBaseRateByTargetStar,
  getMaxStarforceByCategory,
} from "./domain/data";
import {
  getTargetStar,
  resolveStarforceRate,
  simulateStarforce,
} from "./domain/simulator";
import {
  type LuckyDayRate,
  type LuckyDayUsageCounts,
  type StarforceEquipmentCategory,
  type StarforceModifierOptions,
  type StarforceOutcomeCounts,
  type StarforceSimulationResult,
} from "./domain/types";

const EMPTY_OUTCOME_COUNTS: StarforceOutcomeCounts = {
  success: 0,
  keep: 0,
  decrease: 0,
  destroy: 0,
};

const EMPTY_LUCKY_DAY_USAGE_COUNTS: LuckyDayUsageCounts = {
  0: 0,
  3: 0,
  5: 0,
  7: 0,
  10: 0,
};

export function useStarforceSimulator() {
  const [equipmentCategory, setEquipmentCategory] =
    useState<StarforceEquipmentCategory | null>(null);
  const [currentStar, setCurrentStar] = useState(0);
  const [latestResult, setLatestResult] =
    useState<StarforceSimulationResult | null>(null);
  const [totalAttemptCount, setTotalAttemptCount] = useState(0);
  const [outcomeCounts, setOutcomeCounts] =
    useState<StarforceOutcomeCounts>(EMPTY_OUTCOME_COUNTS);
  const [safetyShieldUsageCount, setSafetyShieldUsageCount] = useState(0);
  const [protectShieldUsageCount, setProtectShieldUsageCount] = useState(0);
  const [luckyDayUsageCounts, setLuckyDayUsageCounts] =
    useState<LuckyDayUsageCounts>(EMPTY_LUCKY_DAY_USAGE_COUNTS);
  const [options, setOptions] = useState<StarforceModifierOptions>(
    DEFAULT_STARFORCE_OPTIONS,
  );

  const isDestroyed = latestResult?.outcome === "destroy";

  const maxStarforce = useMemo(
    () =>
      equipmentCategory ? getMaxStarforceByCategory(equipmentCategory) : null,
    [equipmentCategory],
  );
  const starSettingOptions = useMemo(() => {
    if (maxStarforce == null) return [0];
    return Array.from({ length: maxStarforce + 1 }, (_, index) => index);
  }, [maxStarforce]);

  const canEnhance =
    equipmentCategory != null &&
    maxStarforce != null &&
    currentStar < maxStarforce &&
    !isDestroyed;

  // 강화 가능한 상태에서만 다음 시도의 기본 확률이 존재한다.
  const currentAttemptBaseRate = useMemo(() => {
    if (equipmentCategory == null || maxStarforce == null) return null;
    if (currentStar >= maxStarforce) return null;

    return getBaseRateByTargetStar(
      getTargetStar({ currentStar, equipmentCategory, options }),
    );
  }, [currentStar, equipmentCategory, maxStarforce, options]);

  const canUseSafetyShield = (currentAttemptBaseRate?.decrease ?? 0) > 0;
  const canUseProtectShield = (currentAttemptBaseRate?.destroy ?? 0) > 0;

  // 쉴드는 사용할 수 없는 성수에서 자동으로 무시된다. (선택 자체는 유지)
  const resolvedOptions = useMemo(
    () => ({
      ...options,
      safetyShield: canUseSafetyShield ? options.safetyShield : false,
      protectShield: canUseProtectShield ? options.protectShield : false,
    }),
    [canUseProtectShield, canUseSafetyShield, options],
  );

  const expectedRate = useMemo(() => {
    if (equipmentCategory == null || currentAttemptBaseRate == null)
      return null;

    return resolveStarforceRate({
      currentStar,
      equipmentCategory,
      options: resolvedOptions,
    });
  }, [currentAttemptBaseRate, currentStar, equipmentCategory, resolvedOptions]);

  const resetAttemptState = useCallback(() => {
    setLatestResult(null);
    setTotalAttemptCount(0);
    setOutcomeCounts(EMPTY_OUTCOME_COUNTS);
    setSafetyShieldUsageCount(0);
    setProtectShieldUsageCount(0);
    setLuckyDayUsageCounts(EMPTY_LUCKY_DAY_USAGE_COUNTS);
  }, []);

  const resetResultState = useCallback(() => {
    resetAttemptState();
    setCurrentStar(0);
  }, [resetAttemptState]);

  const handleEquipmentCategoryChange = useCallback(
    (value: StarforceEquipmentCategory) => {
      setEquipmentCategory(value);
      resetResultState();
    },
    [resetResultState],
  );

  const handleCurrentStarChange = useCallback(
    (value: number) => {
      setCurrentStar(value);
      resetAttemptState();
    },
    [resetAttemptState],
  );

  const handleEnhance = useCallback(() => {
    if (!canEnhance || !equipmentCategory) return;

    const result = simulateStarforce({
      currentStar,
      equipmentCategory,
      options: resolvedOptions,
    });

    setLatestResult(result);
    setCurrentStar(result.nextStar);
    setTotalAttemptCount((count) => count + 1);
    setOutcomeCounts((prev) => ({
      ...prev,
      [result.outcome]: prev[result.outcome] + 1,
    }));

    if (resolvedOptions.safetyShield) {
      setSafetyShieldUsageCount((count) => count + 1);
    }

    if (resolvedOptions.protectShield) {
      setProtectShieldUsageCount((count) => count + 1);
    }

    if (resolvedOptions.luckyDayRate > 0) {
      setLuckyDayUsageCounts((prev) => ({
        ...prev,
        [resolvedOptions.luckyDayRate]: prev[resolvedOptions.luckyDayRate] + 1,
      }));
    }
  }, [canEnhance, currentStar, equipmentCategory, resolvedOptions]);

  const handleSafetyShieldChange = useCallback(
    (checked: boolean) => {
      if (checked && !canUseSafetyShield) return;
      setOptions((prev) => ({
        ...prev,
        safetyShield: checked,
      }));
    },
    [canUseSafetyShield],
  );

  const handleProtectShieldChange = useCallback(
    (checked: boolean) => {
      if (checked && !canUseProtectShield) return;
      setOptions((prev) => ({
        ...prev,
        protectShield: checked,
      }));
    },
    [canUseProtectShield],
  );

  const handleLuckyDayRateChange = useCallback((value: LuckyDayRate) => {
    setOptions((prev) => ({
      ...prev,
      luckyDayRate: value,
    }));
  }, []);

  const handleReset = useCallback(() => {
    resetResultState();
    setEquipmentCategory(null);
    setOptions(DEFAULT_STARFORCE_OPTIONS);
  }, [resetResultState]);

  return {
    state: {
      equipmentCategory,
      currentStar,
      isDestroyed,
      latestResult,
      totalAttemptCount,
      outcomeCounts,
      safetyShieldUsageCount,
      protectShieldUsageCount,
      luckyDayUsageCounts,
      options: resolvedOptions,
      expectedRate,
      canEnhance,
      canUseSafetyShield,
      canUseProtectShield,
      equipmentCategoryOptions: STARFORCE_EQUIPMENT_CATEGORY_OPTIONS,
      luckyDayRateOptions: LUCKY_DAY_RATE_OPTIONS,
      starSettingOptions,
      maxStarforce,
    },
    actions: {
      onEquipmentCategoryChange: handleEquipmentCategoryChange,
      onCurrentStarChange: handleCurrentStarChange,
      onSafetyShieldChange: handleSafetyShieldChange,
      onProtectShieldChange: handleProtectShieldChange,
      onLuckyDayRateChange: handleLuckyDayRateChange,
      onEnhance: handleEnhance,
      onReset: handleReset,
    },
  };
}
