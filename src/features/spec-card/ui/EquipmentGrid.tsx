import Image from "next/image";
import {
  getItemSpec,
  ItemIconBase,
  type SortedItemSlot,
} from "@/entities/item";
import { ItemEmptySlot } from "@/shared/ui/ItemEmptySlot";
import { Badge } from "@/shared/ui/badge";
import { InfoRow } from "@/shared/ui/InfoRow";
import { sumSymbolForce } from "@/shared/lib/symbol-force";
import type { MergedSpecData } from "../model/types";

const COLUMN_COUNT = 7;

/** 1행 빈 칸(1행 × 3~4열)에는 포스 정보를 씀 */
const FORCE_ROW = 0;
const FORCE_COLUMN_START = 2;
const FORCE_COLUMN_END = 3;

const isForceCell = (index: number): boolean => {
  const row = Math.floor(index / COLUMN_COUNT);
  const column = index % COLUMN_COUNT;

  return (
    row === FORCE_ROW &&
    column >= FORCE_COLUMN_START &&
    column <= FORCE_COLUMN_END
  );
};

/** 장비창 가운데 빈 칸(2~4행 × 3~5열)을 캐릭터 외형 자리로 씀 */
const AVATAR_ROW_START = 1;
const AVATAR_ROW_END = 3;
const AVATAR_COLUMN_START = 2;
const AVATAR_COLUMN_END = 4;

const isAvatarCell = (index: number): boolean => {
  const row = Math.floor(index / COLUMN_COUNT);
  const column = index % COLUMN_COUNT;

  return (
    row >= AVATAR_ROW_START &&
    row <= AVATAR_ROW_END &&
    column >= AVATAR_COLUMN_START &&
    column <= AVATAR_COLUMN_END
  );
};

interface EquipmentGridProps {
  items: SortedItemSlot[];
  data: MergedSpecData;
}

export const EquipmentGrid = ({ items, data }: EquipmentGridProps) => {
  // 스타포스 총합
  const totalStarforce =
    data.item_equipment?.reduce((acc, item) => {
      const star = parseInt(item.starforce_upgrade ?? "0", 10);
      return acc + (Number.isFinite(star) ? star : 0);
    }, 0) ?? 0;

  const totalArcaneForce = sumSymbolForce(data.symbol_data?.arcane_symbol);
  const totalAuthenticForce = sumSymbolForce(
    data.symbol_data?.authentic_symbol,
  );

  const { labelDamage, labelAtk, potential, additional, chuop } = getItemSpec(
    data.item_equipment,
    data.character_class,
  );

  return (
    <div className="grid grid-cols-7 gap-1">
      {/* 명시 배치라 자동 배치되는 슬롯들이 이 영역들을 알아서 비켜감 */}
      <ul className="col-span-2 col-start-3 row-start-1 flex flex-col gap-1 px-1">
        <InfoRow as="li" className="text-xs" label="스타포스">
          {totalStarforce}
        </InfoRow>
        <InfoRow as="li" className="text-xs" label="아케인 포스">
          {totalArcaneForce}
        </InfoRow>
        <InfoRow as="li" className="text-xs" label="어센틱 포스">
          {totalAuthenticForce}
        </InfoRow>
      </ul>

      <div className="col-span-3 col-start-3 row-span-3 row-start-2 flex flex-col items-center justify-center gap-1">
        <Image
          src={data.character_image}
          alt="캐릭터 외형"
          aria-hidden="true"
          width={128}
          height={128}
          unoptimized
          className="max-w-full -scale-x-100 transform"
          style={{ imageRendering: "pixelated" }}
        />
        <Badge className="text-center leading-tight font-semibold">
          Lv.{data.character_level} {data.character_name}
        </Badge>

        <div className="flex flex-col items-center gap-0.5">
          <div className="flex gap-2">
            <InfoRow label="직업" className="text-xs">
              {data.character_class}
            </InfoRow>
            <InfoRow label="월드" className="text-xs">
              {data.world_name}
            </InfoRow>
          </div>
          <InfoRow label="유니온" className="text-xs">
            {data.union_data?.union_level?.toLocaleString() ?? "0"}
          </InfoRow>
          <InfoRow label="길드" className="text-xs">
            {data.guild_name ?? "-"}
          </InfoRow>
        </div>
      </div>

      {items.map((slot, index) => {
        // 명시 배치 블록이 덮는 칸은 그리지 않음
        if (!slot.slotName && (isAvatarCell(index) || isForceCell(index))) {
          return null;
        }

        // 슬롯 이름이 빈 문자열이면 배치용 여백
        if (!slot.slotName) {
          return (
            <div
              key={`spacer-${index}`}
              className="aspect-square"
              aria-hidden="true"
            />
          );
        }

        // 캡처용 카드라 클릭 다이얼로그 없이 아이콘만 렌더함
        if (slot.item) {
          return (
            <div key={`item-${index}`} className="aspect-square">
              <ItemIconBase
                item={slot.item}
                className="h-full w-full cursor-auto"
              />
            </div>
          );
        }

        return <ItemEmptySlot key={`empty-${index}`} label={slot.slotName} />;
      })}

      {/* 마지막 줄 안드로이드·하트 옆 여백 */}
      <ul className="col-span-5 col-start-3 row-start-6 grid grid-cols-2 content-start gap-x-2 gap-y-1 p-1">
        <InfoRow
          as="li"
          variant="between"
          className="text-xs"
          label={`잠재 (${labelDamage}+보공)`}
        >
          {potential.toFixed(2)}%
        </InfoRow>
        <InfoRow
          as="li"
          variant="between"
          className="text-xs"
          label={`에디 (${labelDamage}+보공)`}
        >
          {additional.toFixed(2)}%
        </InfoRow>
        <InfoRow
          as="li"
          variant="between"
          className="text-xs"
          label="추옵 (최종 대미지)"
        >
          {chuop.finalDamage.toFixed(2)}%
        </InfoRow>
        <InfoRow
          as="li"
          variant="between"
          className="text-xs"
          label={`추옵 (${labelAtk})`}
        >
          {chuop.atk.toLocaleString()}
        </InfoRow>
      </ul>
    </div>
  );
};
