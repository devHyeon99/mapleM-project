import { SectionTitle } from "./SpecCardCommon";
import { MergedSpecData } from "../model/types";
import { getItemSpec } from "@/entities/item/lib/getItemSpec";
import { InfoRow } from "@/shared/ui/InfoRow";

interface TotalStatSectionProps {
  data: MergedSpecData;
}

export const TotalStatSection = ({ data }: TotalStatSectionProps) => {
  const { labelDamage, labelAtk, potential, additional, chuop } = getItemSpec(
    data.item_equipment,
    data.character_class,
  );

  return (
    <div className="bg-muted/50 flex flex-col rounded-lg border p-3 text-sm">
      <SectionTitle>TOTAL</SectionTitle>
      <ul className="flex flex-col gap-x-2 gap-y-1 sm:grid sm:grid-cols-2">
        {/* 잠재능력 합계 */}
        <InfoRow
          as="li"
          className="justify-between"
          label={`잠재 (${labelDamage}+보공)`}
        >
          {potential.toFixed(2)}%
        </InfoRow>

        {/* 에디셔널 합계 */}
        <InfoRow
          as="li"
          className="justify-between"
          label={`에디 (${labelDamage}+보공)`}
        >
          {additional.toFixed(2)}%
        </InfoRow>

        {/* 추옵 - 최종 대미지 */}
        <InfoRow as="li" className="justify-between" label="추옵 (최종 대미지)">
          {chuop.finalDamage.toFixed(2)}%
        </InfoRow>

        {/* 추옵 - 방어율 무시 */}
        <InfoRow as="li" className="justify-between" label="추옵 (방어율 무시)">
          {chuop.ignoreDef.toFixed(2)}%
        </InfoRow>

        {/* 추옵 - 공격력 */}
        <InfoRow
          as="li"
          className="justify-between"
          label={`추옵 (${labelAtk})`}
        >
          {chuop.atk.toLocaleString()}
        </InfoRow>
      </ul>
    </div>
  );
};
