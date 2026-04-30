import { ItemOption } from "../model/types";
import { getGradeInfo } from "../lib";
import { ItemOptionRow } from "@/shared/ui/ItemOptionRow";
import { cn } from "@/shared/lib/utils";

interface ItemOptionSectionProps {
  title: string;
  options: ItemOption[] | undefined;
  /** 등급 문자열 (숫자 잠재등급 / 한글 등급명 모두 가능) */
  grade?: string | null;
  /** 제목 앞에 등급 뱃지를 표시. 끄면 등급 색을 옵션 줄에 입힌다 */
  withGradeBadge?: boolean;
  labelClassName?: string;
  valueClassName?: string;
}

/** 아이템 옵션/추가옵션/잠재능력처럼 "제목 + 옵션 목록" 구조를 공유하는 섹션 */
export const ItemOptionSection = ({
  title,
  options,
  grade,
  withGradeBadge = false,
  labelClassName,
  valueClassName,
}: ItemOptionSectionProps) => {
  if (!Array.isArray(options) || options.length === 0) {
    return null;
  }

  const gradeInfo = getGradeInfo(grade);

  return (
    <div className="border-divider border-b py-1 text-sm">
      {withGradeBadge ? (
        <div className="flex items-center gap-1">
          <span
            className={cn(
              "h-3.5 rounded-tl-xs rounded-br-xs px-1 text-[10px] font-bold text-white",
              gradeInfo?.bgColor,
            )}
          >
            {gradeInfo?.label}
          </span>
          <p className={gradeInfo?.textColor}>{title}</p>
        </div>
      ) : (
        <span className="font-medium">{title}</span>
      )}

      <dl>
        {options.map((opt) => (
          <ItemOptionRow
            key={opt.option_no}
            label={opt.option_name}
            value={opt.option_value}
            className={withGradeBadge ? undefined : gradeInfo?.textColor}
            labelClassName={labelClassName}
            valueClassName={valueClassName}
          />
        ))}
      </dl>
    </div>
  );
};
