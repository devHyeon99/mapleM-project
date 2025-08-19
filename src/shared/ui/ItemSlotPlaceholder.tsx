import { cn } from "@/shared/lib/utils";

interface ItemSlotPlaceholderProps {
  label: string;
  className?: string;
}

export const ItemSlotPlaceholder = ({
  label,
  className,
}: ItemSlotPlaceholderProps) => {
  return (
    <div
      className={cn(
        "border-border bg-muted/20 flex aspect-square w-full items-center justify-center rounded-xs border-2 text-center",
        className,
      )}
      title={`${label} 슬롯 (비어있음)`}
    >
      <span className="text-muted-foreground text-[10px] leading-tight font-semibold select-none sm:text-xs">
        {label.replace(/\s*\(.*?\)/, "")}
      </span>
    </div>
  );
};
