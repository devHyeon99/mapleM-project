export function GuildMark({ src, name }: { src: string; name: string }) {
  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-sm border bg-white/95 shadow-sm">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`${name} 마크`}
        className="h-9.5 w-9.5 object-contain"
      />
    </div>
  );
}
