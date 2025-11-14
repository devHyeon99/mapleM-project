import { CashItemEquipment } from "@/entities/cash-item";
import { formatDateKST, parseValidDate } from "@/shared/lib/date";

interface Props {
  options: CashItemEquipment["cash_item_option"];
  date: CashItemEquipment["date_option_expire"];
  miracleAnvilItemName: CashItemEquipment["miracle_anvil_item_name"];
  miracleAnvilItemIcon: CashItemEquipment["miracle_anvil_item_icon"];
}

export const ItemCashOptions = ({
  options,
  date,
  miracleAnvilItemName,
  miracleAnvilItemIcon,
}: Props) => {
  const hasOptions = Boolean(options && options.length > 0);
  const hasMiracleAnvilName = Boolean(
    miracleAnvilItemName && miracleAnvilItemName.trim() !== "",
  );
  const hasMiracleAnvilIcon = Boolean(
    miracleAnvilItemIcon && miracleAnvilItemIcon.trim() !== "",
  );
  const hasMiracleAnvil = hasMiracleAnvilName || hasMiracleAnvilIcon;

  if (!hasOptions && !hasMiracleAnvil) {
    return null;
  }

  const parsedDate = date ? parseValidDate(date) : null;
  const isInvalidExpireDate = Boolean(
    parsedDate &&
      parsedDate.getTime() <= new Date("1970-01-01T00:00:00.000Z").getTime(),
  );
  const optionExpireText = !hasOptions
    ? null
    : !date
      ? "-"
      : isInvalidExpireDate
        ? "-"
        : parsedDate
          ? formatDateKST(parsedDate).replace(/\.$/, "").trim()
          : date;

  return (
    <div className="border-divider border-b py-1 text-sm">
      <span>아이템 옵션</span>
      <dl>
        {hasOptions &&
          options.map((opt, idx) => (
            <div
              key={`${opt.option_name}-${idx}`}
              className="grid grid-cols-[max-content_1fr] gap-x-2"
            >
              <dt className="whitespace-nowrap text-[#a1a1a1]">
                {opt.option_name}
              </dt>
              <dd
                className="text-right text-orange-400"
                aria-label={`${opt.option_name} ${opt.option_value}`}
              >
                {opt.option_value ?? "-"}
              </dd>
            </div>
          ))}
        {hasOptions && (
          <div className="grid grid-cols-[max-content_1fr] gap-x-2">
            <dt className="whitespace-nowrap text-[#a1a1a1]">유효기간</dt>
            <dd className="text-right text-orange-400">{optionExpireText}</dd>
          </div>
        )}
        {hasMiracleAnvil && (
          <div className="text-left">
            {hasMiracleAnvilName ? (
              <>
                신비의 모루에 의해{" "}
                <span className="text-orange-400">{miracleAnvilItemName}</span>
                의 외형이 합성됨
              </>
            ) : (
              <>신비의 모루에 의해 외형이 합성됨</>
            )}
          </div>
        )}
      </dl>
    </div>
  );
};
