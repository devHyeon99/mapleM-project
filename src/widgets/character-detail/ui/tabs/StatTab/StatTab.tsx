"use client";

import { useCharacterStat } from "@/entities/character";
import { Separator } from "@/shared/ui/separator";
import { LoadingCard } from "@/shared/ui/LoadingCard";
import { InfoDescriptionRow } from "@/shared/ui/InfoRow";
import { HyperStatPresetToggle } from "./HyperStatToggle";
import { useHyperStat } from "./useHyperStat";
import { HelpPopover } from "@/shared/ui/HelpPopover";

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
    data?.hyperStat ?? undefined,
  );

  if (isLoading) return <LoadingCard message="스탯 정보 불러오는중..." />;

  if (isError) {
    return (
      <div className="rounded-md border p-3 text-sm text-red-500">
        오류: {(error as Error).message}
      </div>
    );
  }

  if (!data) {
    return (
      <section className="rounded-md border p-3">
        <p className="text-muted-foreground text-sm whitespace-pre-line">
          2025.09.18 API 업데이트 이후 접속 하지 않아 정보가 표기 되지 않습니다.
        </p>
      </section>
    );
  }

  const { stat, hyperStat } = data;

  return (
    <div className="flex w-full flex-col gap-1 md:flex-row">
      {/* 기본 스탯 정보 영역 */}
      <section className="bg-card w-full p-3">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="flex h-8 items-center font-bold">캐릭터 스탯</h2>
          <HelpPopover
            ariaLabel="캐릭터 스탯 도움말"
            items={STAT_HELP_ITEMS}
            iconClassName="size-5"
          />
        </div>
        <Separator className="mb-2" />
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
      </section>

      {/* 하이퍼 스탯 정보 영역 */}
      <section className="bg-card w-full p-3">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <h2 className="font-bold">하이퍼 스탯</h2>
          </div>

          {hyperStat && (
            <HyperStatPresetToggle
              count={hyperStat.preset_count}
              active={Number(hyperStat.use_preset_no)}
              selected={selectedPreset}
              onSelect={onSelectPreset}
            />
          )}
        </div>
        <Separator className="mb-2" />

        {currentHyperStatInfo.length > 0 ? (
          <dl className="flex flex-col gap-1">
            {currentHyperStatInfo.map((info) => (
              <>
                <InfoDescriptionRow
                  key={`${info.stat_type}-${info.stat_level}`}
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
              </>
            ))}
          </dl>
        ) : (
          <div className="text-muted-foreground flex h-14 items-center justify-center text-sm">
            투자한 하이퍼 스탯이 없습니다.
          </div>
        )}
      </section>
    </div>
  );
};
