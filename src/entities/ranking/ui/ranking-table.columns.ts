import type { ReactNode } from "react";
import {
  isSharenianRanking,
  type AnyRankingData,
  type RankingType,
} from "../model/types/ranking";
import { Renderers, type RankingTableContext } from "./ranking-table.renderers";

export interface ColumnDef {
  header: string;
  className?: string;
  /** 데이터 셀에만 붙는 클래스. 헤더 톤은 그대로 두고 값만 손볼 때 씀 */
  cellClassName?: string;
  cell: (item: AnyRankingData, ctx: RankingTableContext) => ReactNode;
}

const createBaseColumns = (statHeader: string): ColumnDef[] => [
  { header: "순위", className: "w-[60px]", cell: Renderers.Rank },
  { header: "월드", className: "w-[80px]", cell: Renderers.World },
  { header: "캐릭터", className: "w-[150px]", cell: Renderers.Identity },
  { header: "직업", className: "w-[120px]", cell: Renderers.Job },
  {
    header: statHeader,
    className: "w-[120px]",
    cellClassName: "font-bold",
    cell: Renderers.MainStat,
  },
  { header: "길드", className: "w-[120px]", cell: Renderers.SubInfo },
];

const RANKING_COLUMNS: Record<string, ColumnDef[]> = {
  // 일반 랭킹
  level: createBaseColumns("레벨"),
  dojang: createBaseColumns("무릉 층수"),
  "root-of-time": createBaseColumns("점수"),
  "combat-power": createBaseColumns("전투력"),
  "kerning-m-tower": createBaseColumns("타워 층수"),

  // 유니온 랭킹
  union: [
    { header: "순위", className: "w-[60px]", cell: Renderers.Rank },
    { header: "월드", className: "w-[80px]", cell: Renderers.World },
    { header: "캐릭터", className: "w-[150px]", cell: Renderers.Identity },
    {
      header: "유니온 레벨",
      className: "w-[100px]",
      cellClassName: "text-muted-foreground",
      cell: Renderers.MainStat,
    },
    // SubInfo는 유니온 등급(grade)을 우선 표시하므로 여기 사용
    {
      header: "등급",
      className: "w-[120px]",
      cellClassName: "font-bold",
      cell: Renderers.SubInfo,
    },
    // 길드 정보를 강제로 표시하기 위해 전용 Renderer 사용
    { header: "길드", className: "w-[120px]", cell: Renderers.Guild },
  ],

  // 업적 랭킹
  achievement: [
    { header: "순위", className: "w-[60px]", cell: Renderers.Rank },
    { header: "월드", className: "w-[80px]", cell: Renderers.World },
    { header: "캐릭터", className: "w-[150px]", cell: Renderers.Identity },
    {
      header: "업적 점수",
      className: "w-[100px]",
      cellClassName: "text-muted-foreground",
      cell: Renderers.MainStat,
    },
    {
      header: "등급",
      className: "w-[120px]",
      cellClassName: "font-bold",
      cell: Renderers.SubInfo,
    },
    {
      header: "대표 뱃지",
      className: "w-[120px] hidden md:table-cell",
      cell: Renderers.Badge,
    },
  ],

  // 샤레니안 랭킹
  sharenian: [
    { header: "순위", className: "w-[60px]", cell: Renderers.Rank },
    { header: "월드", className: "w-[80px]", cell: Renderers.World },
    { header: "길드", className: "w-[150px]", cell: Renderers.Identity },
    { header: "마스터", className: "w-[120px]", cell: Renderers.SubInfo },
    {
      header: "점수",
      className: "w-[120px]",
      cellClassName: "font-bold",
      cell: Renderers.MainStat,
    },
    { header: "등급", className: "w-[80px]", cell: Renderers.Grade },
  ],
};

/**
 * 랭킹 종류에 맞는 컬럼 정의. 표와 스켈레톤이 같은 폭을 보도록 조회를 한 곳에 둠.
 * 샤레니안 두 종류만 표를 공유하고, 나머지는 종류 이름이 곧 키임.
 */
export const rankingColumns = (type: RankingType): ColumnDef[] =>
  isSharenianRanking(type)
    ? RANKING_COLUMNS.sharenian
    : (RANKING_COLUMNS[type] ?? RANKING_COLUMNS.level);
