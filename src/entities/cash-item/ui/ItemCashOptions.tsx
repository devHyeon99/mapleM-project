import { CashItemEquipment } from "@/entities/cash-item";

interface Props {
  options: CashItemEquipment["cash_item_option"];
}

export const ItemCashOptions = ({ options }: Props) => {
  if (!options || options.length === 0) {
    return null;
  }

  return (
    <div className="border-divider border-b py-1 text-sm">
      <span>아이템 옵션</span>
      <dl>
        {options.map((opt, idx) => (
          <div
            key={`${opt.option_name}-${idx}`}
            className="grid grid-cols-[max-content_1fr] gap-x-2"
          >
            <dt className="whitespace-nowrap text-[#a1a1a1]">
              {opt.option_name}
            </dt>
            <dd
              className="text-right text-orange-400 tabular-nums"
              aria-label={`${opt.option_name} ${opt.option_value}`}
            >
              {opt.option_value ?? "-"}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
