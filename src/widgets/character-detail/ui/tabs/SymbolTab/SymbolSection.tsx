import { useMemo } from "react";
import type { SymbolItem as CharacterSymbolItem } from "@/entities/character";
import { SymbolItem } from "./SymbolItem";
import { sumSymbolForce } from "@/shared/lib/symbol-force";
import { Separator } from "@/shared/ui/separator";

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

  // 아이템이 없으면 렌더링하지 않음
  if (safeItems.length === 0) return null;

  return (
    <section className="bg-card flex-1 p-3 shadow-sm">
      <h3 className="mb-2 flex items-center justify-between">
        <span className="font-bold">{title}</span>
        <span className="text-sm font-semibold text-[#FF7E54]">
          {title === "아케인 심볼"
            ? `아케인포스 ${totalForce.toLocaleString()}`
            : `어센틱포스 ${totalForce.toLocaleString()}`}
        </span>
      </h3>
      <Separator className="my-2" />
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
    </section>
  );
};
