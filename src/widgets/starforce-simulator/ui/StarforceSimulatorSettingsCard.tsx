import type { ReactNode } from "react";

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Label } from "@/shared/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

import type {
  LuckyDayRate,
  StarforceEquipmentCategory,
  StarforceModifierOptions,
} from "../model/domain/types";

function SelectField({
  id,
  label,
  value,
  placeholder,
  disabled = false,
  onValueChange,
  children,
}: {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  disabled?: boolean;
  onValueChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id} className="text-muted-foreground">
        {label}
      </Label>
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger id={id} className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    </div>
  );
}

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
  onStarCatchChange: (checked: boolean) => void;
  onSafetyShieldChange: (checked: boolean) => void;
  onProtectShieldChange: (checked: boolean) => void;
  onLuckyDayRateChange: (value: LuckyDayRate) => void;
  onEnhance: () => void;
  onReset: () => void;
};

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
  onStarCatchChange,
  onSafetyShieldChange,
  onProtectShieldChange,
  onLuckyDayRateChange,
  onEnhance,
  onReset,
}: Props) {
  return (
    <Card className="gap-4 rounded-xs border-none py-4">
      <CardHeader className="px-4">
        <CardTitle className="text-lg">스타포스 강화 설정</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-4">
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
            id="starforce-star-catch"
            label="스타캐치 활성화"
            value={options.starCatchSuccess ? "enabled" : "disabled"}
            placeholder="스타캐치 설정"
            onValueChange={(value) => onStarCatchChange(value === "enabled")}
          >
            <SelectItem value="enabled">사용</SelectItem>
            <SelectItem value="disabled">사용 안함</SelectItem>
          </SelectField>
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
          <SelectField
            id="starforce-protect-shield"
            label="프로텍트 쉴드 주문서"
            value={options.protectShield ? "enabled" : "disabled"}
            placeholder="프로텍트 쉴드 설정"
            disabled={!canUseProtectShield}
            onValueChange={(value) =>
              onProtectShieldChange(value === "enabled")
            }
          >
            <SelectItem value="enabled">사용</SelectItem>
            <SelectItem value="disabled">사용 안함</SelectItem>
          </SelectField>
          <SelectField
            id="starforce-safety-shield"
            label="세이프티 쉴드 주문서"
            value={options.safetyShield ? "enabled" : "disabled"}
            placeholder="세이프티 쉴드 설정"
            disabled={!canUseSafetyShield}
            onValueChange={(value) => onSafetyShieldChange(value === "enabled")}
          >
            <SelectItem value="enabled">사용</SelectItem>
            <SelectItem value="disabled">사용 안함</SelectItem>
          </SelectField>
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
