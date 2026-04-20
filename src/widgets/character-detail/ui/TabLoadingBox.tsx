interface TabLoadingBoxProps {
  className?: string;
}

export const TabLoadingBox = ({ className = "" }: TabLoadingBoxProps) => (
  <div
    className={`bg-card flex w-full items-center justify-center rounded-2xl shadow-sm ${className}`}
  >
    <p className="text-muted-foreground text-sm">정보를 불러오는 중...</p>
  </div>
);
