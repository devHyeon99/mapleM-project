interface SymbolItemProps {
  name: string;
  icon: string;
  level: number;
  option: string;
}

export const SymbolItem = ({ name, icon, level, option }: SymbolItemProps) => {
  return (
    <li className="flex items-start gap-3 py-1">
      <div className="bg-secondary/50 flex rounded border-2 p-0.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={icon}
          alt={name}
          loading="lazy"
          className="h-full w-full object-contain"
        />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold">{name}</p>
        <p className="text-xs">Lv. {level}</p>
        <p className="text-muted-foreground mt-0.5 text-xs">{option}</p>
      </div>
    </li>
  );
};
