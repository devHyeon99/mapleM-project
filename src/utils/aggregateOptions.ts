export function aggregateOptions(optionStrings: string[]): string[] {
  const optionMap: Record<string, number> = {};

  optionStrings.forEach((opt) => {
    const trimmed = opt.trim();

    // 숫자와 단위를 분리 (예: "이동 속도 59%")
    const match = trimmed.match(/^(.+?)\s([\d,.]+)(%?)$/);

    if (match) {
      const [, name, rawValue, unit] = match;
      const value = parseFloat(rawValue.replace(/,/g, "")); // 1,000 → 1000

      if (!isNaN(value)) {
        optionMap[`${name}${unit}`] =
          (optionMap[`${name}${unit}`] ?? 0) + value;
      }
    } else {
      // 숫자 없는 옵션 그대로 유지
      optionMap[trimmed] = NaN;
    }
  });

  // 정렬 우선순위 정의
  const priorityOrder = [
    "물리 공격력",
    "물리 대미지",
    "마법 공격력",
    "마법 대미지",
    "보스 공격력",
    "치명타 확률",
    "치명타 피해",
    "최대 대미지",
    "최종 대미지",
    "방어율 무시",
    "최대 HP",
    "최대 MP",
    "물리 방어력",
    "마법 방어력",
    "물리 피해 감소",
    "마법 피해 감소",
    "이동 속도",
    "점프 높이",
  ];

  return Object.entries(optionMap)
    .map(([key, value]) => {
      if (isNaN(value)) return { name: key, text: key };
      const name = key.replace(/%$/, "");
      const unit = key.endsWith("%") ? "%" : "";
      const formatted = new Intl.NumberFormat("ko-KR").format(value);
      return { name, text: `${name} ${formatted}${unit}` };
    })
    .sort((a, b) => {
      const aIndex = priorityOrder.indexOf(a.name);
      const bIndex = priorityOrder.indexOf(b.name);

      // 둘 다 우선순위에 없으면 이름순 정렬
      if (aIndex === -1 && bIndex === -1) return a.name.localeCompare(b.name);
      // 하나만 없으면 없는 쪽이 뒤로
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      // 둘 다 있으면 순서 비교
      return aIndex - bIndex;
    })
    .map((item) => item.text);
}
