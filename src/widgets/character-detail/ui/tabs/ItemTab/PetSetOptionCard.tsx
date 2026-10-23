import type { PetSetOption } from "@/entities/character";
import { TabCard } from "@/shared/ui/TabCard";

interface PetSetOptionCardProps {
  setOptions?: PetSetOption[];
}

export const PetSetOptionCard = ({ setOptions }: PetSetOptionCardProps) => {
  if (!setOptions?.length) {
    return null;
  }

  return (
    <TabCard title="펫 세트 효과">
      <div className="flex flex-col gap-3">
        {setOptions.map((set) => (
          <section key={set.set_name} aria-label={set.set_name}>
            <p className="font-semibold">
              {set.set_name}
              <span className="text-muted-foreground ml-1.5 text-xs font-medium md:text-[13px]">
                {set.set_count}세트
              </span>
            </p>
            {/* 옵션이 ", " 구분 문자열로 옴. "1,500" 같은 천 단위 쉼표는 공백이 없어 안 나뉨 */}
            <ul className="mt-1.5 grid gap-x-6 gap-y-1 sm:grid-cols-2">
              {set.set_option.split(", ").map((option) => (
                <li
                  key={option}
                  className="text-muted-foreground text-[13px] md:text-sm"
                >
                  {option.trim().replace(/\s+/g, " ")}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </TabCard>
  );
};
