import { Badge } from "@/shared/ui/badge";
import { Card, CardContent } from "@/shared/ui/card";
import type { GuildBuilding } from "../model/types";

interface GuildBuildingCardProps {
  building: GuildBuilding;
}

const BUILDING_DESCRIPTIONS: Record<string, string> = {
  도서관: "도서관 레벨이 오르면 길드 시설물 최대 레벨이 증가합니다.",
  캠프파이어:
    "매일 한 번씩 정해진 시간 동안 캠프파이어의 온기 버프를 받을 수 있습니다.",
  단풍나무: "매일 정해진 횟수만큼 단풍나무의 축복 버프를 받을 수 있습니다.",
  "길드 회계사":
    "지난주 개인 길드 활동량에 비례해 매주 1회 GP를 받을 수 있습니다.",
  "길드 요리사":
    "다양한 효과를 주는 요리를 주문하여 길드원들과 공유할 수 있습니다.",
};

export function GuildBuildingCard({ building }: GuildBuildingCardProps) {
  const description = BUILDING_DESCRIPTIONS[building.building_name];

  return (
    <Card>
      <CardContent className="flex h-full items-center px-4">
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold md:text-base">
              {building.building_name}
            </span>
            <Badge className="h-4 w-11.5 px-1.5 text-xs font-bold md:h-5">
              Lv. {building.building_level}
            </Badge>
          </div>
          {description && (
            <p className="text-muted-foreground text-xs leading-snug md:text-sm">
              {description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
