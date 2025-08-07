"use client";

import {
  useCharacterHexaStat,
  CharacterHexaMatrixStat,
} from "@/entities/character";
import { Separator } from "@/shared/ui/separator";
import { LoadingCard } from "@/shared/ui/LoadingCard";

interface HexaStatTabProps {
  ocid: string;
}

export const HexaStatTab = ({ ocid }: HexaStatTabProps) => {
  const { data, isLoading, isError, error } = useCharacterHexaStat(ocid);

  if (isLoading) return <LoadingCard message="HEXA스탯 불러오는중..." />;
  if (isError)
    return (
      <div className="p-3 text-sm text-red-500">
        오류 발생: {(error as Error).message}
      </div>
    );
  if (!data || data.hexamatrix_stat.length === 0)
    return (
      <section className="rounded-md border p-3">
        <p className="text-muted-foreground text-sm whitespace-pre-line">
          2025.09.18 API 업데이트 이후 접속 하지 않았거나, HEXA스탯이 없습니다.
        </p>
      </section>
    );

  const hexaStatData = data as CharacterHexaMatrixStat;
  const statCores = hexaStatData.hexamatrix_stat ?? [];

  return (
    <div className="space-y-6 rounded-md border p-3 text-sm">
      {statCores.map((core) => (
        <section key={core.stat_core_slot} className="space-y-3">
          <h2 className="text-base font-semibold">
            스탯 코어 슬롯 {core.stat_core_slot}
          </h2>

          {core.stat_info.map((page) => {
            const isActive = page.activate_flag === "1";

            return (
              <div
                key={page.page_no}
                className={`space-y-2 rounded-md border p-3 transition-colors ${
                  isActive
                    ? "border-primary/70 bg-primary/5"
                    : "border-border opacity-70"
                }`}
              >
                {/* 페이지 제목 */}
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-medium">페이지 {page.page_no}</span>
                  {isActive ? (
                    <span className="text-primary ml-1 text-xs font-semibold">
                      (활성화됨)
                    </span>
                  ) : (
                    <span className="text-muted-foreground ml-1 text-xs">
                      (비활성화)
                    </span>
                  )}
                </div>

                <Separator />

                {/* 메인스탯 */}
                <div>
                  <p className="mb-1 text-sm font-semibold">메인스탯</p>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {page.main_stat}
                    </span>
                    <span className="text-muted-foreground font-mono tabular-nums">
                      Lv.{page.main_stat_level}
                    </span>
                  </div>
                </div>

                {/* 서브스탯 */}
                <div>
                  <p className="mb-1 text-sm font-semibold">서브스탯</p>
                  <div className="text-muted-foreground flex justify-between tabular-nums">
                    <span>{page.sub_1_stat}</span>
                    <span>Lv.{page.sub_1_stat_level}</span>
                  </div>
                  <div className="text-muted-foreground flex justify-between tabular-nums">
                    <span>{page.sub_2_stat}</span>
                    <span>Lv.{page.sub_2_stat_level}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      ))}
    </div>
  );
};
