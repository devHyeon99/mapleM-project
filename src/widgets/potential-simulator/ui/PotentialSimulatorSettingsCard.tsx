import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { SelectField } from "@/shared/ui/SelectField";
import { SelectItem } from "@/shared/ui/select";

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
    <Card>
      <CardHeader>
        <CardTitle>환생의 불꽃 설정</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
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
              value={selectedLevel ? String(selectedLevel) : ""}
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
        <div className="flex justify-end gap-2">
          <Button type="button" size="sm" onClick={onRoll} disabled={!canRoll}>
            실행
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={onReset}>
            초기화
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
