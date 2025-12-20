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

import { POTENTIAL_TIER_LABELS } from "../model/domain/constants";
import type { PotentialMode } from "../model/domain/types";
import type { CubeRollResult, CubeType } from "../model/domain/types";
import type { PotentialTier } from "../model/domain/potential-types";

import { ResultLine } from "./CubeResultLine";

type Option = {
  value: string;
  label: string;
};

type Props = {
  potentialMode: PotentialMode | null;
  cubeType: CubeType | null;
  tier: PotentialTier | null;
  equipmentType: string | null;
  equipmentLevel: number | null;
  availableLevels: Array<{ level: number; label: string }>;
  potentialModeOptions: Option[];
  cubeTypeOptions: Option[];
  equipmentTypeOptions: Array<{ type: string; label: string }>;
  tierOptions: Option[];
  latestRoll: CubeRollResult | null;
  isDataLoading: boolean;
  canRoll: boolean;
  onPotentialModeChange: (value: PotentialMode) => void;
  onCubeTypeChange: (value: CubeType) => void;
  onTierChange: (value: PotentialTier) => void;
  onEquipmentTypeChange: (value: string) => void;
  onEquipmentLevelChange: (value: number) => void;
  onRoll: () => void;
  onReset: () => void;
};

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

export function CubeSettingsCard({
  potentialMode,
  cubeType,
  tier,
  equipmentType,
  equipmentLevel,
  availableLevels,
  potentialModeOptions,
  cubeTypeOptions,
  equipmentTypeOptions,
  tierOptions,
  latestRoll,
  isDataLoading,
  canRoll,
  onPotentialModeChange,
  onCubeTypeChange,
  onTierChange,
  onEquipmentTypeChange,
  onEquipmentLevelChange,
  onRoll,
  onReset,
}: Props) {
  const currentTierLabel = tier ? POTENTIAL_TIER_LABELS[tier] : "-";

  return (
    <Card className="gap-4 rounded-xs border-none py-4">
      <CardHeader className="flex flex-row items-center justify-between px-4">
        <CardTitle className="text-lg">큐브 설정</CardTitle>
        <div className="flex flex-wrap gap-2">
          <Button type="button" size="sm" onClick={onRoll} disabled={!canRoll}>
            실행
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={onReset}>
            초기화
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4 px-4">
        <div className="grid grid-cols-2 gap-4">
          <SelectField
            id="potential-mode"
            label="잠재 종류"
            value={potentialMode ?? ""}
            placeholder="잠재 종류 선택"
            onValueChange={(value) =>
              onPotentialModeChange(value as PotentialMode)
            }
          >
            {potentialModeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectField>

          <SelectField
            id="cube-type"
            label="큐브 종류"
            value={cubeType ?? ""}
            placeholder="큐브 종류 선택"
            disabled={!potentialMode}
            onValueChange={(value) => onCubeTypeChange(value as CubeType)}
          >
            {cubeTypeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectField>

          <SelectField
            id="equipment-type"
            label="장비 종류"
            value={equipmentType ?? ""}
            placeholder="장비 종류 선택"
            disabled={!potentialMode}
            onValueChange={(value) => {
              onEquipmentTypeChange(value);
            }}
          >
            {equipmentTypeOptions.map((option) => (
              <SelectItem key={option.type} value={option.type}>
                {option.label}
              </SelectItem>
            ))}
          </SelectField>

          <SelectField
            id="equipment-level"
            label="장비 레벨"
            value={equipmentLevel != null ? String(equipmentLevel) : ""}
            placeholder="장비 레벨 선택"
            disabled={!equipmentType || isDataLoading}
            onValueChange={(value) => onEquipmentLevelChange(Number(value))}
          >
            {availableLevels.map((option) => (
              <SelectItem key={option.level} value={String(option.level)}>
                {option.label}
              </SelectItem>
            ))}
          </SelectField>

          <SelectField
            id="tier"
            label="등급 설정"
            value={tier ?? ""}
            placeholder="등급 선택"
            onValueChange={(value) => {
              onTierChange(value as PotentialTier);
            }}
          >
            {tierOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectField>

          <div className="flex h-4 items-center justify-end gap-2 self-end text-sm">
            <Label className="text-muted-foreground">현재 등급</Label>

            <p>{currentTierLabel}</p>
          </div>
        </div>

        <div className="bg-secondary flex flex-1 p-4 shadow-sm">
          {isDataLoading ? (
            <div className="flex flex-1 items-center justify-center">
              <p className="text-muted-foreground text-center text-sm">
                장비 데이터를 불러오는 중입니다.
              </p>
            </div>
          ) : latestRoll ? (
            <div className="grid flex-1 gap-4">
              {latestRoll.lines.map((line) => (
                <ResultLine key={line.slot} line={line} />
              ))}
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <p className="text-muted-foreground text-center text-sm">
                최근 큐브 사용 결과가 없습니다.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
