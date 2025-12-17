"use client";

import { useMemo, useState, type ReactNode } from "react";

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Label } from "@/shared/ui/label";
import { Separator } from "@/shared/ui/separator";
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
  getSupportedLevelsByCategory,
} from "../model/domain/data";
import {
  formatRolledValue,
  simulateAdditionalOption,
} from "../model/domain/simulator";
import type {
  EquipmentCategory,
  EquipmentLevel,
  FlameType,
  HeartGrade,
  SimulationResult,
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

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function getFlameLabel(flameType: FlameType) {
  return (
    FLAME_TYPE_OPTIONS.find((option) => option.type === flameType)?.label ?? "-"
  );
}

function getEquipmentLabel(category: EquipmentCategory) {
  return (
    EQUIPMENT_CATEGORY_OPTIONS.find((option) => option.type === category)
      ?.label ?? "-"
  );
}

export function PotentialSimulator() {
  const [flameType, setFlameType] = useState<FlameType>("powerful");
  const [equipmentCategory, setEquipmentCategory] =
    useState<EquipmentCategory>("weapon");
  const [equipmentLevel, setEquipmentLevel] = useState<EquipmentLevel>(140);
  const [heartGrade, setHeartGrade] = useState<HeartGrade>(2);
  const [latestResult, setLatestResult] = useState<SimulationResult | null>(
    null,
  );
  const [totalRollCount, setTotalRollCount] = useState(0);
  const [isPowerfulTwoLineLocked, setIsPowerfulTwoLineLocked] = useState(false);

  const availableLevels = useMemo(
    () => getSupportedLevelsByCategory(equipmentCategory),
    [equipmentCategory],
  );

  const isHeartCategory = equipmentCategory === "heart";
  const isFixedLevelCategory = equipmentCategory === "watch";
  const selectedLevel = availableLevels.includes(equipmentLevel)
    ? equipmentLevel
    : (availableLevels[0] ?? 140);

  const handleRoll = () => {
    const result = simulateAdditionalOption({
      flameType,
      equipmentCategory,
      equipmentLevel: isHeartCategory ? null : selectedLevel,
      heartGrade,
      forceTwoLines: flameType === "powerful" && isPowerfulTwoLineLocked,
    });

    if (!result) return;

    if (
      flameType === "powerful" &&
      result.lineCount === 2 &&
      !isPowerfulTwoLineLocked
    ) {
      setIsPowerfulTwoLineLocked(true);
    }

    setLatestResult(result);
    setTotalRollCount((count) => count + 1);
  };

  const handleReset = () => {
    setFlameType("powerful");
    setEquipmentCategory("weapon");
    setEquipmentLevel(140);
    setHeartGrade(2);
    setLatestResult(null);
    setTotalRollCount(0);
    setIsPowerfulTwoLineLocked(false);
  };

  return (
    <section className="w-full space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="gap-4 rounded-xs border-none py-4">
          <CardHeader className="flex flex-row items-center justify-between px-4">
            <CardTitle className="text-lg">환생의 불꽃 설정</CardTitle>
            <div className="flex gap-2">
              <Button type="button" size="sm" onClick={handleRoll}>
                환생의 불꽃 사용
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={handleReset}
              >
                초기화
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 px-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <SelectField
                id="flame-type"
                label="환생의 불꽃 종류"
                value={flameType}
                placeholder="불꽃 종류 선택"
                onValueChange={(value) => setFlameType(value as FlameType)}
              >
                {FLAME_TYPE_OPTIONS.map((option) => (
                  <SelectItem key={option.type} value={option.type}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectField>

              <SelectField
                id="equipment-category"
                label="장비 분류"
                value={equipmentCategory}
                placeholder="장비 분류 선택"
                onValueChange={(value) =>
                  setEquipmentCategory(value as EquipmentCategory)
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
                  value={String(heartGrade)}
                  placeholder="기계심장 등급 선택"
                  onValueChange={(value) =>
                    setHeartGrade(Number(value) as HeartGrade)
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
                  value={String(selectedLevel)}
                  placeholder="장비 레벨 선택"
                  disabled={isFixedLevelCategory}
                  onValueChange={(value) =>
                    setEquipmentLevel(Number(value) as EquipmentLevel)
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

            <div className="bg-secondary text-muted-foreground rounded-xs px-3 py-2 text-xs leading-5">
              검은 환생의 불꽃은 영원한 환생의 불꽃과 동일한 옵션 풀을
              사용합니다.
            </div>
          </CardContent>
        </Card>

        <Card className="gap-4 rounded-xs border-none py-4">
          <CardHeader className="px-4">
            <CardTitle className="text-lg">추가옵션 결과</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-4">
            <div className="bg-secondary grid gap-2 rounded-xs p-4">
              <SummaryRow label="불꽃 종류" value={getFlameLabel(flameType)} />
              <SummaryRow
                label="장비 분류"
                value={getEquipmentLabel(equipmentCategory)}
              />
              <SummaryRow
                label={isHeartCategory ? "기계심장 등급" : "장비 레벨"}
                value={
                  isHeartCategory ? `${heartGrade}등급` : `${selectedLevel}`
                }
              />
              <SummaryRow label="총 시행" value={`${totalRollCount}회`} />
              <SummaryRow
                label="강력한 2줄 고정"
                value={isPowerfulTwoLineLocked ? "활성" : "비활성"}
              />
              <Separator className="my-2" />

              {latestResult ? (
                <div className="grid gap-2 text-sm">
                  <SummaryRow
                    label="옵션 줄 수"
                    value={`${latestResult.options.length}줄`}
                  />
                  {latestResult.options.map((option, index) => (
                    <SummaryRow
                      key={`${option.key}-${index}`}
                      label={`${index + 1}. ${option.label}`}
                      value={formatRolledValue(
                        option.value,
                        option.unit,
                        option.step,
                      )}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">
                  아직 시뮬레이션 결과가 없습니다.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
