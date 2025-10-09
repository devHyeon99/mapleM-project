import "server-only";
import { nexonFetch } from "@/shared/api/nexon/server";
import { handleCommonNexonError } from "@/shared/api/nexon/handler";
import { NoticeItem, NoticeData } from "../model/types";

/**
 * 공지사항, 이벤트, 패치노트를 병렬로 가져와 통합
 * 캐시 시간: 3600초 (1시간)
 */
export async function getCombinedNotices(): Promise<NoticeData> {
  try {
    // 1시간 캐싱 적용
    const fetchOptions = {
      next: { revalidate: 3600 },
    };

    // 3개의 API를 병렬로 호출
    const [noticeRes, eventRes, patchRes] = await Promise.all([
      nexonFetch<{ notice: NoticeItem[] }>("/notice", fetchOptions),
      nexonFetch<{ event_notice: NoticeItem[] }>("/notice-event", fetchOptions),
      nexonFetch<{ patch_notice: NoticeItem[] }>("/notice-patch", fetchOptions),
    ]);

    return {
      notice: noticeRes.notice?.slice(0, 5) ?? [],
      event_notice: eventRes.event_notice?.slice(0, 5) ?? [],
      patch_notice: patchRes.patch_notice?.slice(0, 5) ?? [],
    };
  } catch (error) {
    // 공통 에러 핸들러로 전달 (점검 중, API 키 오류 등 처리)
    handleCommonNexonError(error);

    // 에러 핸들러에서 throw되지 않은 예상치 못한 에러에 대한 fallback
    console.error("Notice Fetch Error:", error);
    return {
      notice: [],
      event_notice: [],
      patch_notice: [],
    };
  }
}
