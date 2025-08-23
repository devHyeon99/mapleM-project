import { Button } from "@/shared/ui/button";
import { RefreshCw } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface SkillPaginationProps {
  showBack: boolean;
  onToggle: () => void;
}

export const SkillPagination = ({
  showBack,
  onToggle,
}: SkillPaginationProps) => {
  return (
    <div className="absolute right-0 bottom-0 flex flex-col items-center gap-2">
      {/* 인디케이터 */}
      <div className="flex gap-1.5">
        <span
          className={cn(
            "h-2 w-2 rounded-full transition-colors",
            !showBack ? "bg-primary" : "bg-muted-foreground/30",
          )}
        />
        <span
          className={cn(
            "h-2 w-2 rounded-full transition-colors",
            showBack ? "bg-primary" : "bg-muted-foreground/30",
          )}
        />
      </div>

      <Button
        size="icon"
        variant="outline"
        onClick={onToggle}
        className="hover:bg-muted h-10 w-10 rounded-full"
      >
        <RefreshCw className="size-5" />
      </Button>
    </div>
  );
};
