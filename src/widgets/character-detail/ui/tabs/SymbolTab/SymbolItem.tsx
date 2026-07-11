import Image from "next/image";

interface SymbolItemProps {
  name: string;
  icon: string;
  level: number;
  option: string;
}

export const SymbolItem = ({ name, icon, level, option }: SymbolItemProps) => {
  return (
    <li className="flex items-start gap-3 py-1">
      <div className="bg-secondary flex h-10 w-10 shrink-0 rounded border-2 p-0.5">
        <Image
          src={icon}
          alt={name}
          width={36}
          height={36}
          loading="lazy"
          unoptimized
          className="h-full w-full object-contain"
          style={{ imageRendering: "pixelated" }}
        />
      </div>
      <div className="w-full min-w-0">
        <div className="flex flex-row justify-between">
          <p className="truncate text-sm font-semibold">{name}</p>
          <p className="text-xs font-medium text-orange-400">Lv. {level}</p>
        </div>
        <p className="text-muted-foreground mt-0.5 text-xs">{option}</p>
      </div>
    </li>
  );
};
