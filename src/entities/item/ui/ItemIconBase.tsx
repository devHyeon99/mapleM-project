import * as React from "react";
import { CharacterItemEquipment } from "@/entities/character";
import { getGradeInfo } from "../lib";
import { POTENTIAL_GRADE_MAP } from "@/shared/config/constants/gradeMap";
import { cn } from "@/shared/lib/utils";

interface ItemIconBaseProps {
  item: CharacterItemEquipment;
  className?: string;
}

export const ItemIconBase = React.forwardRef<HTMLDivElement, ItemIconBaseProps>(
  ({ item, className, ...props }, ref) => {
    const {
      item_icon,
      item_name,
      item_grade,
      item_potential_option_grade,
      item_additional_potential_option_grade,
      starforce_upgrade,
    } = item;

    // 등급 정보
    const main = getGradeInfo(item_grade);
    const potential = getGradeInfo(
      item_potential_option_grade
        ? POTENTIAL_GRADE_MAP[item_potential_option_grade]
        : null,
    );
    const additional = getGradeInfo(
      item_additional_potential_option_grade
        ? POTENTIAL_GRADE_MAP[item_additional_potential_option_grade]
        : null,
    );

    // 스타포스
    const star = Number.parseInt(starforce_upgrade ?? "", 10);
    const showStar = Number.isFinite(star) && star > 0;

    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          "relative flex h-full w-full cursor-pointer items-center justify-center rounded-xs border-2 bg-white",
          main?.borderColor ?? "border-[#9E9E9E]",
          className,
        )}
      >
        {/* 좌상단 라벨 (잠재능력) */}
        {(potential || additional) && (
          <div className="absolute top-0 left-0 z-1 flex">
            {potential && (
              <span
                className={cn(
                  "flex h-2.5 w-2.5 items-center justify-center text-[8px] font-bold text-white md:h-3 md:w-3 md:text-[10px]",
                  potential.bgColor,
                  !additional && "rounded-br-xs",
                )}
              >
                {potential.label}
              </span>
            )}
            {additional && (
              <span
                className={cn(
                  "flex h-2.5 w-2.5 items-center justify-center rounded-br-xs text-[8px] font-bold text-white md:h-3 md:w-3 md:text-[10px]",
                  additional.bgColor,
                )}
              >
                {additional.label}
              </span>
            )}
          </div>
        )}

        {/* 우상단 스타포스 */}
        {showStar && (
          <span className="absolute top-0 right-0 z-1 flex h-2.5 w-2.5 items-center justify-center rounded-bl-xs bg-[#FFC300] text-[8px] font-semibold text-black md:h-3 md:w-3 md:text-[9px]">
            {star}
          </span>
        )}

        {/* 아이템 이미지 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item_icon}
          alt={item_name}
          loading="lazy"
          className="object-contain"
        />
      </div>
    );
  },
);

ItemIconBase.displayName = "ItemIconBase";
