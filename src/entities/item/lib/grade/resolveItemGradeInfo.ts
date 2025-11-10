import { GRADE_MAP, POTENTIAL_GRADE_MAP, GradeKey } from "./gradeConstants";

// 아이템 등급 문자열(숫자 잠재등급 포함)을 UI 렌더링용 등급 정보로 변환
export function getGradeInfo(grade: string | null | undefined) {
  if (!grade) return null;

  const mappedGrade = POTENTIAL_GRADE_MAP[grade] ?? grade;

  if (
    (Object.keys(GRADE_MAP) as GradeKey[]).includes(mappedGrade as GradeKey)
  ) {
    return GRADE_MAP[mappedGrade as GradeKey];
  }

  return null;
}
