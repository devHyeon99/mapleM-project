/**
 * 주어진 날짜와 현재 날짜의 차이를 "N년 N개월 N일 전" 형식으로 반환
 */
export const getDetailedTimeAgo = (dateString: string | Date): string => {
  const today = new Date();
  const target = new Date(dateString);

  // 유효하지 않은 날짜 처리
  if (isNaN(target.getTime())) return "";

  // 시간 성분 제거 (날짜 기준 계산을 위해)
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  let years = today.getFullYear() - target.getFullYear();
  let months = today.getMonth() - target.getMonth();
  let days = today.getDate() - target.getDate();

  // 일(Day)이 음수면, 전달에서 날짜를 빌려옴
  if (days < 0) {
    months -= 1;
    const prevMonthLastDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      0,
    ).getDate();
    days += prevMonthLastDay;
  }

  // 월(Month)이 음수면, 전년도에서 12개월을 빌려옴
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const parts = [];
  if (years > 0) parts.push(`${years}년`);
  if (months > 0) parts.push(`${months}개월`);
  if (days > 0) parts.push(`${days}일`);

  if (parts.length === 0) return "오늘";
  return `${parts.join(" ")} 전`;
};

/**
 * 한국 시간(KST) 기준으로 오늘 날짜(YYYY-MM-DD)를 반환합니다.
 */
export function getTodayDateKST() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const parts = formatter.formatToParts(now);
  const getPart = (type: string) =>
    parts.find((p) => p.type === type)?.value || "";

  return `${getPart("year")}-${getPart("month")}-${getPart("day")}`;
}

/**
 * YYYY-MM-DD 형식의 문자열을 받아 하루 전 날짜를 동일한 형식으로 반환합니다.
 */
export function subtractOneDay(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  // JS Date의 month는 0~11이므로 m-1
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() - 1);

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
}
