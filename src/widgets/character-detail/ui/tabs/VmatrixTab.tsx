"use client";

import { LoadingCard } from "@/shared/ui/LoadingCard";
import { useCharacterVmatrix } from "@/entities/skill/model";
import type { CharacterVMatrix } from "@/entities/skill/model";

interface VmatrixTabProps {
  ocid: string;
}

export const VmatrixTab = ({ ocid }: VmatrixTabProps) => {
  const { data, isLoading, isError, error } = useCharacterVmatrix(ocid);

  if (isLoading) return <LoadingCard message="V매트릭스 불러오는중..." />;
  if (isError)
    return (
      <div className="p-3 text-sm text-red-500">
        오류 발생: {(error as Error).message}
      </div>
    );
  if (!data) return <div className="p-3 text-sm">데이터가 없습니다.</div>;

  const vmatrix = data as CharacterVMatrix;

  const skillCores = vmatrix.character_v_core_equipment.filter(
    (core) => core.vcore_type === "Skill",
  );
  const enhancementCores = vmatrix.character_v_core_equipment.filter(
    (core) => core.vcore_type === "Enhancement",
  );

  return (
    <div className="space-y-4 rounded-md border p-3 text-sm">
      {/* 스킬코어 섹션 */}
      <section>
        <h2 className="mb-2 border-b pb-1 text-base font-semibold">
          스킬 코어
        </h2>
        {skillCores.length > 0 ? (
          <ul className="space-y-1">
            {skillCores.map((core) => (
              <li key={core.slot_id} className="flex justify-between">
                <span>{core.vcore_name}</span>
                <span className="text-muted-foreground flex w-[155px] justify-between">
                  <span>
                    스킬레벨: {core.vcore_level.toString().padStart(2, "0")}
                  </span>
                  <span>
                    슬롯레벨: {core.slot_level.toString().padStart(2, "0")}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">등록된 스킬코어가 없습니다.</p>
        )}
      </section>

      {/* 강화코어 섹션 */}
      <section>
        <h2 className="mb-2 border-b pb-1 text-base font-semibold">
          강화 코어
        </h2>
        {enhancementCores.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {enhancementCores.map((core) => (
              <li key={core.slot_id} className="flex flex-col">
                <span className="font-medium">{core.vcore_name}</span>
                <span className="text-muted-foreground flex w-[155px] justify-between">
                  <span>
                    스킬레벨: {core.vcore_level.toString().padStart(2, "0")}
                  </span>
                  <span>
                    슬롯레벨: {core.slot_level.toString().padStart(2, "0")}
                  </span>
                </span>
                <span className="text-muted-foreground">
                  스킬 1: {core.vcore_skill_name1}
                </span>
                <span className="text-muted-foreground">
                  스킬 2: {core.vcore_skill_name2}
                </span>
                <span className="text-muted-foreground">
                  스킬 3: {core.vcore_skill_name3}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">등록된 강화코어가 없습니다.</p>
        )}
      </section>
    </div>
  );
};
