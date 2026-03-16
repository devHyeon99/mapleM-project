import "server-only";
import { nexonFetch } from "@/shared/api/nexon/server";
import { handleCommonNexonError } from "@/shared/api/nexon/handler";
import { NoticeItem, NoticeData } from "../model/types";

const NOTICE_REVALIDATE_SECONDS = 600;

/**
 * 공지사항, 이벤트, 패치노트를 병렬로 가져와 통합
 * 캐시 시간: 600초 (10분)
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
    // 점검 중·API 키 오류 등 알려진 코드는 여기서 사용자용 문구로 바꿔 던진다.
    handleCommonNexonError(error);

    // 여기까지 온 건 정체를 모르는 실패다. 원문에는 네트워크 주소나 파서 내부
    // 메시지가 섞여 있어 그대로 화면에 내보내지 않고 로그로만 남긴다.
    // 실패 응답(빈 배열)이 캐시에 굳지 않도록 에러 자체는 전파한다.
    console.error("Notice Fetch Error:", error);
    throw new Error("공지사항을 불러오는 중 알 수 없는 오류가 발생했습니다.");
  }
}
