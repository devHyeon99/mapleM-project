import * as React from "react";
import Image from "next/image";
import { cn } from "@/shared/lib/utils";

interface ItemIconFrameProps extends React.ComponentPropsWithoutRef<"div"> {
  icon?: string | null;
  name?: string | null;
}

/**
 * 아이템 아이콘 공통 프레임
 * children으로 등급/스타포스 같은 오버레이를 얹는다.
 */
export const ItemIconFrame = React.forwardRef<
  HTMLDivElement,
  ItemIconFrameProps
>(({ icon, name, className, children, ...props }, ref) => {
  // 아이템이 (Unknown) 으로 나올 경우 이미지 깨짐 방지 처리
  const safeIcon =
    icon && icon.trim() !== "" && icon !== "(Unknown)"
      ? icon
      : "/images/item-placeholder.png";
  const safeName = name && name !== "(Unknown)" ? name : "아이템";

  return (
    <div
      ref={ref}
      {...props}
      className={cn(
        "relative flex aspect-square h-full w-full cursor-pointer items-center justify-center rounded-xs border-2",
        className,
      )}
    >
      {children}

      <Image
        src={safeIcon}
        alt={safeName}
        width={1}
        height={1}
        loading="lazy"
        unoptimized
        className="max-h-full max-w-full object-contain"
        style={{ width: "auto", height: "auto", imageRendering: "pixelated" }}
      />
    </div>
  );
});

ItemIconFrame.displayName = "ItemIconFrame";
