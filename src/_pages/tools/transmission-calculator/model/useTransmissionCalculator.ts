"use client";

import { useCallback, useMemo, useState } from "react";

import {
  calculateTransmission,
  canTransmit,
  getClampedStarforce,
  getMaxStarforce,
  sanitizeState,
} from "./domain/calculate";
import {
  SOURCE_TIERS,
  TARGET_TIERS,
  createInitialState,
} from "./domain/data";
import type {
  AdditionalOptionId,
  EquipmentTier,
  PotentialOptionId,
} from "./domain/types";

// 두 등급대가 어긋나면 상대편을 가장 가까운 유효 값으로 끌어옴
const nearestTargetTier = (sourceTier: EquipmentTier) =>
  TARGET_TIERS.find((tier) => canTransmit(sourceTier, tier)) ?? "arcaneShade";

const nearestSourceTier = (targetTier: EquipmentTier) =>
  [...SOURCE_TIERS].reverse().find((tier) => canTransmit(tier, targetTier)) ??
  "pensalir";

export function useTransmissionCalculator() {
  const [state, setState] = useState(createInitialState);

  const onSourceTierChange = useCallback((sourceTier: EquipmentTier) => {
    setState((prev) => {
      const targetTier = canTransmit(sourceTier, prev.targetTier)
        ? prev.targetTier
        : nearestTargetTier(sourceTier);

      return sanitizeState({ ...prev, sourceTier, targetTier });
    });
  }, []);

  const onTargetTierChange = useCallback((targetTier: EquipmentTier) => {
    setState((prev) => {
      const sourceTier = canTransmit(prev.sourceTier, targetTier)
        ? prev.sourceTier
        : nearestSourceTier(targetTier);

      return sanitizeState({ ...prev, sourceTier, targetTier });
    });
  }, []);

  const onStarforceChange = useCallback((starforce: number) => {
    setState((prev) => ({
      ...prev,
      starforce: getClampedStarforce(prev.sourceTier, prev.targetTier, starforce),
    }));
  }, []);

  const onPotentialChange = useCallback((potential: PotentialOptionId) => {
    setState((prev) => ({ ...prev, potential }));
  }, []);

  const onAdditionalPotentialChange = useCallback(
    (additionalPotential: PotentialOptionId) => {
      setState((prev) => ({ ...prev, additionalPotential }));
    },
    [],
  );

  const onAdditionalOptionChange = useCallback(
    (additionalOption: AdditionalOptionId) => {
      setState((prev) => ({ ...prev, additionalOption }));
    },
    [],
  );

  const onSoulChange = useCallback((soul: boolean) => {
    setState((prev) => ({ ...prev, soul }));
  }, []);

  const onReset = useCallback(() => {
    setState(createInitialState());
  }, []);

  const result = useMemo(() => calculateTransmission(state), [state]);

  const starforceOptions = useMemo(
    () =>
      Array.from(
        { length: getMaxStarforce(state.sourceTier, state.targetTier) },
        (_, index) => index + 1,
      ),
    [state.sourceTier, state.targetTier],
  );

  return {
    state,
    result,
    starforceOptions,
    actions: {
      onSourceTierChange,
      onTargetTierChange,
      onStarforceChange,
      onPotentialChange,
      onAdditionalPotentialChange,
      onAdditionalOptionChange,
      onSoulChange,
      onReset,
    },
  };
}
