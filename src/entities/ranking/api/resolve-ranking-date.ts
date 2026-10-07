import "server-only";
import { unstable_cache } from "next/cache";
import { subDays } from "date-fns";
import { getRankingDate } from "@/shared/lib/ranking-date";
import { fetchRankingCached } from "./fetch-ranking";

/**
 * 판정 결과의 캐시 수명. 실제 갱신은 크론(/api/cron/ranking-date)이 태그로 털어서 처리함.
 * 이 값이 판정을 쓰는 페이지의 ISR 재생성 주기 하한이 되므로 데이터 캐시(24시간)보다 짧게 두지 않음.
 * 크론이 멈췄을 때 하루 뒤에는 스스로 풀리게 하는 안전망 용도임
 */
const PROBE_REVALIDATE_SECONDS = 86400;

/** 판정 결과와 그 판정을 쓴 페이지에 붙는 태그 */
export const RANKING_DATE_TAG = "ranking-date";

/**
 * 넥슨이 오늘 자 랭킹을 아직 올리지 않았으면 전날 날짜로 내려간다.
 *
 * 레벨 랭킹 1페이지를 찔러보는데, 이 응답은 랭킹 페이지가 쓰는 캐시와 키가 같다.
 * 그래서 한 번 성공하고 나면 이후 확인은 캐시 히트로 끝나 넥슨에 나가지 않는다.
 *
 * 실패를 throw 하지 않고 전날 날짜라는 정상 값으로 바꿔 돌려주는 게 중요하다.
 * unstable_cache 는 reject 된 promise 를 저장하지 않아서, throw 하면 TTL 이 걸리지
 * 않고 방문자마다 넥슨을 다시 찌른다.
 */
async function probeRankingDate(
  candidate: string,
  fallback: string,
): Promise<string> {
  try {
    const { ranking } = await fetchRankingCached(
      "level",
      candidate,
      undefined,
      1,
    );
    if (ranking.length > 0) return candidate;
  } catch (cause) {
    console.warn(`[랭킹] ${candidate} 데이터를 받지 못했습니다.`, cause);
  }

  return fallback;
}

/**
 * 화면과 API 요청에 쓸 랭킹 기준일.
 *
 * 판정 결과는 데이터 캐시와 따로 캐싱함. 넥슨이 늦게 올린 날에는 크론이 올라온 걸
 * 확인하는 시점에 태그를 털어 오늘 자로 넘어감.
 * 주기로 다시 판정하지 않는 이유: 이 값이 페이지 재생성 주기 하한이라 짧게 두면
 * 결과가 그대로여도 판정을 쓰는 모든 페이지가 그 주기로 다시 만들어짐
 */
export const resolveRankingDate = () => {
  // 판정 도중 06:00 을 넘겨 후보와 폴백이 어긋나지 않도록 시각을 한 번만 읽는다.
  const now = new Date();
  const candidate = getRankingDate(now);
  const fallback = getRankingDate(subDays(now, 1));

  return unstable_cache(
    async () => probeRankingDate(candidate, fallback),
    // 후보 날짜를 키에 넣어야 06:00 직후에 이전 후보의 판정 결과를 물고 가지 않는다.
    ["ranking-date-resolve-v1", candidate],
    { revalidate: PROBE_REVALIDATE_SECONDS, tags: [RANKING_DATE_TAG] },
  )();
};
