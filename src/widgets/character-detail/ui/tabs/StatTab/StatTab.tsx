"use client";

import { useCharacterStat } from "@/entities/character";
import { Separator } from "@/shared/ui/separator";
import { LoadingCard } from "@/shared/ui/LoadingCard";
import { InfoRow } from "@/shared/ui/InfoRow"; // InfoRow로 교체
import { HyperStatPresetToggle } from "./HyperStatToggle";
import { useHyperStat } from "./useHyperStat";

interface StatTabProps {
  ocid: string;
  level: number;
}

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
    <div className="flex flex-col gap-3">
      {/* 기본 스탯 정보 영역 */}
      <section className="bg-card/50 rounded-md border p-3">
        <h2 className="mb-2 text-sm font-bold">캐릭터 스탯</h2>
        <Separator className="mb-2" />
        {/* dl 태그로 시맨틱 보강 */}
        <dl className="flex flex-col gap-1">
          {stat.stat.map((s, idx) => (
            <InfoRow
              key={idx}
              as="div"
              variant="between"
              label={s.stat_name}
              isHighlight
            >
              {Number(s.stat_value).toLocaleString()}
            </InfoRow>
          ))}
        </dl>
      </section>

      {/* 하이퍼 스탯 정보 영역 */}
      <section className="bg-card/50 rounded-md border p-3">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-bold">하이퍼 스탯</h2>
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
            {currentHyperStatInfo.map((info, idx) => (
              <InfoRow
                key={idx}
                as="div"
                variant="between"
                label={info.stat_type}
                isHighlight
              >
                Lv.{info.stat_level}
              </InfoRow>
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
