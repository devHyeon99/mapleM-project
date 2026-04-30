import * as React from "react";
import { CharacterItemEquipment } from "../model/types";
import { getGradeInfo } from "../lib";
import { ItemIconFrame } from "@/shared/ui/ItemIconFrame";
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

const BADGE_SIZE = "wide:h-3.5 wide:w-3.5 wide:text-[10px] h-3 w-3 text-[9px]";
const BADGE_BASE =
  "flex items-center justify-center subpixel-antialiased leading-none";

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

    // 등급 정보 (getGradeInfo가 숫자 잠재등급과 한글 등급명을 모두 처리)
    const main = getGradeInfo(item_grade);
    const potential = getGradeInfo(item_potential_option_grade);
    const additional = getGradeInfo(item_additional_potential_option_grade);

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

    return (
      <ItemIconFrame
        ref={ref}
        {...props}
        icon={item_icon}
        name={item_name}
        style={{
          backgroundImage: backgroundImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className={cn(!emblem_info && "bg-white", borderColor, className)}
      >
        {/* 좌상단 라벨 (잠재능력) */}
        {(potential || additional) && (
          <div className="absolute -top-0.5 -left-0.5 flex gap-0">
            {potential && (
              <span
                className={cn(
                  BADGE_BASE,
                  BADGE_SIZE,
                  "rounded-tl-xs font-bold text-white",
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
                  BADGE_BASE,
                  BADGE_SIZE,
                  "rounded-br-xs font-bold text-white",
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
              BADGE_BASE,
              BADGE_SIZE,
              "absolute -top-0.5 -right-0.5 z-1 rounded-tr-xs rounded-bl-xs bg-[#FFC300] font-semibold text-black tabular-nums",
            )}
          >
            {star}
          </span>
        )}
      </ItemIconFrame>
    );
  },
);

ItemIconBase.displayName = "ItemIconBase";
