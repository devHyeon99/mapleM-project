import { WORLD_NAMES } from "@/shared/config/constants/worlds";

const AVAILABLE_WORLD_NAMES: ReadonlySet<string> = new Set(
  WORLD_NAMES.filter((w) => w !== "전체"),
);

const getSingleParam = (param: string | string[] | undefined) => {
  if (Array.isArray(param)) return param[0];
  return param;
};

export const normalizeRankingWorldName = (
  param: string | string[] | undefined,
) => {
  const value = getSingleParam(param)?.trim();
  if (!value) return undefined;
  return AVAILABLE_WORLD_NAMES.has(value) ? value : undefined;
};

export const normalizeRankingPage = (
  param: string | string[] | undefined,
  maxPage: number,
) => {
  const raw = getSingleParam(param);
  const parsed = Number.parseInt(raw ?? "", 10);
  const page = Number.isFinite(parsed) ? parsed : 1;
  return Math.min(Math.max(page, 1), maxPage);
};
