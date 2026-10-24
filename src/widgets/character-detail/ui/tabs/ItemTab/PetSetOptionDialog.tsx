import type { ReactNode } from "react";
import type { PetSetOption } from "@/entities/character";
import { StickyFooterDialog } from "@/shared/ui/StickyFooterDialog";

interface PetSetOptionDialogProps {
  set: PetSetOption;
  trigger: ReactNode;
}

// 끝 토큰이 수치("1,500", "5%")면 능력치명·값으로 분리, 아니면 문장 그대로 표기
const OPTION_VALUE_PATTERN = /^(.+)\s([+-]?[\d,.]+%?)$/;

const parseOptions = (setOption: string) =>
  // 옵션이 ", " 구분 문자열로 옴. "1,500" 같은 천 단위 쉼표는 공백이 없어 안 나뉨
  setOption.split(", ").map((option) => {
    const text = option.trim().replace(/\s+/g, " ");
    const match = text.match(OPTION_VALUE_PATTERN);
    return match ? { label: match[1], value: match[2] } : { label: text };
  });

export const PetSetOptionDialog = ({
  set,
  trigger,
}: PetSetOptionDialogProps) => {
  const options = parseOptions(set.set_option);

  return (
    <StickyFooterDialog
      trigger={trigger}
      title={`${set.set_name} 세트 효과`}
      description={`${set.set_name} ${set.set_count}세트 착용 시 적용되는 능력치입니다.`}
      contentClassName="sm:max-w-sm"
      showScrollAffordance
      header={
        <>
          <header className="border-b pb-3">
            <p className="text-lg font-bold">{set.set_name}</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5 text-xs font-medium">
              <span className="rounded-md bg-orange-500/15 px-2 py-0.5 text-orange-500">
                {set.set_count}세트 착용
              </span>
            </div>
          </header>
          <p className="text-muted-foreground pt-3 text-xs font-semibold">
            세트 능력치
          </p>
        </>
      }
    >
      <section aria-label="세트 능력치">
        <dl className="flex flex-col gap-2">
          {options.map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center justify-between gap-3 text-[13px] md:text-sm"
            >
              <dt className="text-muted-foreground">{label}</dt>
              {value && <dd className="shrink-0 font-semibold">{value}</dd>}
            </div>
          ))}
        </dl>
      </section>
    </StickyFooterDialog>
  );
};
