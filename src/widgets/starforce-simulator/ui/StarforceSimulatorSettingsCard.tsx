import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { SelectField } from "@/shared/ui/SelectField";
import { SelectItem } from "@/shared/ui/select";

import type {
  LuckyDayRate,
  StarforceEquipmentCategory,
  StarforceModifierOptions,
} from "../model/domain/types";

type Props = {
  equipmentCategory: StarforceEquipmentCategory | null;
  options: StarforceModifierOptions;
  currentStar: number;
  canEnhance: boolean;
  canUseSafetyShield: boolean;
  canUseProtectShield: boolean;
  starSettingOptions: number[];
  luckyDayRateOptions: LuckyDayRate[];
  equipmentCategoryOptions: Array<{
    type: StarforceEquipmentCategory;
    label: string;
  }>;
  onEquipmentCategoryChange: (value: StarforceEquipmentCategory) => void;
  onCurrentStarChange: (value: number) => void;
  onSafetyShieldChange: (checked: boolean) => void;
  onProtectShieldChange: (checked: boolean) => void;
  onLuckyDayRateChange: (value: LuckyDayRate) => void;
  onEnhance: () => void;
  onReset: () => void;
};

// 사용/사용 안함 두 값만 갖는 설정용 Select.
function ToggleSelectField({
  id,
  label,
  checked,
  disabled,
  onCheckedChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  disabled?: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <SelectField
      id={id}
      label={label}
      value={checked ? "enabled" : "disabled"}
      placeholder={`${label} 설정`}
      disabled={disabled}
      onValueChange={(value) => onCheckedChange(value === "enabled")}
    >
      <SelectItem value="enabled">사용</SelectItem>
      <SelectItem value="disabled">사용 안함</SelectItem>
    </SelectField>
  );
}

export function StarforceSimulatorSettingsCard({
  equipmentCategory,
  options,
  currentStar,
  canEnhance,
  canUseSafetyShield,
  canUseProtectShield,
  starSettingOptions,
  luckyDayRateOptions,
  equipmentCategoryOptions,
  onEquipmentCategoryChange,
  onCurrentStarChange,
  onSafetyShieldChange,
  onProtectShieldChange,
  onLuckyDayRateChange,
  onEnhance,
  onReset,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>스타포스 강화 설정</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <SelectField
            id="starforce-equipment-category"
            label="장비 종류"
            value={equipmentCategory ?? ""}
            placeholder="장비 종류 선택"
            onValueChange={(value) =>
              onEquipmentCategoryChange(value as StarforceEquipmentCategory)
            }
          >
            {equipmentCategoryOptions.map((option) => (
              <SelectItem key={option.type} value={option.type}>
                {option.label}
              </SelectItem>
            ))}
          </SelectField>

          <SelectField
            id="starforce-current-star"
            label="스타포스 설정"
            value={String(currentStar)}
            placeholder="스타포스 선택"
            disabled={!equipmentCategory}
            onValueChange={(value) => onCurrentStarChange(Number(value))}
          >
            {starSettingOptions.map((star) => (
              <SelectItem key={star} value={String(star)}>
                {star}성
              </SelectItem>
            ))}
          </SelectField>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <SelectField
            id="starforce-lucky-day-rate"
            label="럭키데이 주문서"
            value={String(options.luckyDayRate)}
            placeholder="럭키데이 수치 선택"
            onValueChange={(value) =>
              onLuckyDayRateChange(Number(value) as LuckyDayRate)
            }
          >
            <SelectItem value="0">사용 안함</SelectItem>
            {luckyDayRateOptions.map((rate) => (
              <SelectItem key={rate} value={String(rate)}>
                {rate}%
              </SelectItem>
            ))}
          </SelectField>
          <ToggleSelectField
            id="starforce-protect-shield"
            label="프로텍트 쉴드 주문서"
            checked={options.protectShield}
            disabled={!canUseProtectShield}
            onCheckedChange={onProtectShieldChange}
          />
          <ToggleSelectField
            id="starforce-safety-shield"
            label="세이프티 쉴드 주문서"
            checked={options.safetyShield}
            disabled={!canUseSafetyShield}
            onCheckedChange={onSafetyShieldChange}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            size="sm"
            className="select-none"
            onClick={onEnhance}
            disabled={!canEnhance}
          >
            강화
          </Button>
          <Button
            type="button"
            size="sm"
            className="select-none"
            variant="outline"
            onClick={onReset}
          >
            초기화
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
