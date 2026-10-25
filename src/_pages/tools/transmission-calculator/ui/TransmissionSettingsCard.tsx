import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { SelectField } from "@/shared/ui/SelectField";
import { SelectItem } from "@/shared/ui/select";

import {
  getBaseMaxStarforce,
  getTargetTiers,
  supportsAdditionalPotential,
} from "../model/domain/calculate";

import {
  ADDITIONAL_OPTIONS,
  SOURCE_TIERS,
  TIER_LABEL,
  getPotentialOptions,
} from "../model/domain/data";
import type {
  AdditionalOptionId,
  EquipmentTier,
  PotentialOptionId,
  TransmissionState,
} from "../model/domain/types";

type Props = {
  state: TransmissionState;
  starforceOptions: number[];
  onSourceTierChange: (value: EquipmentTier) => void;
  onTargetTierChange: (value: EquipmentTier) => void;
  onStarforceChange: (value: number) => void;
  onPotentialChange: (value: PotentialOptionId) => void;
  onAdditionalPotentialChange: (value: PotentialOptionId) => void;
  onAdditionalOptionChange: (value: AdditionalOptionId) => void;
  onSoulChange: (value: boolean) => void;
  onReset: () => void;
};

export function TransmissionSettingsCard({
  state,
  starforceOptions,
  onSourceTierChange,
  onTargetTierChange,
  onStarforceChange,
  onPotentialChange,
  onAdditionalPotentialChange,
  onAdditionalOptionChange,
  onSoulChange,
  onReset,
}: Props) {
  const potentialOptions = getPotentialOptions(state.targetTier);
  const additionalPotentialEnabled = supportsAdditionalPotential(
    state.sourceTier,
    state.targetTier,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>전수 설정</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <SelectField
            id="transmission-source-tier"
            label="추출 장비 (소멸)"
            value={state.sourceTier}
            placeholder="추출 장비 선택"
            onValueChange={(value) =>
              onSourceTierChange(value as EquipmentTier)
            }
          >
            {SOURCE_TIERS.map((tier) => (
              <SelectItem key={tier} value={tier}>
                {TIER_LABEL[tier]}
              </SelectItem>
            ))}
          </SelectField>

          <SelectField
            id="transmission-target-tier"
            label="전수 장비 (대상)"
            value={state.targetTier}
            placeholder="전수 장비 선택"
            onValueChange={(value) =>
              onTargetTierChange(value as EquipmentTier)
            }
          >
            {getTargetTiers(state.sourceTier).map((tier) => (
              <SelectItem key={tier} value={tier}>
                {TIER_LABEL[tier]}
              </SelectItem>
            ))}
          </SelectField>
        </div>

        <SelectField
          id="transmission-starforce"
          label="스타포스"
          value={String(state.starforce)}
          placeholder="스타포스 선택"
          disabled={starforceOptions.length === 0}
          onValueChange={(value) => onStarforceChange(Number(value))}
        >
          <SelectItem value="0">전수 안 함</SelectItem>
          {starforceOptions.map((star) => (
            <SelectItem key={star} value={String(star)}>
              {star}성
              {star > getBaseMaxStarforce(state.sourceTier, state.targetTier) &&
                " (확장권)"}
            </SelectItem>
          ))}
        </SelectField>

        <div className="grid grid-cols-2 gap-4">
          <SelectField
            id="transmission-potential"
            label="잠재능력"
            value={state.potential}
            placeholder="잠재능력 선택"
            onValueChange={(value) =>
              onPotentialChange(value as PotentialOptionId)
            }
          >
            {potentialOptions.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.label}
              </SelectItem>
            ))}
          </SelectField>

          <SelectField
            id="transmission-additional-potential"
            label="에디셔널 잠재능력"
            value={state.additionalPotential}
            placeholder={
              additionalPotentialEnabled ? "에디셔널 선택" : "부여 불가"
            }
            disabled={!additionalPotentialEnabled}
            onValueChange={(value) =>
              onAdditionalPotentialChange(value as PotentialOptionId)
            }
          >
            {potentialOptions.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.label}
              </SelectItem>
            ))}
          </SelectField>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <SelectField
            id="transmission-additional-option"
            label="추가옵션"
            value={state.additionalOption}
            placeholder="추가옵션 선택"
            onValueChange={(value) =>
              onAdditionalOptionChange(value as AdditionalOptionId)
            }
          >
            {ADDITIONAL_OPTIONS.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.label}
              </SelectItem>
            ))}
          </SelectField>

          <SelectField
            id="transmission-soul"
            label="소울"
            value={state.soul ? "enabled" : "none"}
            placeholder="소울 선택"
            onValueChange={(value) => onSoulChange(value === "enabled")}
          >
            <SelectItem value="none">전수 안 함</SelectItem>
            <SelectItem value="enabled">위대한 소울</SelectItem>
          </SelectField>
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onReset}>
            초기화
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
