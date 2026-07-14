"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { RANKING_LABELS, type RankingType } from "@/entities/ranking";
import { Skeleton } from "@/shared/ui/skeleton";
import { RankingSearchForm } from "./RankingSearchForm";
import {
  readRankingSearchQuery,
  rankingSearchTargetHref,
  type RankingSearchQuery,
} from "../model/params";
import { useRankedCharacter } from "../model/use-ranked-character";
import type { RankingSearchResult } from "../model/types";

const PANEL_CLASS =
  "bg-muted flex min-h-10 flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-2xl px-4 py-2 text-sm shadow-sm";

const LINK_CLASS =
  "inline-flex items-center gap-1 font-medium underline-offset-4 hover:text-orange-500 hover:underline";

function ResultPanel({
  type,
  query,
  result,
}: {
  type: RankingType;
  query: RankingSearchQuery;
  result: RankingSearchResult;
}) {
  const who = `${query.world} · ${query.name}`;

  if (result.status === "ranked") {
    const { entry, overallPage, worldPage } = result;

    return (
      <div role="status" className={PANEL_CLASS}>
        <p>
          <span className="font-semibold">{who}</span>
          {" - 전체 "}
          <span className="font-semibold">
            {entry.ranking.toLocaleString()}위
          </span>
          {" / 월드 "}
          <span className="font-semibold">
            {entry.world_ranking.toLocaleString()}위
          </span>
        </p>

        <span className="flex flex-row items-center gap-3">
          <Link
            href={rankingSearchTargetHref(type, query, { page: overallPage })}
            prefetch={false}
            className={LINK_CLASS}
          >
            전체 월드 보기
          </Link>

          <span className="bg-border block h-3 w-px" aria-hidden="true" />

          <Link
            href={rankingSearchTargetHref(type, query, {
              page: worldPage,
              worldName: query.world,
            })}
            prefetch={false}
            className={LINK_CLASS}
          >
            {query.world} 월드 보기
          </Link>
        </span>
      </div>
    );
  }

  const message =
    result.status === "no-character"
      ? `${query.world} 월드에 "${query.name}" 캐릭터가 없습니다.`
      : result.status === "unranked"
        ? `${who} 은(는) ${RANKING_LABELS[type]} 랭킹 전체 10,000위 밖입니다.`
        : result.message;

  return (
    <p role="status" className={`${PANEL_CLASS} text-muted-foreground`}>
      {message}
    </p>
  );
}

function RankingSearchResultPanel({
  type,
  query,
}: {
  type: RankingType;
  query: RankingSearchQuery;
}) {
  const { data, error, isPending } = useRankedCharacter(type, query);

  if (isPending) return <Skeleton className="h-10 w-full rounded-2xl" />;

  // 라우트 핸들러는 조회 실패도 결과로 돌려주므로, 여기 error 는 전송 실패다.
  const result: RankingSearchResult = error
    ? { status: "error", message: error.message }
    : data!;

  return <ResultPanel type={type} query={query} result={result} />;
}

/** 검색어가 없을 때 결과가 들어설 자리. 모바일에선 빈 줄이 되므로 감춘다. */
function EmptyHint() {
  return (
    <p className="text-muted-foreground hidden h-10 items-center px-1 text-sm md:flex">
      월드와 이름을 넣으면 순위와 해당 페이지를 알려줘요.
    </p>
  );
}

export function RankingSearch({ type }: { type: RankingType }) {
  // 검색 조건을 서버가 아니라 여기서 읽는다. 페이지가 searchParams 를 읽으면
  // 라우트 전체가 동적으로 확정돼 정적 렌더가 불가능해진다.
  const query = readRankingSearchQuery(useSearchParams());

  return (
    <section
      aria-label="랭킹에서 캐릭터 찾기"
      // 아래 필터에도 월드 셀렉트가 있어 그냥 두면 둘이 한 덩어리로 읽힌다.
      // 밑줄로 "찾기" 영역과 "보기" 영역을 갈라 놓는다.
      className="mb-3 flex flex-col gap-2 border-b pb-3 md:flex-row md:items-start md:gap-3"
    >
      {/* 입력은 닉네임 2~8자면 충분해 폭을 고정하고, 남는 자리를 결과가 쓰게 둔다. */}
      <div className="md:w-[320px] md:shrink-0">
        <RankingSearchForm />
      </div>

      <div className="min-w-0 flex-1">
        {query ? (
          // 검색어가 바뀌면 스켈레톤부터 다시 보여주도록 key 를 준다.
          <RankingSearchResultPanel
            key={`${type}:${query.world}:${query.name}`}
            type={type}
            query={query}
          />
        ) : (
          <EmptyHint />
        )}
      </div>
    </section>
  );
}

/** useSearchParams 를 쓰므로 Suspense 가 필요하다. 빈 상태와 같은 높이로 맞춘다. */
export function RankingSearchFallback() {
  return (
    <section
      aria-hidden="true"
      className="mb-3 flex flex-col gap-2 border-b pb-3 md:flex-row md:items-start md:gap-3"
    >
      <div className="md:w-[320px] md:shrink-0">
        <Skeleton className="h-10 w-full rounded-2xl" />
      </div>
      <div className="min-w-0 flex-1">
        <EmptyHint />
      </div>
    </section>
  );
}
