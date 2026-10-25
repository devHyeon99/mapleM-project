import { RefreshCw } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

interface SkillPaginationProps {
  showBack: boolean;
  onToggle: () => void;
  className?: string;
}

export const SkillPagination = ({
  showBack,
  onToggle,
  className,
}: SkillPaginationProps) => {
  return (
    <div className={cn("flex shrink-0 flex-col items-center gap-2", className)}>
      <Button
        size="icon"
        variant="outline"
        onClick={onToggle}
        aria-label={showBack ? "앞면으로 전환" : "뒷면으로 전환"}
        className="h-10 w-10 touch-manipulation rounded-full active:bg-black/10 dark:active:bg-white/15"
      >
        <RefreshCw className="size-5" />
      </Button>

      <div className="flex gap-1.5">
        {[false, true].map((back) => (
          <span
            key={String(back)}
            className={cn(
              "h-2 w-2 rounded-full transition-colors",
              showBack === back ? "bg-orange-500" : "bg-muted-foreground/30",
            )}
          />
        ))}
      </div>
    </div>
  );
};
