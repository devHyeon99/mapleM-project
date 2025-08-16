import { Separator } from "@/shared/ui/separator";
import { MergedSpecData } from "../types";
import { SectionTitle, StatRow } from "./SpecCardCommon";

interface RightStatColumnProps {
  data: MergedSpecData;
}

export const RightStatColumn = ({ data }: RightStatColumnProps) => {
  // 스타포스 총합 계산
  const totalStarforce =
    data.item_equipment?.reduce((acc, item) => {
      // 값이 null이거나 없으면 "0"으로 처리 후 정수 변환
      const starStr = item.starforce_upgrade ?? "0";
      const star = parseInt(starStr, 10);

      // NaN이 아닐 경우에만 더함
      return acc + (Number.isFinite(star) ? star : 0);
    }, 0) ?? 0;

  // 아케인 포스 합산
  const totalArcaneForce =
    data.symbol_data?.arcane_symbol?.reduce((acc, symbol) => {
      const match = symbol.symbol_option.match(/아케인포스 증가 (\d+)/);
      const forceValue = match ? parseInt(match[1], 10) : 0;
      return acc + forceValue;
    }, 0) ?? 0;

  // 어센틱 포스 합산
  const totalAuthenticForce =
    data.symbol_data?.authentic_symbol?.reduce((acc, symbol) => {
      const match = symbol.symbol_option.match(/어센틱포스 증가 (\d+)/);
      const forceValue = match ? parseInt(match[1], 10) : 0;
      return acc + forceValue;
    }, 0) ?? 0;

  // 헥사 스탯
  const firstCore = data.hexa_stat_data?.hexamatrix_stat?.[0];
  const hexaStat = firstCore?.stat_info?.find(
    (info) => info.activate_flag === "1",
  );

  // 헥사 스킬 (데이터가 없으면 빈 배열)
  const hexaSkills = data.hexa_skill_data?.hexamatrix_skill ?? [];

  return (
    <div className="bg-muted/50 flex h-full flex-col rounded-lg border p-3 text-sm">
      {/* FORCE */}
      <SectionTitle>FORCE</SectionTitle>
      <ul className="flex flex-col gap-1.5">
        <StatRow label="스타포스" value={totalStarforce} />
        <StatRow label="아케인 포스" value={`${totalArcaneForce}`} />
        <StatRow label="어센틱 포스" value={`${totalAuthenticForce}`} />
      </ul>

      <Separator className="my-3" />

      {/* HEXA STAT */}
      <SectionTitle>HEXA STAT</SectionTitle>
      <ul className="flex flex-col gap-1.5">
        <StatRow
          label={hexaStat?.main_stat ?? "메인스탯"}
          value={hexaStat ? `Lv.${hexaStat.main_stat_level}` : "0"}
        />
        <StatRow
          label={hexaStat?.sub_1_stat ?? "부스탯1"}
          value={hexaStat ? `Lv.${hexaStat.sub_1_stat_level}` : "0"}
        />
        <StatRow
          label={hexaStat?.sub_2_stat ?? "부스탯2"}
          value={hexaStat ? `Lv.${hexaStat.sub_2_stat_level}` : "0"}
        />
      </ul>

      <Separator className="my-3" />

      {/* HEXA SKILL */}
      <SectionTitle>HEXA SKILL</SectionTitle>
      <ul className="grid grid-cols-6 gap-2 sm:grid-cols-5">
        {Array.from({ length: 6 }).map((_, i) => {
          const skill = hexaSkills[i];

          return (
            <li key={i} className="flex flex-col items-center gap-1">
              <span className="bg-background relative flex h-8 w-8 items-center justify-center overflow-hidden rounded shadow-sm">
                {skill ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={skill.skill_icon}
                    alt={skill.skill_name}
                    width={32}
                    height={32}
                    className="h-full w-full"
                    style={{ imageRendering: "pixelated" }}
                  />
                ) : (
                  // 스킬 없을 때 (빈 칸)
                  <span className="bg-muted/20 h-full w-full border"></span>
                )}
              </span>
              <span className="text-muted-foreground text-[10px] font-semibold">
                {skill ? `LV.${skill.slot_level}` : ""}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
