import type { ReactNode } from "react";

import { ToolsTabs } from "@/features/tools-navigation";

export default function ToolsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="wide:px-0 flex w-full flex-col px-4 py-4">
      <ToolsTabs />
      {children}
    </div>
  );
}
