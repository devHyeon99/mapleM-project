/** 한 번에 이동하는 거리 = 보이는 너비의 비율 */
export const SCROLL_STEP_RATIO = 0.8;

interface TabScrollMetrics {
  scrollLeft: number;
  clientWidth: number;
  scrollWidth: number;
}

/**
 * 좌우 이동 버튼이 향할 scrollLeft 를 구한다.
 *
 * 목표 지점에서 한 스텝을 더 갈 수 없으면 곧장 끝으로 붙인다. 그러지 않으면
 * 탭 하나 남짓한 공백이 남아 버튼을 한 번 더 눌러야 끝에 닿는다.
 */
export const getTabScrollTarget = (
  { scrollLeft, clientWidth, scrollWidth }: TabScrollMetrics,
  direction: "left" | "right",
): number => {
  const maxScrollLeft = Math.max(scrollWidth - clientWidth, 0);
  const step = clientWidth * SCROLL_STEP_RATIO;

  if (direction === "left") {
    const target = scrollLeft - step;
    return target <= step ? 0 : target;
  }

  const target = scrollLeft + step;
  return target >= maxScrollLeft - step ? maxScrollLeft : target;
};
