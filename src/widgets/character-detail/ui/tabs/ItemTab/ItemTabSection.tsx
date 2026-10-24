import type { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

interface ItemTabSectionProps {
  title: string;
  /** 제목 오른쪽 보조 문구 (적용 개수 등) */
  meta?: string;
  /** wide 그리드 뷰에서 카드 배경·그림자를 걷어내고 바깥 패널에 녹임 */
  flat?: boolean;
  children: ReactNode;
}

// 장비 탭 오른쪽 요약 영역 전용 섹션
export const ItemTabSection = ({
  title,
  meta,
  flat,
  children,
}: ItemTabSectionProps) => {
  return (
    <section
      aria-label={title}
      className={cn(
        "bg-card flex w-full flex-col gap-2.5 rounded-2xl p-4 shadow-sm",
        flat && "wide:p-0 wide:shadow-none",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-bold">{title}</h3>
        {meta && <span className="text-muted-foreground text-xs">{meta}</span>}
      </div>
      {children}
    </section>
  );
};
