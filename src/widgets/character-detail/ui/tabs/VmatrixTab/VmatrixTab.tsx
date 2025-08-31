"use client";

import { LoadingCard } from "@/shared/ui/LoadingCard";
import { TabMessageSection } from "@/shared/ui/TabMessageSection";
import { useCharacterVmatrix } from "@/entities/skill/model";

interface VmatrixTabProps {
  ocid: string;
  level: number;
}

const VMATRIX_MIN_LEVEL = 200;

export const VmatrixTab = ({ ocid, level }: VmatrixTabProps) => {
  const { data, isLoading, isError, error } = useCharacterVmatrix(ocid, level);

  if (level < VMATRIX_MIN_LEVEL) {
    return (
      <TabMessageSection
        message={`V매트릭스 시스템은 Lv.${VMATRIX_MIN_LEVEL}이상 이용 가능합니다.`}
      />
    );
  }

  if (isLoading) return <LoadingCard message="V매트릭스 불러오는중..." />;

  if (isError) {
    return (
      <div className="p-3 text-sm text-red-500">
        오류 발생: {(error as Error).message}
      </div>
    );
  }

  const cores = data?.character_v_core_equipment ?? [];

  if (cores.length === 0) {
    return (
      <TabMessageSection
        message={`API 업데이트 이후 접속 기록이 없거나\n장착한 V매트릭스가 없습니다.`}
      />
    );
  }

  const grouped = cores.reduce(
    (acc, core) => {
      if (core.vcore_type === "Skill") acc.skill.push(core);
      else if (core.vcore_type === "Enhancement") acc.enhancement.push(core);
      return acc;
    },
    {
      skill: [] as typeof cores,
      enhancement: [] as typeof cores,
    },
  );

  const { skill: skillCores, enhancement: enhancementCores } = grouped;

  const format2 = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="space-y-4 rounded-md border p-3 text-sm">
      <VmatrixSection title="스킬 코어">
        <CoreList
          items={skillCores}
          renderItem={(core) => (
            <div className="flex justify-between">
              <span>{core.vcore_name}</span>
              <span className="text-muted-foreground flex w-[155px] justify-between">
                <span>스킬레벨: {format2(core.vcore_level)}</span>
                <span>슬롯레벨: {format2(core.slot_level)}</span>
              </span>
            </div>
          )}
        />
      </VmatrixSection>

      <VmatrixSection title="강화 코어">
        {enhancementCores.length > 0 ? (
          <CoreList
            items={enhancementCores}
            className="flex flex-col gap-2"
            renderItem={(core) => (
              <div className="flex flex-col">
                <span className="font-medium">{core.vcore_name}</span>

                <span className="text-muted-foreground flex w-[155px] justify-between">
                  <span>스킬레벨: {format2(core.vcore_level)}</span>
                  <span>슬롯레벨: {format2(core.slot_level)}</span>
                </span>

                <div className="text-muted-foreground space-y-0.5">
                  <div>스킬 1: {core.vcore_skill_name1}</div>
                  <div>스킬 2: {core.vcore_skill_name2}</div>
                  <div>스킬 3: {core.vcore_skill_name3}</div>
                </div>
              </div>
            )}
          />
        ) : (
          <p className="text-muted-foreground">등록된 강화코어가 없습니다.</p>
        )}
      </VmatrixSection>
    </div>
  );
};

function VmatrixSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-2 border-b pb-1 text-base font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function CoreList<T extends { slot_id: string | number }>({
  items,
  renderItem,
  className,
}: {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  className?: string;
}) {
  return (
    <ul className={className ?? "space-y-1"}>
      {items.map((item) => (
        <li key={item.slot_id}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}
