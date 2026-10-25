"use client";

import { cn } from "@/shared/lib/utils";

interface StarIconProps {
  size?: number; // px
  className?: string;
  title?: string;
}

export const StarIcon = ({
  size = 12,
  className,
  title = "스타포스 별",
}: StarIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : "presentation"}
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M12 2.25l2.58 6.39 6.92.53-5.23 4.53 1.67 6.88L12 17.9l-5.94 2.78 1.67-6.88L2.5 9.17l6.92-.53L12 2.25z"
        fill="#FFC300"
        stroke="#C89B00"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
    </svg>
  );
};
