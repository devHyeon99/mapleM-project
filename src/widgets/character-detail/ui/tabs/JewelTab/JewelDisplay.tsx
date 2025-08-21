import Image from "next/image";
import { JewelInfo } from "@/entities/character";

export const JewelDisplay = ({ jewel }: { jewel: JewelInfo }) => {
  const match = jewel.jewel_option.match(/^([^\d]+)([\d.,%+]+.*)$/);
  const label = match ? match[1].trim() : jewel.jewel_option;
  const value = match ? match[2].trim() : "";

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
      {value && <p className="ml-1.5 text-[#FF7E54]">{value}</p>}
    </div>
  );
};
