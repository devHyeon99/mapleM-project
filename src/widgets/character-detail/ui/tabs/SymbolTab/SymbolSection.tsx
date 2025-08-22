import { useMemo } from "react";
import { SymbolItem } from "./SymbolItem";
import { Separator } from "@/shared/ui/separator";

interface SymbolData {
  symbol_name: string;
  symbol_icon: string;
  symbol_level: number;
  symbol_option: string;
}

interface SymbolSectionProps {
  title: string;
  items: SymbolData[];
}

export const SymbolSection = ({ title, items }: SymbolSectionProps) => {
  // 포스 합산 로직
  const totalForce = useMemo(() => {
    return items.reduce((sum, s) => {
      const match = s.symbol_option.match(
        /(아케인포스|어센틱포스)\s*증가\s*([0-9]+)/,
      );
      return sum + (match ? parseInt(match[2], 10) : 0);
    }, 0);
  }, [items]);

  // 아이템이 없으면 렌더링하지 않음
  if (!items || items.length === 0) return null;

  return (
    <section className="bg-muted/20 rounded-md border p-3">
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
        {items.map((s) => (
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
