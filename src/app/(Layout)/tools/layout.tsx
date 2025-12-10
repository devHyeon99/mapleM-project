import { ToolsHub } from "@/widgets/tools-hub/ui/ToolsHub";
import type { ReactNode } from "react";

export default function ToolsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex w-full justify-center pb-6">
      <section className="wide:px-0 w-full max-w-[1080px]">
        <ToolsHub>{children}</ToolsHub>
      </section>
    </div>
  );
}
