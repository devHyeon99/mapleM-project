import { Loader2 } from "lucide-react";

interface LoadingCardProps {
  message?: string;
}

export const LoadingCard = ({
  message = "불러오는 중...",
}: LoadingCardProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-md py-10">
      <Loader2 className="text-muted-foreground mb-6 size-10 animate-spin" />
      <p className="text-muted-foreground text-base font-medium">{message}</p>
    </div>
  );
};
