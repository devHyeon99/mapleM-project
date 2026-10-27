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
      <div className="bg-secondary rounded-icon flex h-10 w-10 shrink-0 border-2 p-0.5">
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
          <p className="text-body truncate font-semibold">{name}</p>
          <p className="text-caption font-medium text-orange-400">
            Lv. {level}
          </p>
        </div>
        <p className="text-muted-foreground text-caption mt-0.5">{option}</p>
      </div>
    </li>
  );
};
