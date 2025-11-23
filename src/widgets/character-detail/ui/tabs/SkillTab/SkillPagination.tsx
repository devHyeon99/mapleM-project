import type { CSSProperties } from "react";
import { Button } from "@/shared/ui/button";
import { RefreshCw } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface SkillPaginationProps {
  showBack: boolean;
  onToggle: () => void;
  containerClassName?: string;
  containerStyle?: CSSProperties;
}

export const SkillPagination = ({
  showBack,
  onToggle,
  containerClassName,
  containerStyle,
}: SkillPaginationProps) => {
  return (
    <div
      className={cn(
        "absolute flex flex-col items-center gap-2",
        containerClassName,
      )}
      style={containerStyle}
    >
      {/* 인디케이터 */}
      <div className="flex gap-1.5">
        <span
          className={cn(
            "h-2 w-2 rounded-full transition-colors",
            !showBack ? "bg-orange-500" : "bg-muted-foreground/30",
          )}
        />
        <span
          className={cn(
            "h-2 w-2 rounded-full transition-colors",
            showBack ? "bg-orange-500" : "bg-muted-foreground/30",
          )}
        />
      </div>

      <Button
        size="icon"
        variant="outline"
        onClick={onToggle}
        aria-label={showBack ? "앞면으로 전환" : "뒷면으로 전환"}
        className="h-10 w-10 rounded-full"
      >
        <RefreshCw className="size-5" />
      </Button>
    </div>
  );
};
