"use client";

import {
  formatDateKST,
  formatDateTimeKST,
  getDetailedTimeAgo,
  parseValidDate,
} from "@/shared/lib/date";

interface InfoDateRowProps {
  label: string;
  date?: string;
  withTime?: boolean;
}

export const InfoDateRow = ({ label, date, withTime }: InfoDateRowProps) => {
  if (!date) return null;

  const parsedDate = parseValidDate(date);
  if (!parsedDate) return null;

  return (
    <div className="flex gap-2">
      <dt className="text-muted-foreground font-medium">{label}</dt>
      <dd>
        <time dateTime={parsedDate.toISOString()}>
          {withTime ? formatDateTimeKST(parsedDate) : formatDateKST(parsedDate)}

          {label === "생성일" && (
            <span className="text-muted-foreground font-base ml-2 text-sm">
              ({getDetailedTimeAgo(date)})
            </span>
          )}
        </time>
      </dd>
    </div>
  );
};
