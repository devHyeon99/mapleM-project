import { QueryClient, dehydrate } from "@tanstack/react-query";
import { getRanking } from "@/entities/ranking/api/get-ranking";
import { rankingQueryKeys } from "@/entities/ranking/model/queries/query-keys";
import type { RankingType } from "@/entities/ranking/model/types/ranking";

export async function getRankingPageData(
  type: RankingType,
  searchParams: { [key: string]: string | string[] | undefined },
) {
  // 요청마다 새로운 QueryClient를 생성하여 데이터 격리 보장
  const queryClient = new QueryClient();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";

  const worldName =
    typeof searchParams.world_name === "string"
      ? searchParams.world_name
      : undefined;
  const date =
    typeof searchParams.date === "string" ? searchParams.date : undefined;

  // URL 쿼리 파라미터에서 현재 보고 있는 페이지 번호 추출
  const uiPage =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;

  // UI 페이지 단위를 API 요청 단위로 변환
  // 넥슨 API는 200개 단위로 반환하므로 UI 10페이지가 API 1페이지에 해당
  const apiPage = Math.ceil(uiPage / 10);

  // API 호출 및 Query Key 생성에 사용할 필터 객체 구성
  const apiFilters = { worldName, date, page: apiPage };
  const queryKey = rankingQueryKeys.list(type, apiFilters);

  try {
    // 서버 사이드에서 미리 데이터를 가져와 QueryClient에 저장
    await queryClient.fetchQuery({
      queryKey,
      queryFn: () => getRanking({ type, ...apiFilters, baseUrl }),
    });
  } catch (e) {
    console.error(`${type} 랭킹 Prefetch 실패:`, e);
  }

  return {
    // 클라이언트가 사용할 수 있도록 직렬화된 데이터 상태 반환
    dehydratedState: dehydrate(queryClient),
    // UI 컴포넌트가 현재 페이지 위치를 알 수 있도록 파라미터 전달
    params: { worldName, date, page: uiPage },
  };
}
