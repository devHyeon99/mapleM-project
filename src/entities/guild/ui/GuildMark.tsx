import Image from "next/image";

export function GuildMark({ src, name }: { src: string; name: string }) {
  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-sm border bg-white/95 shadow-sm md:ml-6">
      <Image
        src={src}
        alt={`${name} 마크`}
        width={38}
        height={38}
        unoptimized
        loading="lazy"
        className="h-9.5 w-9.5 object-contain"
      />
    </div>
  );
}
