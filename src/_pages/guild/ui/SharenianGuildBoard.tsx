import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { GuildMark } from "@/entities/guild";
import {
  RANKING_LABELS,
  rankingHref,
  type SharenianRanking,
} from "@/entities/ranking";
import {
  fetchRankingCached,
  resolveRankingDate,
} from "@/entities/ranking/index.server";
import { Card, CardAction, CardHeader } from "@/shared/ui/card";
import { formatDateKST } from "@/shared/lib/date";
import { guildHref } from "@/shared/lib/url";

/** 샤레니안은 캐릭터가 아니라 길드 단위 랭킹임. 길드 목록 재료로 그대로 쓸 수 있음 */
const SHARENIAN_TYPES = [
  "sharenian-battlefield",
  "sharenian-waterway",
] as const;

const TOP_COUNT = 10;

/** 기간 밖이면 넥슨이 에러 대신 200 + 빈 배열을 줌. 이때 카드 자리에 띄울 문구 */
const NOT_STARTED_MESSAGES: Record<(typeof SHARENIAN_TYPES)[number], string> = {
  "sharenian-battlefield": "샤레니안 전장이 시작 전입니다.",
  "sharenian-waterway": "지하수로가 시작 전입니다.",
};

async function fetchTopGuilds(
  type: (typeof SHARENIAN_TYPES)[number],
  date: string,
): Promise<SharenianRanking[]> {
  // 랭킹 페이지와 캐시 키가 같아 이미 채워져 있으면 넥슨으로 안 나감
  const { ranking } = await fetchRankingCached(type, date, undefined, 1);
  return (ranking as SharenianRanking[]).slice(0, TOP_COUNT);
}

export async function SharenianGuildBoard() {
  const date = await resolveRankingDate();

  // 한쪽이 실패해도 나머지 칸은 살림. 둘 다 실패하면 섹션째 사라짐.
  // 보조 섹션이라 에러 문구를 대신 넣지 않음. 라우트 캐시가 만료된 뒤 다음 렌더에서 복구됨.
  // 빈 배열은 에러가 아니라 시즌 시작 전이라 카드는 남기고 안내 문구를 넣음.
  // ranking 이 null 로 오는 응답은 fetchRanking 안에서 throw 되어 rejected 쪽으로 감
  const settled = await Promise.allSettled(
    SHARENIAN_TYPES.map((type) => fetchTopGuilds(type, date)),
  );

  const boards = SHARENIAN_TYPES.flatMap((type, index) => {
    const result = settled[index];
    return result.status === "fulfilled" ? [{ type, rows: result.value }] : [];
  });

  if (boards.length === 0) return null;

  return (
    <section aria-labelledby="sharenian-guild-heading" className="w-full">
      <div className="mb-3 flex flex-col">
        <h2 id="sharenian-guild-heading" className="text-lg font-bold">
          상위 길드
        </h2>
        <div className="flex flex-row justify-between">
          <p className="text-muted-foreground text-13 mt-0.5 break-keep">
            샤레니안 전장과 지하수로 상위 10개 길드입니다.
          </p>
          <p className="text-muted-foreground shrink-0 self-center text-xs">
            <time dateTime={date}>{formatDateKST(date)}</time>
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
        {boards.map(({ type, rows }) => (
          <Card key={type} size="sm" className="gap-0">
            {/* CardHeader 는 CardAction 이 있으면 2열 그리드가 됨. 제목 왼쪽 / 링크 오른쪽 */}
            <CardHeader className="items-center gap-0 border-b">
              <h3 className="text-13 truncate font-bold">
                {RANKING_LABELS[type]}
              </h3>
              <CardAction className="self-center">
                <Link
                  href={rankingHref(type)}
                  className="text-muted-foreground hover:text-foreground focus-visible:ring-ring flex items-center gap-0.5 rounded-sm text-xs transition-colors focus-visible:ring-2 focus-visible:outline-none"
                >
                  더보기
                  <ChevronRight aria-hidden="true" className="size-3" />
                </Link>
              </CardAction>
            </CardHeader>

            {/* 행 배경이 카드 끝까지 닿아야 해서 CardContent 대신 직접 붙임.
                좌우 여백은 카드 간격 토큰(size="sm" = 16px)에 맞춘 px-4 임 */}
            {rows.length === 0 ? (
              // 10행 목록과 같은 높이(행 48px = 마크 28px + py-2.5, 구분선 9px). 나란할 때는 그리드 stretch 로도 맞춰짐
              <p className="text-muted-foreground text-13 flex min-h-[calc(10*3rem+9px)] flex-1 items-center justify-center px-4 text-center break-keep">
                {NOT_STARTED_MESSAGES[type]}
              </p>
            ) : (
              <ol className="divide-border/50 divide-y">
                {rows.map((row) => (
                  <li key={`${row.world_name}-${row.guild_name}`}>
                    <Link
                      href={guildHref(row.world_name, row.guild_name)}
                      prefetch={false}
                      className="hover:bg-muted/60 focus-visible:ring-ring flex items-center gap-2.5 px-4 py-2.5 transition-colors focus-visible:ring-2 focus-visible:-outline-offset-2 focus-visible:outline-none"
                    >
                      {/* 1~10 위는 실제 순서라 숫자가 정보를 담음. 상위 3개만 무게로 구분 */}
                      <span
                        className={
                          row.ranking <= 3
                            ? "text-foreground text-13 w-4 shrink-0 font-bold tabular-nums"
                            : "text-muted-foreground text-13 w-4 shrink-0 tabular-nums"
                        }
                      >
                        {row.ranking}
                      </span>

                      <GuildMark
                        src={row.guild_mark_icon}
                        name={row.guild_name}
                        size="sm"
                      />

                      <span className="text-13 min-w-0 truncate font-semibold">
                        {row.guild_name}
                      </span>
                      <span className="text-muted-foreground ml-auto shrink-0 text-xs">
                        {row.world_name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}
