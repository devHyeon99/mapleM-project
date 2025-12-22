"use client";

import { useCallback, useMemo, useState } from "react";

import {
  DEFAULT_STARFORCE_OPTIONS,
  LUCKY_DAY_RATE_OPTIONS,
  STARFORCE_EQUIPMENT_CATEGORY_OPTIONS,
  getBaseRateByTargetStar,
  getMaxStarforceByCategory,
} from "./domain/data";
import { resolveStarforceRate, simulateStarforce } from "./domain/simulator";
import {
  type LuckyDayRate,
  type StarforceEquipmentCategory,
  type StarforceModifierOptions,
  type StarforceSimulationResult,
} from "./domain/types";

type LuckyDayUsageCounts = {
  3: number;
  5: number;
  7: number;
  10: number;
};

const EMPTY_LUCKY_DAY_USAGE_COUNTS: LuckyDayUsageCounts = {
  3: 0,
  5: 0,
  7: 0,
  10: 0,
};

export function useStarforceSimulator() {
  const [equipmentCategory, setEquipmentCategory] =
    useState<StarforceEquipmentCategory | null>(null);
  const [currentStar, setCurrentStar] = useState(0);
  const [isDestroyed, setIsDestroyed] = useState(false);
  const [latestResult, setLatestResult] =
    useState<StarforceSimulationResult | null>(null);
  const [totalAttemptCount, setTotalAttemptCount] = useState(0);
  const [successCount, setSuccessCount] = useState(0);
  const [keepCount, setKeepCount] = useState(0);
  const [decreaseCount, setDecreaseCount] = useState(0);
  const [destroyCount, setDestroyCount] = useState(0);
  const [safetyShieldUsageCount, setSafetyShieldUsageCount] = useState(0);
  const [protectShieldUsageCount, setProtectShieldUsageCount] = useState(0);
  const [luckyDayUsageCounts, setLuckyDayUsageCounts] =
    useState<LuckyDayUsageCounts>(EMPTY_LUCKY_DAY_USAGE_COUNTS);
  const [options, setOptions] = useState<StarforceModifierOptions>(
    DEFAULT_STARFORCE_OPTIONS,
  );

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

  const currentAttemptBaseRate = useMemo(() => {
    if (!equipmentCategory || maxStarforce == null || currentStar >= maxStarforce) {
      return null;
    }
    const targetStar = Math.min(currentStar + 1, maxStarforce);
    return getBaseRateByTargetStar(targetStar);
  }, [currentStar, equipmentCategory, maxStarforce]);

  const canUseSafetyShield = (currentAttemptBaseRate?.decrease ?? 0) > 0;
  const canUseProtectShield = (currentAttemptBaseRate?.destroy ?? 0) > 0;
  const resolvedOptions = useMemo(
    () => ({
      ...options,
      safetyShield: canUseSafetyShield ? options.safetyShield : false,
      protectShield: canUseProtectShield ? options.protectShield : false,
    }),
    [canUseProtectShield, canUseSafetyShield, options],
  );

  const getShieldAvailability = useCallback(
    (category: StarforceEquipmentCategory | null, star: number) => {
      if (!category) {
        return {
          canSafety: false,
          canProtect: false,
        };
      }
      const max = getMaxStarforceByCategory(category);
      if (star >= max) {
        return {
          canSafety: false,
          canProtect: false,
        };
      }
      const targetStar = Math.min(star + 1, max);
      const baseRate = getBaseRateByTargetStar(targetStar);
      return {
        canSafety: baseRate.decrease > 0,
        canProtect: baseRate.destroy > 0,
      };
    },
    [],
  );

  const expectedRate = useMemo(() => {
    if (!equipmentCategory || maxStarforce == null || currentStar >= maxStarforce)
      return null;
    return resolveStarforceRate({
      currentStar,
      equipmentCategory,
      options: resolvedOptions,
    });
  }, [currentStar, equipmentCategory, maxStarforce, resolvedOptions]);

  const resetAttemptState = useCallback(() => {
    setLatestResult(null);
    setTotalAttemptCount(0);
    setSuccessCount(0);
    setKeepCount(0);
    setDecreaseCount(0);
    setDestroyCount(0);
    setSafetyShieldUsageCount(0);
    setProtectShieldUsageCount(0);
    setLuckyDayUsageCounts(EMPTY_LUCKY_DAY_USAGE_COUNTS);
    setIsDestroyed(false);
  }, []);

  const resetResultState = useCallback(() => {
    resetAttemptState();
    setCurrentStar(0);
  }, [resetAttemptState]);

  const handleEquipmentCategoryChange = useCallback(
    (value: StarforceEquipmentCategory) => {
      setEquipmentCategory(value);
      const availability = getShieldAvailability(value, 0);
      setOptions((prev) => ({
        ...prev,
        safetyShield: availability.canSafety ? prev.safetyShield : false,
        protectShield: availability.canProtect ? prev.protectShield : false,
      }));
      resetResultState();
    },
    [getShieldAvailability, resetResultState],
  );

  const handleCurrentStarChange = useCallback(
    (value: number) => {
      setCurrentStar(value);
      const availability = getShieldAvailability(equipmentCategory, value);
      setOptions((prev) => ({
        ...prev,
        safetyShield: availability.canSafety ? prev.safetyShield : false,
        protectShield: availability.canProtect ? prev.protectShield : false,
      }));
      resetAttemptState();
    },
    [equipmentCategory, getShieldAvailability, resetAttemptState],
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

    if (result.outcome === "success") {
      setSuccessCount((count) => count + 1);
    }

    if (result.outcome === "keep") {
      setKeepCount((count) => count + 1);
    }

    if (result.outcome === "decrease") {
      setDecreaseCount((count) => count + 1);
    }

    if (resolvedOptions.safetyShield) {
      setSafetyShieldUsageCount((count) => count + 1);
    }

    if (resolvedOptions.protectShield) {
      setProtectShieldUsageCount((count) => count + 1);
    }

    if (resolvedOptions.luckyDayRate > 0) {
      setLuckyDayUsageCounts((prev) => ({
        ...prev,
        [resolvedOptions.luckyDayRate]:
          prev[resolvedOptions.luckyDayRate as 3 | 5 | 7 | 10] + 1,
      }));
    }

    if (result.isDestroyed) {
      setDestroyCount((count) => count + 1);
      setIsDestroyed(true);
    }
  }, [canEnhance, currentStar, equipmentCategory, resolvedOptions]);

  const handleStarCatchChange = useCallback((checked: boolean) => {
    setOptions((prev) => ({
      ...prev,
      starCatchSuccess: checked,
    }));
  }, []);

  const handleSafetyShieldChange = useCallback((checked: boolean) => {
    if (checked && !canUseSafetyShield) return;
    setOptions((prev) => ({
      ...prev,
      safetyShield: checked,
    }));
  }, [canUseSafetyShield]);

  const handleProtectShieldChange = useCallback((checked: boolean) => {
    if (checked && !canUseProtectShield) return;
    setOptions((prev) => ({
      ...prev,
      protectShield: checked,
    }));
  }, [canUseProtectShield]);

  const handleLuckyDayRateChange = useCallback((value: LuckyDayRate) => {
    setOptions((prev) => ({
      ...prev,
      luckyDayRate: value,
    }));
  }, []);

  const handleReset = useCallback(() => {
    setEquipmentCategory(null);
    setCurrentStar(0);
    setIsDestroyed(false);
    setLatestResult(null);
    setTotalAttemptCount(0);
    setSuccessCount(0);
    setKeepCount(0);
    setDecreaseCount(0);
    setDestroyCount(0);
    setSafetyShieldUsageCount(0);
    setProtectShieldUsageCount(0);
    setLuckyDayUsageCounts(EMPTY_LUCKY_DAY_USAGE_COUNTS);
    setOptions(DEFAULT_STARFORCE_OPTIONS);
  }, []);

  return {
    state: {
      equipmentCategory,
      currentStar,
      isDestroyed,
      latestResult,
      totalAttemptCount,
      successCount,
      keepCount,
      decreaseCount,
      destroyCount,
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
      onStarCatchChange: handleStarCatchChange,
      onSafetyShieldChange: handleSafetyShieldChange,
      onProtectShieldChange: handleProtectShieldChange,
      onLuckyDayRateChange: handleLuckyDayRateChange,
      onEnhance: handleEnhance,
      onReset: handleReset,
      onOptionsChange: setOptions,
    },
  };
}
