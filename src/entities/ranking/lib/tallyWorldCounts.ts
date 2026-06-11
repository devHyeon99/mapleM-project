import type { BaseRanking } from "../model/types/ranking";

export interface WorldCharacterCount {
  worldName: string;
  count: number;
}

/**
 * 랭킹 행을 월드별로 집계한다. 넥슨이 새 월드를 추가해도 응답에 들어온 월드명을 그대로 쓰므로
 * WORLD_NAMES 상수를 갱신하지 않아도 집계에 잡힌다.
 */
export function tallyWorldCounts(
  rows: Pick<BaseRanking, "world_name">[],
): WorldCharacterCount[] {
  const counts = new Map<string, number>();
  for (const row of rows) {
    counts.set(row.world_name, (counts.get(row.world_name) ?? 0) + 1);
  }

  return [...counts]
    .map(([worldName, count]) => ({ worldName, count }))
    .sort(
      (a, b) => b.count - a.count || a.worldName.localeCompare(b.worldName),
    );
}
