import * as React from "react";
import { CharacterItemEquipment } from "@/entities/item";
import { getGradeInfo } from "../lib";
import { POTENTIAL_GRADE_MAP } from "@/shared/config/constants/gradeMap";
import { cn } from "@/shared/lib/utils";

interface ItemIconBaseProps {
  item: CharacterItemEquipment;
  className?: string;
}

// 문장 레벨에 따른 이미지 번호 반환 헬퍼 함수
const getEmblemImgNumber = (level: number) => {
  if (level >= 1 && level <= 3) return 1;
  if (level === 4) return 2;
  if (level >= 5 && level <= 6) return 3;
  if (level >= 7 && level <= 8) return 4;
  if (level === 9) return 5;
  if (level === 10) return 6;
  return null; // 범위 밖이거나 0일 때
};

export const ItemIconBase = React.forwardRef<HTMLDivElement, ItemIconBaseProps>(
  ({ item, className, ...props }, ref) => {
    const {
      item_icon,
      item_name,
      item_grade,
      item_potential_option_grade,
      item_additional_potential_option_grade,
      starforce_upgrade,
      emblem_info,
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

    // 문장 배경 이미지 로직
    let backgroundImage = "none";
    if (emblem_info?.emblem_level) {
      const imgNum = getEmblemImgNumber(emblem_info.emblem_level);
      if (imgNum) {
        backgroundImage = `url('/emblem/${imgNum}.jpeg')`;
      }
    }

    // 테두리 색상 로직
    // 문장이 있으면 'border-amber-300', 없으면 기존 등급 색상(main.borderColor) 사용
    const borderColor = emblem_info
      ? "border-amber-300"
      : (main?.borderColor ?? "border-[#9E9E9E]");

    // 아이템 (Unknown) 으로 나올경우 이미지 깨짐 방지 처리
    const safeIcon =
      item_icon && item_icon.trim() !== "" && item_icon !== "(Unknown)"
        ? item_icon
        : "/images/item-placeholder.png";

    return (
      <div
        ref={ref}
        {...props}
        style={{
          backgroundImage: backgroundImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className={cn(
          "@container",
          "relative flex aspect-square h-full w-full cursor-pointer items-center justify-center rounded-xs border-2",
          !emblem_info && "bg-white",
          borderColor,
          className,
        )}
      >
        {/* 좌상단 라벨 (잠재능력) */}
        {(potential || additional) && (
          <div className="absolute top-0 left-0 flex -translate-x-0.5 -translate-y-0.5 gap-0">
            {potential && (
              <span
                className={cn(
                  "flex items-center justify-center rounded-tl-xs font-bold text-white antialiased",
                  "h-3 w-3 text-[9px]",
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
                  "flex items-center justify-center rounded-br-xs font-semibold text-white antialiased",
                  "h-3 w-3 text-[9px]",
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
          <span
            className={cn(
              "absolute -top-0.5 -right-0.5 z-1 flex items-center justify-center rounded-tr-xs rounded-bl-xs bg-[#FFC300] font-semibold text-black antialiased",
              "h-3 w-3 text-[9px]",
            )}
          >
            {star}
          </span>
        )}

        {/* 아이템 이미지 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={safeIcon}
          alt={item_name && item_name !== "(Unknown)" ? item_name : "아이템"}
          loading="lazy"
          className="object-contain"
          style={{ imageRendering: "pixelated" }}
        />
      </div>
    );
  },
);

ItemIconBase.displayName = "ItemIconBase";
