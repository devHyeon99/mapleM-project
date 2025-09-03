import { CharacterItemEquipment, ItemOption } from "@/entities/character";
import { ItemPopover } from "@/widgets/item-popover";
import { Star } from "lucide-react";

interface ItemRowProps {
  item: CharacterItemEquipment;
  mainDamageType: string;
  mainAtkType: string;
}

export const ItemRow = ({
  item,
  mainDamageType,
  mainAtkType,
}: ItemRowProps) => {
  const TARGET_STATS = [
    mainAtkType,
    mainDamageType,
    "최종 대미지",
    "보스 공격력",
    "방어율 무시",
  ];

  const getSummaryFromOptions = (options: ItemOption[]) => {
    const statsMap: Record<string, number> = {};

    options.forEach((opt) => {
      if (opt.option_name && TARGET_STATS.includes(opt.option_name)) {
        const value =
          opt.option_value != null
            ? parseFloat(opt.option_value.replace(/[^0-9.]/g, ""))
            : NaN;
        if (!isNaN(value)) {
          statsMap[opt.option_name] = (statsMap[opt.option_name] || 0) + value;
        }
      }
    });

    const summaryList = TARGET_STATS.map((statName) => {
      const value = statsMap[statName];
      if (value && value > 0) {
        const displayValue = Number.isInteger(value)
          ? value
          : parseFloat(value.toFixed(2));

        let displayName = statName;
        let unit = "%";

        if (statName === "보스 공격력") displayName = "보공";
        else if (statName === "최종 대미지") displayName = "최종";
        else if (statName === "방어율 무시") displayName = "방무";
        else if (statName === "물리 대미지") displayName = "물댐";
        else if (statName === "마법 대미지") displayName = "마댐";
        else if (statName === "물리 공격력") {
          displayName = "물공";
          unit = "";
        } else if (statName === "마법 공격력") {
          displayName = "마공";
          unit = "";
        }

        return `${displayName} ${displayValue}${unit}`;
      }
      return null;
    }).filter(Boolean);

    return summaryList.join(", ");
  };

  // 잠재 (잠재 + 에디셔널)
  const potentialOptions = [
    ...(item.item_potential_option ?? []),
    ...(item.item_additional_potential_option ?? []),
  ];
  const potentialSummary = getSummaryFromOptions(potentialOptions);

  // 추가옵션
  const additionalOptions = item.item_additional_option ?? [];
  const additionalSummary = getSummaryFromOptions(additionalOptions);

  // 스타포스
  const starforce =
    item.starforce_upgrade && parseInt(item.starforce_upgrade, 10) > 0
      ? item.starforce_upgrade
      : null;

  return (
    <div className="bg-card hover:bg-accent/50 flex w-full items-center gap-3 rounded-md border-2 p-2 shadow-sm transition-colors">
      <div className="h-12.5 w-12.5 shrink-0">
        <ItemPopover item={item} className="h-full w-full cursor-pointer" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5">
        <div className="mb-0.5 flex items-center justify-between">
          <span className="truncate text-base leading-none font-semibold">
            {item.item_name}
          </span>
          {starforce && (
            <div className="flex items-center gap-0.5 rounded bg-yellow-500/20 px-1.5 py-0.5 text-xs font-bold text-yellow-600 dark:text-yellow-400">
              <Star className="size-3 fill-current" />
              <span>{starforce}</span>
            </div>
          )}
        </div>

        <div className="flex flex-row gap-2">
          {/* 잠재능력 */}
          {potentialSummary && (
            <p className="text-muted-foreground truncate text-xs">
              <span className="inline-block min-w-[24px] font-bold text-blue-500 dark:text-blue-400">
                잠재
              </span>
              <span className="text-foreground/80 font-semibold">
                {potentialSummary}
              </span>
            </p>
          )}

          {/* 추가옵션 */}
          {additionalSummary && (
            <p className="text-muted-foreground truncate text-xs">
              <span className="inline-block min-w-[24px] font-bold text-green-600 dark:text-green-400">
                추옵
              </span>
              <span className="text-foreground/80 font-semibold">
                {additionalSummary}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
