import { revalidateTag, unstable_cache } from "next/cache";
import { NextResponse } from "next/server";

import type { BaseRanking, RankingResponse } from "@/entities/ranking";
import { RANKING_DATE_TAG, rankingDataTag } from "@/entities/ranking/server";
import { nexonFetch } from "@/shared/api/nexon/server";
import { getRankingDate } from "@/shared/lib/ranking-date";
import { matchesBearerSecret } from "@/shared/lib/match-secret";

/**
 * 오늘 자 랭킹이 넥슨에 올라왔는지 확인하고, 처음 확인된 순간 한 번만 랭킹 캐시를 털어냄.
 * Vercel Cron 이 06시~12시(KST) 사이 매시 호출함 (vercel.json).
 * Hobby 플랜은 크론 하나당 하루 한 번만 허용해서 시각마다 크론을 따로 둠.
 * 실행 시각은 정시~59분 사이로 흔들림
 *
 * 하루 한 번만 털기 위해 날짜별 표식을 데이터 캐시에 남김. 표식이 없을 때만
 * 콜백이 실행되므로, 콜백이 돌았다는 건 그날 처음 확인했다는 뜻임
 */
export async function GET(req: Request) {
  // Vercel Cron 은 CRON_SECRET 을 Bearer 토큰으로 실어 보냄
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    console.error("CRITICAL: CRON_SECRET 미설정으로 크론 요청 거부");
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }
  if (!matchesBearerSecret(req, secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const date = getRankingDate(new Date());

  // 판정용 조회는 캐시를 거치지 않음. 캐시를 타면 올라오기 전의 빈 결과를 다시 읽음
  let published = false;
  try {
    const { ranking } = await nexonFetch<RankingResponse<BaseRanking>>(
      `/ranking/level?date=${date}&page=1`,
      { cache: "no-store" },
    );
    published = ranking.length > 0;
  } catch (cause) {
    console.warn(`[랭킹 크론] ${date} 데이터를 받지 못했습니다.`, cause);
  }

  if (!published) return NextResponse.json({ date, published: false });

  let firstSeen = false;
  await unstable_cache(
    async () => {
      firstSeen = true;
      return date;
    },
    ["ranking-date-rollover-v1", date],
    { revalidate: false },
  )();

  if (firstSeen) {
    // expire: 0 은 즉시 만료. "max" 는 낡은 값을 한 번 더 내주는데, 그 사이 판정이
    // 다시 돌면 아직 안 털린 빈 결과를 읽어 전날 날짜로 또 굳음
    revalidateTag(rankingDataTag(date), { expire: 0 });
    revalidateTag(RANKING_DATE_TAG, { expire: 0 });
  }

  return NextResponse.json({ date, published: true, revalidated: firstSeen });
}
