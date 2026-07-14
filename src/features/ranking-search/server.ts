import "server-only";

// 서버 전용 진입점. 넥슨을 직접 찌르는 조회를 클라이언트 배럴과 물리적으로 분리해,
// 클라이언트에서 import 하면 빌드 타임에 실패하게 한다.
export { findRankedCharacter } from "./model/find-ranked-character";
export {
  readRankingSearchQuery,
  readSearchableRankingType,
} from "./model/params";
