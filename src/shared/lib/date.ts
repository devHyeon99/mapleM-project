const KST_TIME_ZONE = "Asia/Seoul";

const KST_DATE_FORMATTER = new Intl.DateTimeFormat("ko-KR", {
  timeZone: KST_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const KST_DATETIME_FORMATTER = new Intl.DateTimeFormat("ko-KR", {
  timeZone: KST_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

const getKstDateParts = (date: Date) => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: KST_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const year = Number(parts.find((part) => part.type === "year")?.value);
  const month = Number(parts.find((part) => part.type === "month")?.value);
  const day = Number(parts.find((part) => part.type === "day")?.value);

  return { year, month, day };
};

const getDaysInMonth = (year: number, month: number) =>
  new Date(year, month, 0).getDate();

export const parseValidDate = (dateString: string | Date): Date | null => {
  const parsed = dateString instanceof Date ? dateString : new Date(dateString);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

export const formatDateKST = (dateString: string | Date): string => {
  const date = parseValidDate(dateString);
  if (!date) return "";
  return KST_DATE_FORMATTER.format(date);
};

export const formatDateTimeKST = (dateString: string | Date): string => {
  const date = parseValidDate(dateString);
  if (!date) return "";
  return KST_DATETIME_FORMATTER.format(date);
};

/**
 * 주어진 날짜와 현재 날짜의 차이를 "N년 N개월 N일 전" 형식으로 반환
 */
export const getDetailedTimeAgo = (dateString: string | Date): string => {
  const now = new Date();
  const targetDate = parseValidDate(dateString);
  if (!targetDate) return "";

  const today = getKstDateParts(now);
  const target = getKstDateParts(targetDate);

  let years = today.year - target.year;
  let months = today.month - target.month;
  let days = today.day - target.day;

  // 일(Day)이 음수면, 전달에서 날짜를 빌려옴
  if (days < 0) {
    months -= 1;

    const prevMonth = today.month === 1 ? 12 : today.month - 1;
    const prevMonthYear = today.month === 1 ? today.year - 1 : today.year;
    days += getDaysInMonth(prevMonthYear, prevMonth);
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
