export const CashItemEmpty = ({ label }: { label: string }) => {
  return (
    <div className="flex w-full items-center gap-3 rounded-lg border-2 p-2 opacity-90">
      <div className="bg-muted/70 flex h-12 w-12 shrink-0 items-center justify-center rounded-xs border-2">
        <span className="text-muted-foreground px-1 text-center text-xs break-keep">
          {label.replace(/\s*\(.*?\)/, "")}
        </span>
      </div>
      <div className="text-muted-foreground text-sm">
        {label
          ? `착용 중인 ${label.replace(/\s*\(.*?\)/, "")} 없음`
          : "비어 있음"}
      </div>
    </div>
  );
};
