import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

interface ToolComingSoonCardProps {
  title: string;
  description: string;
}

export function ToolComingSoonCard({
  title,
  description,
}: ToolComingSoonCardProps) {
  return (
    <Card className="bg-secondary/30 border-dashed">
      <CardHeader className="space-y-1">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">준비 중입니다.</p>
      </CardContent>
    </Card>
  );
}
