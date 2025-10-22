"use client";

import Image from "next/image";
import { cn } from "@/shared/lib/utils";

interface RankingIconProps {
  src?: string | null;
  alt: string;
  className?: string;
  size?: number;
}

export const RankingIcon = ({
  src,
  alt,
  className,
  size = 16,
}: RankingIconProps) => {
  if (!src) return null;

  return (
    <div
      className={cn("relative shrink-0", className)}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        unoptimized
        className="object-contain"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
        }}
      />
    </div>
  );
};
