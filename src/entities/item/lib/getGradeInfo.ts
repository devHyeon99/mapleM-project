import {
  GRADE_MAP,
  POTENTIAL_GRADE_MAP,
  GradeKey,
} from "@/shared/config/constants/gradeMap";

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
