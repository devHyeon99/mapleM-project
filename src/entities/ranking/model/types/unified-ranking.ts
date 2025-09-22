import type { AchievementBadge } from "./ranking";

/**
 * 테이블 컴포넌트가 렌더링하기 위해 바라보는 단일 인터페이스
 */
export interface UnifiedRankingItem {
  id: string; // 리스트 렌더링용 고유 Key
  rank: number; // 전체 순위
  worldRank: number; // 월드 순위
  worldName: string; // 월드 이름

  // 1. 주체 정보 (캐릭터 이름 또는 길드 이름)
  identity: {
    name: string;
    type: "character" | "guild";
  };

  // 2. 부가 정보 (직업 또는 길드마스터)
  subIdentity: {
    text: string; // 직업명, 마스터명, 등급명
    icon?: string; // (옵션) 업적 등급 아이콘 등
  };

  // 3. 메인 스탯 (레벨, 무릉 층수, 전투력 등)
  mainStat: {
    value: string | number; // 283, "60층", "1,240,000"
    label?: string; // "Lv.", "점" 등 (필요 시)
  };

  // 4. 기타 정보 (길드 정보, 업적 뱃지, 등급 아이콘 등)
  extraInfo: {
    type: "guild" | "badge" | "grade" | "none" | "guild-sharenian" | "union";
    text?: string; // 길드명, 등급명
    imageUrl?: string | null; // 길드 마크, 등급 아이콘
    badges?: AchievementBadge[]; // 업적 뱃지 리스트
  };
}
