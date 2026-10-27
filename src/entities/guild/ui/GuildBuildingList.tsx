import type { GuildBuilding } from "../model/guild";
import { GuildBuildingCard } from "./GuildBuildingCard";
import { GuildEmptyState } from "./GuildEmptyState";

interface GuildBuildingListProps {
  buildings: GuildBuilding[];
}

export function GuildBuildingList({ buildings }: GuildBuildingListProps) {
  if (buildings.length === 0) {
    return <GuildEmptyState message="활성화된 길드 건물이 없습니다." />;
  }

  return (
    <div className="bg-card border-border divide-border ring-foreground/5 dark:ring-foreground/10 rounded-card flex flex-col divide-y overflow-hidden shadow-sm ring-1">
      {buildings.map((building) => (
        <GuildBuildingCard key={building.building_name} building={building} />
      ))}
    </div>
  );
}
