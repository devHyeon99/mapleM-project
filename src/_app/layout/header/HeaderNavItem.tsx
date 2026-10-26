"use client";

import { useState, type ReactNode } from "react";

/**
 * 드롭다운을 가진 헤더 항목 래퍼
 * 하위 링크 클릭 시 hover·focus 가 남아 메뉴가 열린 채 이동하는 문제 대응용.
 * 클릭하면 data-closed 로 메뉴를 숨기고, 포인터가 벗어나거나 다시 포커스가 들어오면 해제함.
 */
export function HeaderNavItem({ children }: { children: ReactNode }) {
  const [closed, setClosed] = useState(false);

  return (
    <div
      className="group relative"
      data-closed={closed || undefined}
      onClick={(event) => {
        if (!(event.target as Element).closest("ul a")) return;
        setClosed(true);
        (document.activeElement as HTMLElement | null)?.blur();
      }}
      onPointerLeave={() => setClosed(false)}
      onFocus={() => setClosed(false)}
    >
      {children}
    </div>
  );
}
