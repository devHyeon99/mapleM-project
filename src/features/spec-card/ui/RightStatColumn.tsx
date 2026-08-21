import { Separator } from "@/shared/ui/separator";
import { MergedSpecData } from "../model/types";
import { SectionTitle } from "./SpecCardCommon";
import { InfoRow } from "@/shared/ui/InfoRow";
import { cn } from "@/shared/lib/utils";
import Image from "next/image";

/**
 * 2열 그리드에서 한 칸에 들어가는 라벨 길이 상한.
 * ponytail: 실제 렌더 폭 대신 글자 수로 판단함. 어긋나면 실측으로 바꿀 것
 */
const HYPER_STAT_HALF_WIDTH_MAX = 7;

interface RightStatColumnProps {
  data: MergedSpecData;
}

export const RightStatColumn = ({ data }: RightStatColumnProps) => {
  // 헥사 스탯
  const firstCore = data.hexa_stat_data?.hexamatrix_stat?.[0];
  const hexaStat = firstCore?.stat_info?.find(
    (info) => info.activate_flag === "1",
  );

  // 헥사 스킬
  const hexaSkills = data.hexa_skill_data?.hexamatrix_skill ?? [];

  return (
    <div className="flex h-full flex-col gap-3 text-xs">
      {/* HEXA STAT 섹션 */}
      <div>
        <SectionTitle>HEXA STAT</SectionTitle>
        <ul className="flex flex-col gap-1.5">
          <InfoRow
            as="li"
            labelClassName="shrink"
            label={hexaStat?.main_stat ?? "메인스탯"}
            className="text-xs"
          >
            {hexaStat ? `Lv.${hexaStat.main_stat_level}` : "0"}
          </InfoRow>
          <InfoRow
            as="li"
            labelClassName="shrink"
            label={hexaStat?.sub_1_stat ?? "부스탯1"}
            className="text-xs"
          >
            {hexaStat ? `Lv.${hexaStat.sub_1_stat_level}` : "0"}
          </InfoRow>
          <InfoRow
            as="li"
            labelClassName="shrink"
            label={hexaStat?.sub_2_stat ?? "부스탯2"}
            className="text-xs"
          >
            {hexaStat ? `Lv.${hexaStat.sub_2_stat_level}` : "0"}
          </InfoRow>
        </ul>
      </div>

      <Separator />

      {/* HEXA SKILL 섹션 */}
      <div>
        <SectionTitle>HEXA SKILL</SectionTitle>
        <ul className="grid w-fit grid-cols-6 gap-2">
          {hexaSkills.map((skill, i) => (
            <li key={i} className="flex flex-col items-center gap-1">
              <span className="bg-background relative flex h-8 w-8 items-center justify-center overflow-hidden rounded shadow-sm">
                <Image
                  src={skill.skill_icon}
                  alt={skill.skill_name}
                  width={32}
                  height={32}
                  className="h-full w-full object-cover"
                  unoptimized
                  style={{ imageRendering: "pixelated" }}
                />
              </span>
              <span className="text-muted-foreground text-[10px] font-semibold">
                LV.{skill.slot_level}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <Separator />

      {/* HYPER STAT 섹션 */}
      <div>
        <SectionTitle>HYPER STAT</SectionTitle>
        <ul className="grid grid-cols-2 gap-x-2 gap-y-1.5">
          {data.hyper_stat_info.map((info) => (
            <InfoRow
              key={info.stat_type}
              as="li"
              labelClassName="shrink"
              className={cn(
                "text-xs",
                // 한 칸에 안 들어가는 긴 옵션은 한 줄을 다 씀
                info.stat_type.length > HYPER_STAT_HALF_WIDTH_MAX &&
                  "col-span-2",
              )}
              label={info.stat_type}
            >
              Lv.{info.stat_level}
            </InfoRow>
          ))}
        </ul>
      </div>
    </div>
  );
};
