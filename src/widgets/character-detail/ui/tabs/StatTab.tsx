"use client";

import { Separator } from "@/shared/ui/separator";
import { useCharacterStat } from "@/entities/character";
import { LoadingCard } from "@/shared/ui/LoadingCard";

interface StatTabProps {
  ocid: string;
}

export const StatTab = ({ ocid }: StatTabProps) => {
  const { data, isLoading, isError, error } = useCharacterStat(ocid);

  if (isLoading) {
    return <LoadingCard message="스탯 정보 불러오는중..." />;
  }

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

  const { stat } = data;

  return (
    <div className="flex flex-col gap-3">
      {/* 스탯 정보 영역 */}
      <section className="rounded-md border p-3">
        <h2 className="mb-2 font-semibold">스탯 정보</h2>
        <Separator className="mb-2" />
        <ul className="space-y-1 text-sm">
          {stat.stat.map((s, idx) => {
            const formattedValue = new Intl.NumberFormat("ko-KR").format(
              Number(s.stat_value),
            );

            return (
              <li key={idx} className="flex justify-between">
                <span>{s.stat_name}</span>
                <span className="font-semibold text-[#FF7E54]">
                  {formattedValue}
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};
