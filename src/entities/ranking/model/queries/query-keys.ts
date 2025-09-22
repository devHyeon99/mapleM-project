import type { RankingType } from "../types/ranking";

export const rankingQueryKeys = {
  all: ["ranking"] as const,
  list: (
    type: RankingType,
    filters: { worldName?: string; date?: string; page: number },
  ) => [...rankingQueryKeys.all, type, filters] as const,
};
