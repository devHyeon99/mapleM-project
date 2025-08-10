import * as React from "react";
import { CharacterItemEquipment } from "@/shared/model/types/nexon-models";
import { getGradeInfo } from "../lib";
import { POTENTIAL_GRADE_MAP } from "@/shared/config/constants/gradeMap";
import { cn } from "@/shared/lib/utils";

interface ItemIconBaseProps {
  item: CharacterItemEquipment;
  size?: number;
  className?: string; // className을 받을 수 있도록 추가
}

export const ItemIconBase = React.forwardRef<HTMLDivElement, ItemIconBaseProps>(
  ({ item, size = 46, className, ...props }, ref) => {
    // ref와 ...props를 받습니다.
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
        ref={ref} // 전달받은 ref를 div에 연결
        {...props} // 전달받은 나머지 props(onClick 등)를 div에 적용
        style={{ width: size, height: size }}
        className={cn(
          "relative flex cursor-pointer items-center justify-center rounded-xs border-2 bg-white",
          main?.borderColor ?? "border-[#9E9E9E]",
          className,
        )}
      >
        {/* 좌상단 라벨 */}
        {(potential || additional) && (
          <div className="absolute top-0 left-0 flex">
            {potential && (
              <span
                className={cn(
                  "flex h-2.5 w-2.5 items-center justify-center text-[8px] font-extrabold text-white",
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
                  "flex h-2.5 w-2.5 items-center justify-center rounded-br-xs text-[8px] font-extrabold text-white",
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
          <span className="absolute top-0 right-0 flex h-2.5 w-2.5 items-center justify-center rounded-bl-xs bg-[#FFC300] text-[8px] font-semibold text-black">
            {star}
          </span>
        )}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item_icon}
          alt={item_name}
          width={40}
          height={40}
          loading="lazy"
          className="h-auto w-auto"
        />
      </div>
    );
  },
);

ItemIconBase.displayName = "ItemIconBase"; // 디버깅을 위한 displayName 설정
