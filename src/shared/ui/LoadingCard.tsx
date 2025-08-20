import { Card } from "@/shared/ui/card";
import { Loader2 } from "lucide-react";

interface LoadingCardProps {
  message?: string;
}

export const LoadingCard = ({
  message = "불러오는 중...",
}: LoadingCardProps) => {
  return (
    <Card className="bg-card/50 flex min-h-91.5 w-full max-w-3xl flex-col items-center justify-center rounded-md p-6">
      <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
      <p className="text-muted-foreground text-sm font-medium">{message}</p>
    </Card>
  );
};
