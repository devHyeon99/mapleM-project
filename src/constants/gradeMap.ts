export const GRADE_MAP = {
  레전더리: {
    label: "L",
    textColor: "text-[#0EAF64]",
    borderColor: "border-[#0EAF64]",
    bgColor: "bg-[#0EAF64]",
  },
  유니크: {
    label: "U",
    textColor: "text-[#FF8939]",
    borderColor: "border-[#FF8939]",
    bgColor: "bg-[#FF8939]",
  },
  에픽: {
    label: "E",
    textColor: "text-[#8749D4] dark:text-[#A86DF0]",
    borderColor: "border-[#8749D4]",
    bgColor: "bg-[#8749D4]",
  },
  레어: {
    label: "R",
    textColor: "text-[#2B9CFF]",
    borderColor: "border-[#2B9CFF]",
    bgColor: "bg-[#2B9CFF]",
  },
} as const;

export type GradeKey = keyof typeof GRADE_MAP;

export const POTENTIAL_GRADE_MAP: Record<string, GradeKey> = {
  "1": "레어",
  "2": "에픽",
  "3": "유니크",
  "4": "레전더리",
};
