"use client";

import { useMemo, useState } from "react";
import { SegmentedToggle } from "@/shared/ui/SegmentedToggle";
import type { CharacterUnionRaider } from "@/entities/character";
import { TabCard } from "@/shared/ui/TabCard";
import { formatQueryError } from "@/shared/ui/TabMessageSection";

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

  if (isLoading) {
    return (
      <TabCard title="유니온 배치도">
        <div className="text-muted-foreground flex h-88 items-center justify-center text-sm">
          배치도 불러오는 중...
        </div>
      </TabCard>
    );
  }

  if (error !== undefined) {
    return (
      <TabCard title="유니온 배치도">
        <div
          role="alert"
          className="text-destructive flex h-88 items-center justify-center text-sm font-medium"
        >
          {formatQueryError(error)}
        </div>
      </TabCard>
    );
  }

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

  // 블록 위치 최적화 조회용 Map (블록별 식별자를 함께 담아 테두리 계산에 사용)
  const blockMap = new Map<string, { type: string; id: number }>();
  currentPreset.union_raider.forEach((block, id) => {
    block.block_position.forEach((pos) => {
      if (pos.cell_x !== null && pos.cell_y !== null) {
        blockMap.set(`${pos.cell_x},${pos.cell_y}`, { type: block.block_type, id });
      }
    });
  });

  return (
    <TabCard
      title="유니온 배치도"
      className="overflow-hidden"
      action={
        <SegmentedToggle
          ariaLabel="유니온 배치도 프리셋 선택"
          value={activePreset}
          onChange={setSelectedPreset}
          options={sortedPresetNos.map((preset) => ({
            value: preset,
            marked: preset === raiderData.use_preset_no,
          }))}
        />
      }
    >
      {/* 보드 컨테이너: 400px 안에서 22칸이 모두 보이도록 설정 */}
      <div
        role="img"
        aria-label={`유니온 배치도. 현재 선택된 프리셋 ${activePreset}`}
        className="relative mx-auto w-full max-w-[400px] border bg-[#3B424A] shadow-inner"
      >
        <div
          aria-hidden="true"
          className="grid"
          style={{
            gridTemplateColumns: `repeat(22, minmax(0, 1fr))`,
          }}
        >
          {Array.from({ length: 440 }).map((_, i) => {
            const x = i % 22;
            const y = Math.floor(i / 22);
            const cell = blockMap.get(`${x},${y}`);

            if (!cell) return <div key={`${x}-${y}`} className="aspect-square" />;

            const color = BLOCK_COLORS.get(cell.type) ?? COMMON_BLOCK.color;
            // 같은 블록 쪽은 색을 1px 넓혀 서브픽셀 틈을 메우고,
            // 다른 블록/빈칸 쪽에만 외곽선을 그려 블록 하나가 한 덩어리로 보이게 한다
            const boxShadow = CELL_SIDES.map(([dx, dy, fill, outline]) =>
              blockMap.get(`${x + dx},${y + dy}`)?.id === cell.id
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
            backgroundSize: "calc(100% / 22) calc(100% / 22)",
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
