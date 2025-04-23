export function isResetRequired(
  type: 'daily' | 'weekly' | 'monthly' | 'weekly-thursday',
  lastResetISO: string | null,
  now: Date = new Date()
): boolean {
  if (!lastResetISO) return true;

  const last = new Date(lastResetISO);

  switch (type) {
    case 'daily':
      return now.toDateString() !== last.toDateString();

    case 'weekly':
      return (
        getWeekNumber(now) !== getWeekNumber(last) ||
        now.getFullYear() !== last.getFullYear()
      );

    case 'weekly-thursday':
      return (
        getThursdayWeekStart(now).getTime() !==
        getThursdayWeekStart(last).getTime()
      );

    case 'monthly':
      return (
        now.getMonth() !== last.getMonth() ||
        now.getFullYear() !== last.getFullYear()
      );

    default:
      return false;
  }
}

function getWeekNumber(date: Date): number {
  const tempDate = new Date(date);
  tempDate.setHours(0, 0, 0, 0);

  // 현재 날짜를 기준으로 해당 주의 월요일을 찾음 (ISO 기준)
  tempDate.setDate(tempDate.getDate() + 3 - ((tempDate.getDay() + 6) % 7));

  const week1 = new Date(tempDate.getFullYear(), 0, 4);
  week1.setDate(week1.getDate() + 3 - ((week1.getDay() + 6) % 7));

  const diff = tempDate.getTime() - week1.getTime();
  return 1 + Math.round(diff / (7 * 24 * 60 * 60 * 1000));
}

function getThursdayWeekStart(date: Date): Date {
  const day = date.getDay(); // 0 (Sun) ~ 6 (Sat)
  const distance = (day + 7 - 4) % 7; // 목요일 = 4
  const thursday = new Date(date);
  thursday.setHours(0, 0, 0, 0);
  thursday.setDate(date.getDate() - distance);
  return thursday;
}

// 생성된지 몇일 됐는지 구하는 함수
export const getDaysSince = (dateString: string): number => {
  const createdDate = new Date(dateString);
  const today = new Date();
  const diffTime = today.getTime() - createdDate.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};
