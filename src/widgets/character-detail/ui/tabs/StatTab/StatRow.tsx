import { cn } from "@/shared/lib/utils";

export const StatRow = ({
  label,
  value,
  isLevel = false,
}: {
  label: string;
  value: string | number;
  isLevel?: boolean;
}) => (
  <li className="flex items-center justify-between text-sm">
    <span className="text-muted-foreground font-medium">{label}</span>
    <span
      className={cn(
        "font-semibold text-[#FF7E54]",
        isLevel && "max-w-9 min-w-9 text-right",
      )}
    >
      {value}
    </span>
  </li>
);
