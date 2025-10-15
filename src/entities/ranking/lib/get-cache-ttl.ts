import { setHours, addDays, differenceInSeconds } from "date-fns";

export function getSecondsUntilNextUpdate(): number {
  const now = new Date();
  let nextUpdate = setHours(new Date(), 6);
  nextUpdate.setMinutes(0);
  nextUpdate.setSeconds(0);
  nextUpdate.setMilliseconds(0);

  // 현재가 이미 6시 이후라면, 다음 6시는 내일임
  if (now >= nextUpdate) {
    nextUpdate = addDays(nextUpdate, 1);
  }

  return differenceInSeconds(nextUpdate, now);
}
