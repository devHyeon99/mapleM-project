import { CashItemEquipment } from "@/entities/cash-item";
import { formatDateKST, parseValidDate } from "@/shared/lib/date";
import { ItemOptionRow } from "@/shared/ui/ItemOptionRow";

const MUTED_LABEL = "text-game-muted";
const HIGHLIGHT_VALUE = "text-orange-400";

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
    <div className="border-game-line border-b py-1 text-sm">
      <span>아이템 옵션</span>
      <dl>
        {hasOptions &&
          options.map((opt, idx) => (
            <ItemOptionRow
              key={`${opt.option_name}-${idx}`}
              label={opt.option_name}
              value={opt.option_value ?? "-"}
              labelClassName={MUTED_LABEL}
              valueClassName={HIGHLIGHT_VALUE}
              valueAriaLabel={`${opt.option_name} ${opt.option_value}`}
            />
          ))}
        {hasOptions && (
          <ItemOptionRow
            label="유효기간"
            value={optionExpireText}
            labelClassName={MUTED_LABEL}
            valueClassName={HIGHLIGHT_VALUE}
          />
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
