import { subDays, format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

const KST_TZ = "Asia/Seoul";
const RESET_HOUR = 6; // 오전 6시 리셋

export function getRankingDate(now: Date = new Date()): string {
  // 현재 시간(now)이 어느 나라 시간이든 상관없이, 무조건 '한국 시간'으로 변환된 Date 객체를 만듦
  const kstNow = toZonedTime(now, KST_TZ);

  // 변환된 한국 시간의 '시(Hour)'가 6시 전인지 체크
  // (kstNow.getHours()는 한국 시간을 기준으로 0~23을 반환함)
  const target =
    kstNow.getHours() < RESET_HOUR
      ? subDays(kstNow, 1) // 6시 전이면 어제
      : kstNow; // 6시 후면 오늘

  // 포맷팅 (yyyy-MM-dd)
  return format(target, "yyyy-MM-dd");
}
