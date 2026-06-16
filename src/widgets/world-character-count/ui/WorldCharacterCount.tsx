import Link from "next/link";
import {
  getLevelWorldCharacterCounts,
  resolveRankingDate,
} from "@/entities/ranking/server";
import { RankingIcon } from "@/entities/ranking/ui/RankingIcon";
import { worldIconSrc } from "@/shared/config/constants/worlds";
import { Skeleton } from "@/shared/ui/skeleton";

function Frame({
  date,
  children,
}: {
  date?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 p-4 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-2 px-2">
        <h3 className="text-base font-bold">월드별 캐릭터 수 집계</h3>
        <p className="text-muted-foreground text-xs">
          전체 레벨 랭킹 10,000위 기준
          {date ? ` · ${date}` : ""}
        </p>
      </div>
      {children}
    </div>
  );
}

export async function WorldCharacterCount() {
  const date = await resolveRankingDate();

  // 랭킹 집계가 실패해도 메인 페이지의 나머지는 살린다.
  const counts = await getLevelWorldCharacterCounts(date).catch(() => null);

  if (!counts?.length) {
    return (
      <Frame>
        <p className="text-muted-foreground text-sm">
          월드별 캐릭터 수를 불러오지 못했습니다.
        </p>
      </Frame>
    );
  }

  const total = counts.reduce((sum, { count }) => sum + count, 0);
  const max = counts[0].count;

  return (
    <Frame date={date}>
      <ul className="flex flex-col gap-1.5">
        {counts.map(({ worldName, count }) => (
          <li key={worldName}>
            <Link
              href={`/ranking?world_name=${encodeURIComponent(worldName)}`}
              prefetch={false}
              className="hover:bg-accent flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors"
            >
              <RankingIcon
                src={worldIconSrc(worldName)}
                alt={worldName}
                className="h-4 w-4"
                size={16}
              />
              <span className="w-14 shrink-0 text-sm font-medium">
                {worldName}
              </span>
              <span
                className="bg-muted h-2 min-w-0 flex-1 overflow-hidden rounded-full"
                aria-hidden
              >
                <span
                  className="block h-full rounded-full bg-orange-500"
                  style={{ width: `${(count / max) * 100}%` }}
                />
              </span>
              <span className="w-24 shrink-0 text-right text-sm tabular-nums">
                {count.toLocaleString()}
                <span className="text-muted-foreground ml-1 text-xs">
                  {((count / total) * 100).toFixed(1)}%
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

export function WorldCharacterCountSkeleton() {
  return (
    <Frame>
      <ul className="flex flex-col gap-1.5">
        {Array.from({ length: 7 }).map((_, i) => (
          <li key={i} className="px-2 py-1.5">
            <Skeleton className="h-5 w-full" />
          </li>
        ))}
      </ul>
    </Frame>
  );
}
