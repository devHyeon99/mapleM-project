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

import {
  EQUIPMENT_CATEGORY_OPTIONS,
  FLAME_TYPE_OPTIONS,
  HEART_GRADE_OPTIONS,
} from "../model/domain/data";
import type {
  EquipmentCategory,
  EquipmentLevel,
  FlameType,
  HeartGrade,
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
  flameType: FlameType | null;
  equipmentCategory: EquipmentCategory | null;
  heartGrade: HeartGrade | null;
  selectedLevel: EquipmentLevel | null;
  availableLevels: EquipmentLevel[];
  isHeartCategory: boolean;
  isFixedLevelCategory: boolean;
  canRoll: boolean;
  onFlameTypeChange: (value: FlameType) => void;
  onEquipmentCategoryChange: (value: EquipmentCategory) => void;
  onHeartGradeChange: (value: HeartGrade) => void;
  onEquipmentLevelChange: (value: EquipmentLevel) => void;
  onRoll: () => void;
  onReset: () => void;
};

export function PotentialSimulatorSettingsCard({
  flameType,
  equipmentCategory,
  heartGrade,
  selectedLevel,
  availableLevels,
  isHeartCategory,
  isFixedLevelCategory,
  canRoll,
  onFlameTypeChange,
  onEquipmentCategoryChange,
  onHeartGradeChange,
  onEquipmentLevelChange,
  onRoll,
  onReset,
}: Props) {
  return (
    <Card className="gap-4 rounded-xs border-none py-4">
      <CardHeader className="flex flex-row items-center justify-between px-4">
        <CardTitle className="text-lg">환생의 불꽃 설정</CardTitle>
        <div className="flex gap-2">
          <Button type="button" size="sm" onClick={onRoll} disabled={!canRoll}>
            실행
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={onReset}>
            초기화
          </Button>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 px-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <SelectField
            id="flame-type"
            label="환생의 불꽃 종류"
            value={flameType ?? ""}
            placeholder="환생의 불꽃 선택"
            onValueChange={(value) => onFlameTypeChange(value as FlameType)}
          >
            {FLAME_TYPE_OPTIONS.map((option) => (
              <SelectItem key={option.type} value={option.type}>
                {option.label}
              </SelectItem>
            ))}
          </SelectField>

          <SelectField
            id="equipment-category"
            label="장비 종류"
            value={equipmentCategory ?? ""}
            placeholder="장비 종류 선택"
            onValueChange={(value) =>
              onEquipmentCategoryChange(value as EquipmentCategory)
            }
          >
            {EQUIPMENT_CATEGORY_OPTIONS.map((option) => (
              <SelectItem key={option.type} value={option.type}>
                {option.label}
              </SelectItem>
            ))}
          </SelectField>

          {isHeartCategory ? (
            <SelectField
              id="heart-grade"
              label="기계심장 등급"
              value={heartGrade ? String(heartGrade) : ""}
              placeholder="등급 선택"
              onValueChange={(value) =>
                onHeartGradeChange(Number(value) as HeartGrade)
              }
            >
              {HEART_GRADE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={String(option.value)}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectField>
          ) : (
            <SelectField
              id="equipment-level"
              label={
                isFixedLevelCategory ? "장비 레벨 (200 고정)" : "장비 레벨"
              }
              value={
                isFixedLevelCategory
                  ? "200"
                  : selectedLevel
                    ? String(selectedLevel)
                    : ""
              }
              placeholder="장비 레벨 선택"
              disabled={isFixedLevelCategory || !equipmentCategory}
              onValueChange={(value) =>
                onEquipmentLevelChange(Number(value) as EquipmentLevel)
              }
            >
              {availableLevels.map((level) => (
                <SelectItem key={level} value={String(level)}>
                  {level}
                </SelectItem>
              ))}
            </SelectField>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
