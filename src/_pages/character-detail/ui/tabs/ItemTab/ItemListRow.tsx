import { Star } from "lucide-react";
import {
  OPTION_KEYS,
  parseItemOption,
  type CharacterItemEquipment,
  type ItemOption,
} from "@/entities/item";
import { ItemDialog } from "../../item-dialog";
import { cn } from "@/shared/lib/utils";

interface ItemListRowProps {
  item: CharacterItemEquipment;
  isLast?: boolean;
  isMagical: boolean;
}

// 요약 대상 능력치의 약어·단위
const STAT_LABELS: Record<string, { label: string; unit: string }> = {
  [OPTION_KEYS.PHYSICAL_ATTACK]: { label: "물공", unit: "" },
  [OPTION_KEYS.MAGICAL_ATTACK]: { label: "마공", unit: "" },
  [OPTION_KEYS.PHYSICAL_DAMAGE]: { label: "물댐", unit: "%" },
  [OPTION_KEYS.MAGICAL_DAMAGE]: { label: "마댐", unit: "%" },
  [OPTION_KEYS.FINAL_DAMAGE]: { label: "최종", unit: "%" },
  [OPTION_KEYS.BOSS_DAMAGE]: { label: "보공", unit: "%" },
  [OPTION_KEYS.IGNORE_DEFENSE]: { label: "방무", unit: "%" },
};

const OPTION_SECTIONS = [
  {
    key: "item_potential_option",
    label: "잠재",
    className: "text-blue-500 dark:text-blue-400",
  },
  {
    key: "item_additional_potential_option",
    label: "에디",
    className: "text-purple-500 dark:text-purple-400",
  },
  {
    key: "item_additional_option",
    label: "추옵",
    className: "text-green-600 dark:text-green-400",
  },
] as const;

// 대상 능력치만 합산해 "보공 30%, 방무 40%" 형태로 요약
const getSummary = (options: ItemOption[] | null, targets: string[]) => {
  const totals = new Map<string, number>();

  options?.forEach((opt) => {
    const { normalizedName, numericValue } = parseItemOption(
      opt.option_name,
      opt.option_value,
    );
    if (targets.includes(normalizedName)) {
      totals.set(
        normalizedName,
        (totals.get(normalizedName) ?? 0) + numericValue,
      );
    }
  });

  return targets
    .flatMap((name): string[] => {
      const value = totals.get(name);
      if (!value || value <= 0) return [];
      const { label, unit } = STAT_LABELS[name];
      return [`${label} ${parseFloat(value.toFixed(2))}${unit}`];
    })
    .join(", ");
};

export const ItemListRow = ({
  item,
  isLast = false,
  isMagical,
}: ItemListRowProps) => {
  const targets = [
    isMagical ? OPTION_KEYS.MAGICAL_ATTACK : OPTION_KEYS.PHYSICAL_ATTACK,
    isMagical ? OPTION_KEYS.MAGICAL_DAMAGE : OPTION_KEYS.PHYSICAL_DAMAGE,
    OPTION_KEYS.FINAL_DAMAGE,
    OPTION_KEYS.BOSS_DAMAGE,
    OPTION_KEYS.IGNORE_DEFENSE,
  ];

  // 스타포스
  const starforce =
    item.starforce_upgrade && parseInt(item.starforce_upgrade, 10) > 0
      ? item.starforce_upgrade
      : null;

  return (
    <div
      className={cn(
        "bg-card hover:bg-accent/50 flex w-full items-center gap-3 p-4 transition-colors",
        !isLast && "border-b",
      )}
    >
      <div className="h-14 w-14 shrink-0 self-start">
        <ItemDialog item={item} className="h-full w-full cursor-pointer" />
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

        <div className="flex flex-col gap-2 md:flex-row">
          {OPTION_SECTIONS.map(({ key, label, className }) => {
            const summary = getSummary(item[key], targets);
            if (!summary) return null;

            return (
              <p key={key} className="text-muted-foreground truncate text-xs">
                <span
                  className={cn(
                    "inline-block min-w-[24px] font-semibold",
                    className,
                  )}
                >
                  {label}
                </span>
                <span className="text-foreground/70 font-medium">
                  {summary}
                </span>
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};
