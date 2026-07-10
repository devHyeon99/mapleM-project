"use client";

import { Fragment } from "react";

import { useCharacterStat } from "@/entities/character";
import { TabCard } from "@/shared/ui/TabCard";
import { InfoDescriptionRow } from "@/shared/ui/InfoRow";
import { SegmentedToggle } from "@/shared/ui/SegmentedToggle";
import { useHyperStat } from "./useHyperStat";
import { HelpPopover } from "@/shared/ui/HelpPopover";
import { TabLoadingBox } from "../../TabLoadingBox";
import { TabMessageSection } from "@/shared/ui/TabMessageSection";

interface StatTabProps {
  ocid: string;
  level: number;
}

const STAT_HELP_ITEMS = [
  {
    title: "캐릭터 스탯 도움말",
    description:
      "현재 표기되는 스탯은 아이템 착용, 강화, 버프 등 캐릭터에 적용된 효과로 스탯 값이 게임 내 데이터와 상이할 수 있습니다.",
  },
] as const;

const formatStatValue = (value: string) => {
  const normalizedValue = value.replaceAll(",", "");
  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue.toLocaleString() : value;
};

export const StatTab = ({ ocid, level }: StatTabProps) => {
  const { data, isLoading, isError, error } = useCharacterStat(ocid, level);

  const { selectedPreset, onSelectPreset, currentHyperStatInfo } = useHyperStat(
    data?.hyperStat,
  );

  if (isLoading)
    return <TabLoadingBox className="min-h-[598px] md:min-h-[405px]" />;

  if (isError) return <TabMessageSection error={error} />;

  if (!data) {
    return (
      <TabMessageSection message="2025.09.18 API 업데이트 이후 접속하지 않아 정보가 표기되지 않습니다." />
    );
  }

  const { stat, hyperStat } = data;

  return (
    <div className="flex w-full flex-col gap-1 md:flex-row">
      {/* 기본 스탯 정보 영역 */}
      <TabCard
        title="캐릭터 스탯"
        action={
          <HelpPopover
            ariaLabel="캐릭터 스탯 도움말"
            items={STAT_HELP_ITEMS}
            iconClassName="size-5"
          />
        }
      >
        {/* dl 태그로 시맨틱 보강 */}
        <dl className="flex flex-col gap-1">
          {stat.stat.map((s) => (
            <InfoDescriptionRow
              key={s.stat_name}
              as="div"
              variant="between"
              label={s.stat_name}
              isHighlight
            >
              {formatStatValue(s.stat_value)}
            </InfoDescriptionRow>
          ))}
        </dl>
      </TabCard>

      {/* 하이퍼 스탯 정보 영역 */}
      <TabCard
        title="하이퍼 스탯"
        action={
          hyperStat && (
            <SegmentedToggle
              ariaLabel="하이퍼 스탯 프리셋 선택"
              value={selectedPreset}
              onChange={onSelectPreset}
              options={Array.from(
                { length: Math.max(0, hyperStat.preset_count) },
                (_, i) => ({
                  value: i + 1,
                  marked: i + 1 === Number(hyperStat.use_preset_no),
                }),
              )}
            />
          )
        }
      >
        {currentHyperStatInfo.length > 0 ? (
          <dl className="flex flex-col gap-1">
            {currentHyperStatInfo.map((info) => (
              <Fragment key={`${info.stat_type}-${info.stat_level}`}>
                <InfoDescriptionRow
                  as="div"
                  variant="between"
                  label={info.stat_type}
                  isHighlight
                >
                  Lv.{info.stat_level}
                </InfoDescriptionRow>
                <p className="text-foreground mb-1 text-xs">
                  {info.stat_increase}
                </p>
              </Fragment>
            ))}
          </dl>
        ) : (
          <div className="text-muted-foreground flex min-h-43 items-center justify-center text-sm">
            투자한 하이퍼 스탯이 없습니다.
          </div>
        )}
      </TabCard>
    </div>
  );
};
