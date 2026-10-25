import { ReactNode } from "react";

/** 스펙 섹션 소제목 */
export const SectionTitle = ({ children }: { children: ReactNode }) => (
  <span className="text-foreground mb-2 block font-bold">{children}</span>
);
