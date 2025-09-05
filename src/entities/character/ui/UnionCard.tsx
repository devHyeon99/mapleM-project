import type { CharacterUnion, UnionRanking } from "@/entities/character";
import { InfoRow } from "@/shared/ui/InfoRow";
import { Separator } from "@/shared/ui/separator";
import { cn } from "@/shared/lib/utils";

interface UnionCardProps {
  data:
    | Pick<CharacterUnion, "union_grade" | "union_level" | "union_grade_icon">
    | null
    | undefined;
  ranking: UnionRanking | null | undefined;
  title?: string;
  className?: string;
}

export const UnionCard = ({
  data,
  ranking,
  title = "유니온 정보",
  className,
}: UnionCardProps) => {
  // 데이터 자체가 없거나 넥슨 API에서 모든 필드가 null로 올 경우 렌더링하지 않음
  if (!data || data.union_level === null) {
    return null;
  }

  const { union_level, union_grade, union_grade_icon } = data;

  return (
    <section className={cn("w-full rounded-md border p-3", className)}>
      <h2 className="text-sm font-bold">{title}</h2>
      <Separator className="my-2" />

      <div className="flex flex-row items-center gap-2">
        {union_grade_icon && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={union_grade_icon}
            alt={`${union_grade} 아이콘`}
            className="h-25 w-25 shrink-0 object-contain"
          />
        )}

        <dl className="flex flex-1 flex-col gap-1">
          <InfoRow as="div" variant="between" label="유니온 등급">
            {union_grade ?? "-"}
          </InfoRow>

          <InfoRow as="div" variant="between" label="유니온 레벨">
            {union_level.toLocaleString()}
          </InfoRow>

          <InfoRow as="div" variant="between" label="전체 랭킹">
            {ranking?.ranking ? `${ranking.ranking.toLocaleString()}위` : "-"}
          </InfoRow>

          <InfoRow as="div" variant="between" label="월드 랭킹">
            {ranking?.world_ranking
              ? `${ranking.world_ranking.toLocaleString()}위`
              : "-"}
          </InfoRow>
        </dl>
      </div>
    </section>
  );
};
