import type { ReactNode } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

interface BuildSummarySectionProps {
  title: string;
  children: ReactNode;
}

export function BuildSummarySection({
  title,
  children,
}: BuildSummarySectionProps) {
  return (
    <Card size="sm" className="bg-secondary flex-1">
      <CardHeader>
        <CardTitle className="text-base font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
