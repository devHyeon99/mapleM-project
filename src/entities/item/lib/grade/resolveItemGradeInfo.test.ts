import { describe, expect, it } from "vitest";
import { getGradeInfo } from "./resolveItemGradeInfo";
import { GRADE_MAP } from "./gradeConstants";

describe("getGradeInfo", () => {
  it("한글 등급명을 등급 정보로 변환한다", () => {
    expect(getGradeInfo("레전더리")).toBe(GRADE_MAP.레전더리);
    expect(getGradeInfo("레어")).toBe(GRADE_MAP.레어);
  });

  it("숫자로 오는 잠재등급도 같은 등급 정보로 변환한다", () => {
    expect(getGradeInfo("4")).toBe(GRADE_MAP.레전더리);
    expect(getGradeInfo("1")).toBe(GRADE_MAP.레어);
  });

  it("등급이 없거나 알 수 없는 값이면 null을 준다", () => {
    expect(getGradeInfo(null)).toBeNull();
    expect(getGradeInfo(undefined)).toBeNull();
    expect(getGradeInfo("")).toBeNull();
    expect(getGradeInfo("0")).toBeNull();
    expect(getGradeInfo("노멀")).toBeNull();
  });
});
