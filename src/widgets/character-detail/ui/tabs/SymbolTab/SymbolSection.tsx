import { useMemo } from "react";
import type { SymbolItem as CharacterSymbolItem } from "@/entities/character";
import { SymbolItem } from "./SymbolItem";
import { sumSymbolForce, sumSymbolStats } from "@/shared/lib/symbol-force";
import { TabCard } from "@/shared/ui/TabCard";

interface SymbolSectionProps {
  title: string;
  items: CharacterSymbolItem[];
}

export const SymbolSection = ({ title, items }: SymbolSectionProps) => {
  const safeItems = useMemo(() => (Array.isArray(items) ? items : []), [items]);

  // 포스 합산 로직
  const totalForce = useMemo(() => {
    return sumSymbolForce(safeItems);
  }, [safeItems]);

  // 포스를 뺀 나머지 옵션 합산
  const totalStats = useMemo(() => sumSymbolStats(safeItems), [safeItems]);

  // 아이템이 없으면 렌더링하지 않음
  if (safeItems.length === 0) return null;

  return (
    <TabCard
      title={title}
      className="flex-1"
      titleSuffix={
        <span className="text-xs font-medium text-orange-400">
          {title === "아케인 심볼" ? "아케인포스" : "어센틱포스"}{" "}
          {totalForce.toLocaleString()}
        </span>
      }
      action={
        <div className="flex min-w-0 flex-wrap items-center justify-end gap-x-2 text-xs font-medium">
          {totalStats.map((stat) => (
            <span
              key={`${stat.name}-${stat.value}`}
              className="text-muted-foreground"
            >
              {stat.name} +{stat.value}
            </span>
          ))}
        </div>
      }
    >
      <ul className="flex flex-col gap-3">
        {safeItems.map((s) => (
          <SymbolItem
            key={`${title}-${s.symbol_name}`}
            name={s.symbol_name}
            icon={s.symbol_icon}
            level={s.symbol_level}
            option={s.symbol_option}
          />
        ))}
      </ul>
    </TabCard>
  );
};
