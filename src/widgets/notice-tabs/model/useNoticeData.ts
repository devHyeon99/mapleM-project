import { useQuery, UseQueryResult } from "@tanstack/react-query";

// 게시판 타입 정의
type BoardType = "notice" | "patch" | "event";

// 공통 항목 인터페이스 정의
interface BoardItem {
  title: string;
  url: string;
  notice_id: number;
  date: string;
}

type BoardDataResult = UseQueryResult<BoardItem[], Error>;

// 게시판 타입과 실제 응답 필드 키를 매핑하는 객체 정의
const BoardKeyMap: Record<BoardType, string> = {
  notice: "notice",
  patch: "patch_notice",
  event: "event_notice",
};

/**
 * 특정 게시판 타입에 대한 데이터를 fetching하는 커스텀 훅
 */
export const useNoticeData = (type: BoardType): BoardDataResult => {
  const queryKey = ["boardData", type];
  const apiEndpoint = `/api/notices/${type}`;

  const fetcher = async (): Promise<BoardItem[]> => {
    const res = await fetch(apiEndpoint);
    const result = await res.json();

    if (!res.ok) {
      const errorMessage =
        result.error?.message || `${type} 데이터 요청에 실패했습니다.`;
      throw new Error(errorMessage);
    }

    // BoardKeyMap을 사용하여 실제 응답 키를 가져옴
    const key = BoardKeyMap[type];
    const fetchedData = result[key];

    if (Array.isArray(fetchedData)) {
      return fetchedData;
    } else {
      console.error("API 응답 데이터 형태 오류: 배열이 아님", result);
      throw new Error("데이터 구조가 유효하지 않습니다.");
    }
  };

  return useQuery<BoardItem[], Error>({
    queryKey,
    queryFn: fetcher,
    staleTime: 1000 * 60 * 5,
  });
};
