import Image from "next/image";
import type { CharacterUnion, UnionRanking } from "@/entities/character";
import { InfoDescriptionRow } from "@/shared/ui/InfoRow";
import { Separator } from "@/shared/ui/separator";

interface UnionCardProps {
  data:
    | Pick<CharacterUnion, "union_grade" | "union_level" | "union_grade_icon">
    | null
    | undefined;
  ranking: UnionRanking | null | undefined;
  title?: string;
}

export const UnionCard = ({
  data,
  ranking,
  title = "유니온 정보",
}: UnionCardProps) => {
  // 데이터 자체가 없거나 넥슨 API에서 모든 필드가 null로 올 경우 렌더링하지 않음
  if (!data || data.union_level === null) {
    return null;
  }

  const { union_level, union_grade, union_grade_icon } = data;

  return (
    <section className="bg-card w-full rounded-xs p-4 shadow-sm">
      <h2 className="font-bold">{title}</h2>

      <Separator className="my-2" />

      <div className="flex items-center justify-between gap-4">
        <dl className="flex flex-1 flex-col gap-1">
          <InfoDescriptionRow as="div" label="유니온 등급" className="gap-2">
            {union_grade ?? "-"}
          </InfoDescriptionRow>

          <InfoDescriptionRow as="div" label="유니온 레벨" className="gap-2">
            {union_level.toLocaleString()}
          </InfoDescriptionRow>

          <InfoDescriptionRow as="div" label="전체 랭킹" className="gap-2">
            {ranking?.ranking ? `${ranking.ranking.toLocaleString()}위` : "-"}
          </InfoDescriptionRow>

          <InfoDescriptionRow as="div" label="월드 랭킹" className="gap-2">
            {ranking?.world_ranking
              ? `${ranking.world_ranking.toLocaleString()}위`
              : "-"}
          </InfoDescriptionRow>
        </dl>
        {union_grade_icon && (
          <Image
            src={union_grade_icon}
            alt={`${union_grade} 아이콘`}
            width={100}
            height={100}
            className="h-25 w-25 shrink-0 self-center object-contain"
            unoptimized
          />
        )}
      </div>
    </section>
  );
};
