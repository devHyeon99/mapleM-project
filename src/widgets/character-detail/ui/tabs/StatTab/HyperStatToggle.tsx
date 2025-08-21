import { SegmentedButton } from "@/shared/ui/SegmentedButton";

export const HyperStatPresetToggle = ({
  count,
  active,
  selected,
  onSelect,
}: {
  count: number;
  active: number;
  selected: number;
  onSelect: (n: number) => void;
}) => {
  // 프리셋이 1개 이하라면 굳이 토글을 보여주지 않음 (디자인 선택 사항, 여기서는 항상 노출)
  if (count < 1) return null;

  return (
    <div className="bg-muted inline-flex h-9 items-center justify-center gap-1 rounded-md border p-1">
      {Array.from({ length: count }, (_, i) => i + 1).map((num) => (
        <SegmentedButton
          key={num}
          isSelected={selected === num}
          onClick={() => onSelect(num)}
        >
          {num}
          {/* 현재 적용 중인 프리셋 표시 (빨간 점 등) */}
          {active === num && (
            <span className="bg-primary absolute top-1 right-1 h-1 w-1 rounded-full" />
          )}
        </SegmentedButton>
      ))}
    </div>
  );
};
