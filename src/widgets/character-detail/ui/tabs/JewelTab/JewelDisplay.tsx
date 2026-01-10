import Image from "next/image";
import type { JewelInfo } from "@/entities/character/model/types";

const splitJewelOption = (option: string) => {
  const trimmedOption = option.trim();
  const numericStartIndex = trimmedOption.search(/[+-]?\d/);

  if (numericStartIndex <= 0) {
    return { label: trimmedOption, value: "" };
  }

  return {
    label: trimmedOption.slice(0, numericStartIndex).trim(),
    value: trimmedOption.slice(numericStartIndex).trim(),
  };
};

export const JewelDisplay = ({ jewel }: { jewel: JewelInfo }) => {
  const { label, value } = splitJewelOption(jewel.jewel_option);

  return (
    <div className="flex h-21.5 w-24 flex-col items-center text-center text-xs">
      <div className="relative">
        <Image
          src={jewel.jewel_icon}
          alt={jewel.jewel_name}
          width={40}
          height={40}
          unoptimized
          className="h-10 w-10 object-contain"
        />
      </div>
      <p className="mt-1 font-medium">{label}</p>
      {value && <p className="ml-1.5 text-orange-400">{value}</p>}
    </div>
  );
};
