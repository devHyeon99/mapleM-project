import { ReactNode } from "react";

/** 반복되는 스탯 한 줄 (라벨 - 값) */
export const StatRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <li className="flex w-full items-center justify-between">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium">{value}</span>
  </li>
);

/** 스펙 섹션 소제목 */
export const SectionTitle = ({ children }: { children: ReactNode }) => (
  <span className="text-foreground mb-2 block font-bold">{children}</span>
);
