import { subDays, format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

const KST_TZ = "Asia/Seoul";
const RESET_HOUR = 6; // 오전 6시 리셋

export function getRankingDate(now: Date = new Date()): string {
  const kstNow = toZonedTime(now, KST_TZ);
  const target = kstNow.getHours() < RESET_HOUR ? subDays(kstNow, 1) : kstNow;
  return format(target, "yyyy-MM-dd");
}
