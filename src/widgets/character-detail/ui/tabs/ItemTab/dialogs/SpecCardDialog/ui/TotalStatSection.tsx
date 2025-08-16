import { MAGICAL_CLASSES } from "@/shared/config/constants/magic_class";
import { SectionTitle, StatRow } from "./SpecCardCommon";
import { MergedSpecData } from "../types";

interface ItemOption {
  option_name: string | null;
  option_value: string | null;
}

interface TotalStatSectionProps {
  data: MergedSpecData;
}

export const TotalStatSection = ({ data }: TotalStatSectionProps) => {
  const items = data.item_equipment || [];
  const characterClass = data.character_class;

  // 직업 타입 판별 (마법 직업군인지 확인)
  const isMagical = MAGICAL_CLASSES.includes(characterClass);

  // 타겟 옵션 및 라벨 설정
  const damageType = isMagical ? "마법 대미지" : "물리 대미지";
  const labelType = isMagical ? "마댐" : "물댐";

  // 합산할 옵션 목록
  const TARGET_OPTIONS = [damageType, "보스 공격력"];

  const sumOptionValues = (options: ItemOption[] | undefined | null) => {
    if (!options) return 0;

    return options.reduce((acc, opt) => {
      // 옵션 이름이 유효하고, 타겟 목록에 포함되는 경우
      if (opt.option_name && TARGET_OPTIONS.includes(opt.option_name)) {
        const valueStr = (opt.option_value ?? "").replace("%", "");
        const value = parseFloat(valueStr);
        return acc + (Number.isFinite(value) ? value : 0);
      }
      return acc;
    }, 0);
  };

  // 잠재능력 총합
  const totalPotential = items.reduce((total, item) => {
    return total + sumOptionValues(item.item_potential_option);
  }, 0);

  // 에디셔널 잠재능력 총합
  const totalAdditional = items.reduce((total, item) => {
    return total + sumOptionValues(item.item_additional_potential_option);
  }, 0);

  return (
    <div className="bg-muted/50 flex flex-col rounded-lg border p-3 text-sm">
      <SectionTitle>TOTAL</SectionTitle>
      <ul className="flex flex-col gap-2 sm:grid sm:grid-cols-2">
        <StatRow
          label={`잠재 (${labelType}+보공)`}
          value={`${totalPotential.toFixed(2)}%`}
        />
        <StatRow
          label={`에디 (${labelType}+보공)`}
          value={`${totalAdditional.toFixed(2)}%`}
        />
      </ul>
    </div>
  );
};
