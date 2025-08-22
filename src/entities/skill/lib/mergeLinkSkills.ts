import type { LinkSkillInfo } from "@/entities/skill/model";

// 합산하지 않고 고정값을 유지해야 하는 옵션 키 목록
const NON_STACKABLE_STATS = [
  "버프 중 최종 대미지",
  "버프 시간",
  "재발동 대기 시간",
];

// 옵션 문자열 파싱
function parseEffect(effect: string): Record<string, number> {
  const effectMap: Record<string, number> = {};
  if (!effect) return effectMap;

  effect.split(",").forEach((part) => {
    const [key, value] = part.split(":").map((s) => s.trim());
    if (!key || !value) return;
    const num = parseFloat(value.replace(/[^0-9.\-]/g, ""));
    if (!isNaN(num)) {
      effectMap[key] = (effectMap[key] || 0) + num;
    }
  });

  return effectMap;
}

// 객체를 다시 문자열로 변환
function stringifyEffect(effectMap: Record<string, number>): string {
  return Object.entries(effectMap)
    .map(([key, value]) => {
      // 소수점 처리 (정수면 그대로, 소수면 1자리까지)
      const formattedValue = Number.isInteger(value) ? value : value.toFixed(1);
      const unit = key.includes("시간") ? "초" : "%";
      return `${key} : ${formattedValue}${unit}`;
    })
    .join(", ");
}

// 프리셋 보여줄 때 스킬 병합하는 함수
export function mergeLinkSkills(skills: LinkSkillInfo[]): LinkSkillInfo[] {
  const merged: Record<
    string,
    { skill: LinkSkillInfo; effectMap: Record<string, number> }
  > = {};

  skills.forEach((skill) => {
    const effectMap = parseEffect(skill.skill_effect);

    if (merged[skill.skill_name]) {
      // 레벨은 합산
      merged[skill.skill_name].skill.skill_level += skill.skill_level;

      for (const [key, value] of Object.entries(effectMap)) {
        const currentVal = merged[skill.skill_name].effectMap[key] || 0;

        // 조건부 로직 적용
        if (NON_STACKABLE_STATS.includes(key)) {
          // 합산 금지 항목은 둘 중 큰 값을 선택
          merged[skill.skill_name].effectMap[key] = Math.max(currentVal, value);
        } else {
          // 나머지는 기존대로 합산
          merged[skill.skill_name].effectMap[key] = currentVal + value;
        }
      }

      // 합쳐진 effectMap을 다시 문자열로 변환하여 저장
      merged[skill.skill_name].skill.skill_effect = stringifyEffect(
        merged[skill.skill_name].effectMap,
      );
    } else {
      // 처음 발견된 스킬이면 그대로 저장
      merged[skill.skill_name] = {
        skill: { ...skill },
        effectMap,
      };
    }
  });

  return Object.values(merged).map((entry) => entry.skill);
}

// 총 합산 계산 함수
export function calculateTotalStats(skills: LinkSkillInfo[]) {
  const totalMap: Record<string, number> = {};

  // 통계에서 아예 안 보여줄 항목
  const EXCLUDE_FROM_TOTAL = [
    "재발동 대기 시간",
    "버프 시간",
    "버프 중 최종 대미지",
  ];

  skills.forEach((skill) => {
    const effectMap = parseEffect(skill.skill_effect);

    Object.entries(effectMap).forEach(([key, value]) => {
      // 제외 목록에 있으면 건너뜀
      if (EXCLUDE_FROM_TOTAL.includes(key)) return;

      const currentVal = totalMap[key] || 0;
      totalMap[key] = currentVal + value;
    });
  });

  return Object.entries(totalMap).map(([name, value]) => {
    const formattedValue = Number.isInteger(value) ? value : value.toFixed(1);
    const unit = name.includes("시간") ? "초" : "%";

    return {
      name,
      value: `${formattedValue}${unit}`,
    };
  });
}
