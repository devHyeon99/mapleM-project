"use client";

import { useState } from "react"; // 추가
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs"; // shadcn/ui 추가
import type { CharacterUnionRaider } from "@/entities/character";

interface UnionBattleMapProps {
  raiderData: CharacterUnionRaider | null | undefined;
}

// 블록 타입별 색상
const BLOCK_COLORS: Record<string, string> = {
  "1": "bg-[#A42648]", // 전사
  "2": "bg-[#6F9535]", // 궁수
  "3": "bg-[#6B47C9]", // 도적
  "4": "bg-[#4593AA]", // 마법사
  "5": "bg-[#717071]", // 해적
  "0": "bg-slate-400", // 공통
};

export const UnionBattleMap = ({ raiderData }: UnionBattleMapProps) => {
  // 현재 보고 있는 프리셋 상태 관리 (기본값은 실제 적용 중인 프리셋 번호)
  const [activePreset, setActivePreset] = useState<string>(
    String(raiderData?.use_preset_no || 1),
  );

  if (!raiderData) return null;

  // 선택된 프리셋 데이터 찾기
  const currentPreset = raiderData.battle_map.find(
    (map) => String(map.preset_no) === activePreset,
  );

  if (!currentPreset) return null;

  // 블록 위치 최적화 조회용 Map
  const blockMap = new Map<string, string>();
  currentPreset.union_raider.forEach((block) => {
    block.block_position.forEach((pos) => {
      if (pos.cell_x !== null && pos.cell_y !== null) {
        blockMap.set(`${pos.cell_x},${pos.cell_y}`, block.block_type);
      }
    });
  });

  return (
    <div className="flex w-full max-w-[400px] flex-col items-center overflow-hidden">
      <div className="mb-2 flex w-full items-center justify-between">
        <div className="flex flex-row gap-2">
          <span className="font-bold">유니온 배치도</span>
          <Badge className="w-fit text-xs">
            전투지도 {raiderData.use_preset_no} 적용 중
          </Badge>
        </div>

        {/* 프리셋 변경 탭 */}
        <Tabs
          value={activePreset}
          onValueChange={setActivePreset}
          className="w-auto"
        >
          <TabsList className="rounded-sm border">
            {[...raiderData.battle_map]
              .sort((a, b) => a.preset_no - b.preset_no)
              .map((map) => (
                <TabsTrigger
                  key={map.preset_no}
                  value={String(map.preset_no)}
                  className="data-[state=active]:bg-background! rounded-sm text-xs tabular-nums antialiased"
                >
                  {map.preset_no}
                </TabsTrigger>
              ))}
          </TabsList>
        </Tabs>
      </div>

      {/* 보드 컨테이너: 400px 안에서 22칸이 모두 보이도록 설정 */}
      <div className="relative w-full border bg-[#3B424A] shadow-inner">
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(22, minmax(0, 1fr))`,
          }}
        >
          {Array.from({ length: 440 }).map((_, i) => {
            const x = i % 22;
            const y = Math.floor(i / 22);
            const blockType = blockMap.get(`${x},${y}`);

            return (
              <div
                key={`${x}-${y}`}
                className={cn(
                  "aspect-square border-[0.5px] border-[#FFFFFF1A] transition-colors",
                  blockType ? BLOCK_COLORS[blockType] : "bg-transparent",
                )}
              />
            );
          })}
        </div>

        {/* 가로 중앙 가이드 라인 */}
        <div className="pointer-events-none absolute top-[50%] left-0 h-[1.5px] w-full -translate-y-1/2" />
        {/* 세로 중앙 가이드 라인 */}
        <div className="pointer-events-none absolute top-0 left-[50%] h-full w-[1.5px] -translate-x-1/2" />
      </div>

      {/* 범례 */}
      <div className="mt-2 flex flex-wrap items-center justify-center gap-x-3 text-xs opacity-80">
        {Object.entries({
          전사: "1",
          마법사: "4",
          궁수: "2",
          도적: "3",
          해적: "5",
        }).map(([name, type]) => (
          <div key={type} className="flex items-center gap-1">
            <div className={cn("h-2 w-2 rounded-xs", BLOCK_COLORS[type])} />
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};
