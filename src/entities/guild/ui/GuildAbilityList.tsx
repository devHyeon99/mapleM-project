import { groupGuildAbilities } from "../lib/groupGuildAbilities";
import type { GuildAbility } from "../model/types";
import { GuildAbilityCard } from "./GuildAbilityCard";
import { GuildEmptyState } from "./GuildEmptyState";

interface GuildAbilityListProps {
  abilities: GuildAbility[];
}

const GROUP_TITLES = ["1차", "2차", "3차", "4차", "5차", "6차", "7차", "8차"];

// 한 줄에 3칸 기준으로, 카드가 모자라면 그리드 폭도 칸 수만큼 줄인다.
// 차수 제목은 폭 제한을 받지 않고 항상 전체 너비를 쓴다.
const GROUP_GRID = ["md:w-1/3 md:grid-cols-1", "md:w-2/3 md:grid-cols-2"];

export function GuildAbilityList({ abilities }: GuildAbilityListProps) {
  if (abilities.length === 0) {
    return <GuildEmptyState message="활성화된 길드 어빌리티가 없습니다." />;
  }

  const groups = groupGuildAbilities(abilities);

  return (
    <div className="bg-card border-border ring-foreground/5 dark:ring-foreground/10 flex flex-col overflow-hidden rounded-[min(var(--radius-4xl),24px)] shadow-sm ring-1">
      {groups.map((groupAbilities, groupIndex) => {
        if (groupAbilities.length === 0) return null;

        const sizeIndex = groupAbilities.length - 1;

        return (
          <section key={groupIndex} className="flex flex-col">
            <h2 className="bg-stone-200 py-1.5 text-center text-sm font-bold md:text-base dark:bg-stone-700">
              {GROUP_TITLES[groupIndex]}
            </h2>

            <div
              className={`mx-auto grid w-full grid-cols-1 ${GROUP_GRID[sizeIndex] ?? "md:grid-cols-3"}`}
            >
              {groupAbilities.map((ability) => (
                <GuildAbilityCard key={ability.ability_no} ability={ability} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
