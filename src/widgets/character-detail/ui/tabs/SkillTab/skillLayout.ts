/** 통합 스킬 모드(skill_mode 3)의 첫 슬롯 ID */
const SLOT_ID_BASE = 78;

/** 세트당 슬롯 수 (앞면 12칸 + 뒷면 12칸) */
const SLOTS_PER_SET = 24;

export const SKILL_SET_NOS = [1, 2, 3] as const;
const GRID_COLUMNS = 4;

/**
 * 페이지별 12칸 배치. 값은 세트 내 슬롯 오프셋이고 위 행부터 좌→우 순서다.
 *
 * 오프셋은 아래 행 좌측부터 0, 1, 2 … 로 올라가며 붙고, 각 페이지의 마지막 칸만
 * 세트 뒤쪽 번호(앞면 23, 뒷면 22)를 쓴다. 구 A/B 모드도 같은 규칙이었다.
 */
const PAGE_OFFSETS = {
  front: [10, 9, 8, 7, 3, 4, 5, 6, 2, 1, 0, 23],
  back: [21, 20, 19, 18, 14, 15, 16, 17, 13, 12, 11, 22],
} as const;

export type SkillPage = keyof typeof PAGE_OFFSETS;

/** 한 페이지를 행 단위(위→아래)로 나눈 slot_id 목록을 반환 */
export function getPageRows(setNo: number, page: SkillPage): string[][] {
  const setBase = SLOT_ID_BASE + (setNo - 1) * SLOTS_PER_SET;
  const slotIds = PAGE_OFFSETS[page].map((offset) => String(setBase + offset));

  return Array.from({ length: slotIds.length / GRID_COLUMNS }, (_, row) =>
    slotIds.slice(row * GRID_COLUMNS, row * GRID_COLUMNS + GRID_COLUMNS),
  );
}
