import { AlertTriangle } from "lucide-react";

import { cn } from "@/shared/lib/utils";

interface NotFoundMessageProps {
  /** 무엇을 못 찾았는지. 이 블록의 제목이 된다 */
  title: string;
  /** 사용자가 입력한 대상(캐릭터명, 월드+캐릭터명 등). 없으면 렌더하지 않음 */
  subject?: string;
  /** 줄바꿈은 개행 문자로 넣는다 */
  description: string;
  className?: string;
}

export const NotFoundMessage = ({
  title,
  subject,
  description,
  className,
}: NotFoundMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center text-center",
        className,
      )}
    >
      <AlertTriangle className="text-destructive mb-2 size-12" />
      <h2 className="text-title">{title}</h2>
      {subject && <p className="text-heading mt-2 font-semibold">{subject}</p>}
      <p className="text-muted-foreground text-body mt-2 whitespace-pre-line">
        {description}
      </p>
    </div>
  );
};
