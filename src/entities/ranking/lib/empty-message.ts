import { CHALLENGERS_ACTIVE } from "@/shared/config/constants/worlds";
import { RANKING_LABELS } from "../model/constants";
import { isSharenianRanking, type RankingType } from "../model/types/ranking";

// 챌린저스 한시 월드 — `CHALLENGERS_ACTIVE` 가 꺼져 있으면 아래 분기는 동작하지 않음
const CHALLENGERS_WORLD = "챌린저스";
const isChallengers = (worldName?: string): boolean =>
  CHALLENGERS_ACTIVE && worldName === CHALLENGERS_WORLD;

/**
 * 랭킹이 0건일 때 표 자리에 띄울 문구. 비어 있는 이유가 종류·월드마다 달라서 한곳에 모음.
 * 넥슨 API 는 집계가 없는 월드에도 에러 대신 빈 배열을 주므로 화면에서 구분해야 함
 */
export function rankingEmptyMessage(
  type: RankingType,
  worldName?: string,
): string {
  const label = RANKING_LABELS[type];

  if (isSharenianRanking(type)) {
    // 챌린저스는 길드 콘텐츠가 열리지 않는 월드라 집계 자체가 생길 수 없음
    if (isChallengers(worldName)) {
      return `${CHALLENGERS_WORLD} 월드는 ${label} 랭킹이 제공되지 않습니다.`;
    }
    return `${label} 랭킹은 아직 시작 전이라 데이터가 존재하지 않습니다.`;
  }

  // 넥슨은 전체 월드 10,000등까지만 집계해서 준다. 월드별 조회도 그 안에서 걸러 내는 거라
  // 컷 밖의 월드는 캐릭터가 있어도 0건으로 온다 (RankingFilters 의 집계기준 안내와 같은 기준)
  return `${worldName ? `${worldName} 월드에는 ` : ""}전체 월드 ${label} 랭킹 10,000등 안에 드는 캐릭터가 없습니다.`;
}

/**
 * 목록이 비었을 때 월드 필터를 남겨 둘지. 월드를 바꾸면 결과가 달라질 수 있을 때만 남김.
 *
 * 샤레니안은 전 월드가 같은 기간을 공유해서, 기간 밖이면 어느 월드를 골라도 비어 있음.
 * 지금 챌린저스만 예외인 건 길드 시스템이 없어 저 월드에만 집계가 없기 때문이고,
 * 다른 월드는 기간 중이라 고르면 결과가 나옴 - 챌린저스 종료 중에는 플래그로 꺼짐
 */
export const canOtherWorldsHaveRanking = (
  type: RankingType,
  worldName?: string,
): boolean => !isSharenianRanking(type) || isChallengers(worldName);
