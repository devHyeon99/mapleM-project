"use client";

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
        </time>
      </dd>
    </div>
  );
};
