"use client";

import { getDetailedTimeAgo } from "@/shared/lib/date";

interface InfoDateRowProps {
  label: string;
  date?: string;
  withTime?: boolean;
}

export const InfoDateRow = ({ label, date, withTime }: InfoDateRowProps) => {
  if (!date) return null;

  const d = new Date(date);

  return (
    <div className="flex gap-2">
      <dt className="text-muted-foreground font-medium">{label}</dt>
      <dd>
        <time dateTime={d.toISOString()}>
          {withTime ? d.toLocaleString() : d.toLocaleDateString()}

          {label === "생성일" && (
            <span className="text-muted-foreground ml-2 text-xs font-semibold">
              ({getDetailedTimeAgo(date)})
            </span>
          )}
        </time>
      </dd>
    </div>
  );
};
