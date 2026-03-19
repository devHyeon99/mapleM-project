import type { ReactNode } from "react";

import { ToolsTabs } from "@/features/tools-navigation";

export default function ToolsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full flex-col pb-6">
      <ToolsTabs />
      {children}
    </div>
  );
}
