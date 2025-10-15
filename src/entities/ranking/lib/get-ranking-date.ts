import { subDays, setHours, isBefore, format } from "date-fns";

/**
 * 랭킹 API 호출에 필요한 날짜 문자열(yyyy-MM-dd)을 반환합니다.
 * 06:00 이전 -> 어제 날짜
 * 06:00 이후 -> 오늘 날짜
 */
export function getRankingDate(): string {
  const now = new Date();

  // 오늘 오전 6시 정각 기준점
  const todaySixAM = setHours(new Date(), 6);
  todaySixAM.setMinutes(0);
  todaySixAM.setSeconds(0);
  todaySixAM.setMilliseconds(0);

  // 06:00 이전이면 어제(1일 전), 이후면 오늘(0일 전)
  const targetDate = isBefore(now, todaySixAM) ? subDays(now, 1) : now;

  return format(targetDate, "yyyy-MM-dd");
}
