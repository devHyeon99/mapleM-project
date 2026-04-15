import {
  formatDateKST,
  formatDateTimeKST,
  getDetailedTimeAgo,
  parseValidDate,
} from "@/shared/lib/date";
import { InfoDescriptionRow } from "./InfoRow";

interface InfoDateRowProps {
  label: string;
  date?: string;
  /**
   * 시:분:초까지 표시 여부
   * @default false
   */
  withTime?: boolean;
  /**
   * 날짜 뒤에 경과 시간("N년 N개월 N일 전") 표시 여부
   * @default false
   */
  withTimeAgo?: boolean;
}

export const InfoDateRow = ({
  label,
  date,
  withTime,
  withTimeAgo,
}: InfoDateRowProps) => {
  if (!date) return null;

  const parsedDate = parseValidDate(date);
  if (!parsedDate) return null;

  return (
    <InfoDescriptionRow
      label={label}
      labelClassName="font-medium"
      valueClassName="font-normal"
    >
      <time dateTime={parsedDate.toISOString()}>
        {withTime ? formatDateTimeKST(parsedDate) : formatDateKST(parsedDate)}
      </time>

      {withTimeAgo && (
        <span className="text-muted-foreground ml-2">
          ({getDetailedTimeAgo(parsedDate)})
        </span>
      )}
    </InfoDescriptionRow>
  );
};
