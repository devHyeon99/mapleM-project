import "server-only";
import { nexonFetch } from "@/shared/api/nexon/server";
import { handleCommonNexonError } from "@/shared/api/nexon/handler";
import { NoticeItem, NoticeData } from "../model/types";

const NOTICE_REVALIDATE_SECONDS = 3600;

/**
 * 공지사항, 이벤트, 패치노트를 병렬로 가져와 통합
 * 캐시 시간: 3600초 (1시간)
 */
export async function getCombinedNotices(): Promise<NoticeData> {
  try {
    // 3개의 API를 병렬로 호출
    const [noticeRes, eventRes, patchRes] = await Promise.all([
      nexonFetch<{ notice: NoticeItem[] }>("/notice", {
        next: {
          revalidate: NOTICE_REVALIDATE_SECONDS,
          tags: ["notices", "all-notices", "notices:general"],
        },
      }),
      nexonFetch<{ event_notice: NoticeItem[] }>("/notice-event", {
        next: {
          revalidate: NOTICE_REVALIDATE_SECONDS,
          tags: ["notices", "all-notices", "notices:event"],
        },
      }),
      nexonFetch<{ patch_notice: NoticeItem[] }>("/notice-patch", {
        next: {
          revalidate: NOTICE_REVALIDATE_SECONDS,
          tags: ["notices", "all-notices", "notices:patch"],
        },
      }),
    ]);

    return {
      notice: noticeRes.notice?.slice(0, 5) ?? [],
      event_notice: eventRes.event_notice?.slice(0, 5) ?? [],
      patch_notice: patchRes.patch_notice?.slice(0, 5) ?? [],
    };
  } catch (error) {
    // 공통 에러 핸들러로 전달 (점검 중, API 키 오류 등 처리)
    handleCommonNexonError(error);

    // 실패 응답(빈 배열)이 캐시에 굳지 않도록 에러를 전파한다.
    console.error("Notice Fetch Error:", error);
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("공지사항을 불러오는 중 알 수 없는 오류가 발생했습니다.");
  }
}
