import { cn } from "@/shared/lib/utils";

interface EmptyItemRowProps {
  label: string;
  className?: string;
}

export const ItemEmptyRow = ({ label, className }: EmptyItemRowProps) => {
  const displayLabel = label.replace(/\s*\(.*?\)/, "");

  return (
    <div
      className={cn(
        "flex w-full items-center gap-3 rounded-lg border-2 p-2 opacity-90",
        className,
      )}
    >
      {/* 왼쪽 아이콘 박스 */}
      <div className="bg-muted/70 flex h-12 w-12 shrink-0 items-center justify-center rounded-xs border-2">
        <span className="text-muted-foreground px-1 text-center text-xs break-keep">
          {displayLabel}
        </span>
      </div>

      {/* 오른쪽 텍스트 */}
      <div className="text-muted-foreground text-sm">
        {label ? `착용 중인 ${displayLabel} 없음` : "비어 있음"}
      </div>
    </div>
  );
};
