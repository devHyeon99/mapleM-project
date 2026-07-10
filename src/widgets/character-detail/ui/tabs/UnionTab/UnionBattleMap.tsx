"use client";

import { useMemo, useState } from "react";
import { SegmentedToggle } from "@/shared/ui/SegmentedToggle";
import type { CharacterUnionRaider } from "@/entities/character";
import { TabCard } from "@/shared/ui/TabCard";
import { formatQueryError } from "@/shared/ui/TabMessageSection";
import { cn } from "@/shared/lib/utils";

interface UnionBattleMapProps {
  raiderData: CharacterUnionRaider | null | undefined;
  isLoading?: boolean;
  error?: Error | null;
}

/** 직업 블록. 배열 순서가 곧 범례 순서 */
const JOB_BLOCKS = [
  { type: "1", name: "전사", color: "#A42648" },
  { type: "4", name: "마법사", color: "#4593AA" },
  { type: "2", name: "궁수", color: "#6F9535" },
  { type: "3", name: "도적", color: "#6B47C9" },
  { type: "5", name: "해적", color: "#717071" },
] as const;

/** 공통 블록. 범례에는 표시하지 않으며 알 수 없는 타입의 폴백 색으로도 쓴다 */
const COMMON_BLOCK = { type: "0", color: "#94A3B8" } as const;

const BLOCK_COLORS = new Map<string, string>(
  [...JOB_BLOCKS, COMMON_BLOCK].map(({ type, color }) => [type, color]),
);

// 블록 외곽선: 같은 색 블록이 붙어 있어도 경계가 보이도록
const BLOCK_OUTLINE_COLOR = "#FFFFFFB3";

// [dx, dy, 같은 블록일 때 메우는 그림자, 다른 블록일 때 그리는 외곽선]
const CELL_SIDES = [
  [0, -1, "0 -1px", "inset 0 1px"],
  [0, 1, "0 1px", "inset 0 -1px"],
  [-1, 0, "-1px 0", "inset 1px 0"],
  [1, 0, "1px 0", "inset -1px 0"],
] as const;

/** 배치도 격자 크기. 셀 개수는 두 값에서 파생시킨다 */
const BOARD_COLS = 22;
const BOARD_ROWS = 20;
const BOARD_CELLS = BOARD_COLS * BOARD_ROWS;

const BATTLE_MAP_TITLE = "유니온 배치도";

type BlockCell = { type: string; blockIndex: number };

/**
 * 좌표 문자열 -> 블록 조회용 Map.
 * blockIndex는 인접 셀이 같은 블록인지 판별해 외곽선을 그릴 때 쓴다
 */
const buildBlockMap = (
  raiders: CharacterUnionRaider["battle_map"][number]["union_raider"],
) => {
  const blockMap = new Map<string, BlockCell>();
  raiders.forEach((block, blockIndex) => {
    block.block_position.forEach((pos) => {
      if (pos.cell_x !== null && pos.cell_y !== null) {
        blockMap.set(`${pos.cell_x},${pos.cell_y}`, {
          type: block.block_type,
          blockIndex,
        });
      }
    });
  });
  return blockMap;
};

/** 로딩·실패 안내. 배치도와 높이를 맞춰 카드 크기가 튀지 않게 한다 */
const BattleMapStatus = ({
  message,
  isError,
}: {
  message: string;
  isError?: boolean;
}) => (
  <TabCard title={BATTLE_MAP_TITLE}>
    <div
      role={isError ? "alert" : undefined}
      className={cn(
        "flex h-[388px] items-center justify-center text-sm",
        isError ? "text-destructive font-medium" : "text-muted-foreground",
      )}
    >
      {message}
    </div>
  </TabCard>
);

export const UnionBattleMap = ({
  raiderData,
  isLoading,
  error,
}: UnionBattleMapProps) => {
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);

  const sortedPresetNos = useMemo(() => {
    if (!raiderData) return [];
    return [...raiderData.battle_map]
      .sort((a, b) => a.preset_no - b.preset_no)
      .map((map) => map.preset_no);
  }, [raiderData]);

  if (isLoading) return <BattleMapStatus message="배치도 불러오는 중..." />;

  if (error !== undefined)
    return <BattleMapStatus isError message={formatQueryError(error)} />;

  if (!raiderData) return null;

  const defaultPreset =
    sortedPresetNos.find((presetNo) => presetNo === raiderData.use_preset_no) ??
    sortedPresetNos[0] ??
    1;
  const activePreset =
    selectedPreset != null && sortedPresetNos.includes(selectedPreset)
      ? selectedPreset
      : defaultPreset;

  // 선택된 프리셋 데이터 찾기
  const currentPreset = raiderData.battle_map.find(
    (map) => map.preset_no === activePreset,
  );

  if (!currentPreset) return null;

  const blockMap = buildBlockMap(currentPreset.union_raider);

  return (
    <TabCard
      title={BATTLE_MAP_TITLE}
      className="overflow-hidden"
      action={
        <SegmentedToggle
          ariaLabel={`${BATTLE_MAP_TITLE} 프리셋 선택`}
          value={activePreset}
          onChange={setSelectedPreset}
          options={sortedPresetNos.map((preset) => ({
            value: preset,
            marked: preset === raiderData.use_preset_no,
          }))}
        />
      }
    >
      {/* 보드 컨테이너: 400px 안에서 가로 칸이 모두 보이도록 설정 */}
      <div
        role="img"
        aria-label={`${BATTLE_MAP_TITLE}. 현재 선택된 프리셋 ${activePreset}`}
        className="relative mx-auto w-full max-w-[400px] border bg-[#3B424A] shadow-inner"
      >
        <div
          aria-hidden="true"
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${BOARD_COLS}, minmax(0, 1fr))`,
          }}
        >
          {Array.from({ length: BOARD_CELLS }).map((_, i) => {
            const x = i % BOARD_COLS;
            const y = Math.floor(i / BOARD_COLS);
            const cell = blockMap.get(`${x},${y}`);

            if (!cell)
              return <div key={`${x}-${y}`} className="aspect-square" />;

            const color = BLOCK_COLORS.get(cell.type) ?? COMMON_BLOCK.color;
            // 같은 블록 쪽은 색을 1px 넓혀 서브픽셀 틈을 메우고,
            // 다른 블록/빈칸 쪽에만 외곽선을 그려 블록 하나가 한 덩어리로 보이게 한다
            const boxShadow = CELL_SIDES.map(([dx, dy, fill, outline]) =>
              blockMap.get(`${x + dx},${y + dy}`)?.blockIndex ===
              cell.blockIndex
                ? `${fill} 0 0 ${color}`
                : `${outline} 0 0 ${BLOCK_OUTLINE_COLOR}`,
            ).join(", ");

            return (
              <div
                key={`${x}-${y}`}
                className="aspect-square"
                style={{ backgroundColor: color, boxShadow }}
              />
            );
          })}
        </div>

        {/* 셀 격자선: 셀마다 테두리를 주면 반올림 때문에 블록 사이가 벌어져서 오버레이로 그린다 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, #FFFFFF14 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF14 1px, transparent 1px)",
            backgroundSize: `calc(100% / ${BOARD_COLS}) calc(100% / ${BOARD_COLS})`,
          }}
        />
      </div>

      {/* 범례 */}
      <ul className="mt-2 flex flex-wrap items-center justify-center gap-x-3 text-xs opacity-80">
        {JOB_BLOCKS.map(({ type, name, color }) => (
          <li key={type} className="flex items-center gap-1">
            <div
              className="h-2 w-2 rounded-xs"
              style={{ backgroundColor: color }}
            />
            {name}
          </li>
        ))}
      </ul>
    </TabCard>
  );
};
