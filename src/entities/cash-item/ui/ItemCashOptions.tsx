import { Separator } from "@/shared/ui/separator";
import { CashItemEquipment } from "@/entities/cash-item";

interface Props {
  options: CashItemEquipment["cash_item_option"];
}

export const ItemCashOptions = ({ options }: Props) => {
  if (!options || options.length === 0) {
    return null;
  }

  return (
    <>
      <p className="pt-2 text-sm">아이템 옵션</p>
      <ul className="text-sm">
        {options.map((opt, idx) => (
          <li key={idx} className="flex gap-1">
            <span>{opt.option_name}</span>
            <span
              className="text-[#FF8939]"
              aria-label={`${opt.option_name} ${opt.option_value}`}
            >
              {opt.option_value ?? "-"}
            </span>
          </li>
        ))}
      </ul>
      <Separator className="my-2" role="separator" />
    </>
  );
};
