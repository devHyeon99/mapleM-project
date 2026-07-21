import Image from "next/image";
import { cn } from "@/shared/lib/utils";

/**
 * lg 는 길드 상세 헤더, sm 은 목록 한 줄에 들어가는 크기임.
 * 마크가 투명 배경이라 어느 쪽이든 밝은 판을 깔아야 다크 모드에서 보임
 */
const SIZES = {
  lg: { plate: "size-16 rounded-sm border shadow-sm md:ml-6", px: 38 },
  sm: { plate: "size-7 rounded-sm ring-1 ring-border/70", px: 20 },
} as const;

interface GuildMarkProps {
  src: string | null;
  name: string;
  size?: keyof typeof SIZES;
  className?: string;
}

export function GuildMark({
  src,
  name,
  size = "lg",
  className,
}: GuildMarkProps) {
  const { plate, px } = SIZES[size];

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center bg-white/95",
        plate,
        className,
      )}
    >
      {/* 마크가 없는 길드는 빈 판만 남음. 목록에서 행 정렬이 안 무너지게 하려는 것 */}
      {src && (
        <Image
          src={src}
          alt={`${name} 마크`}
          width={px}
          height={px}
          unoptimized
          loading="lazy"
          className="object-contain"
          style={{ width: px, height: px }}
        />
      )}
    </div>
  );
}
