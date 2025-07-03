import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface LoadingCardProps {
  message?: string;
}

export const LoadingCard = ({
  message = "불러오는 중...",
}: LoadingCardProps) => {
  return (
    <div className="flex w-full items-center justify-center">
      <Card className="flex w-full max-w-3xl flex-col items-center justify-center p-6">
        <Loader2 className="text-muted-foreground mb-4 h-8 w-8 animate-spin" />
        <p className="text-muted-foreground text-sm font-medium">{message}</p>
      </Card>
    </div>
  );
};
