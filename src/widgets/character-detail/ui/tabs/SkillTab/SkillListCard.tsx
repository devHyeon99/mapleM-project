import Image from "next/image";
import { stripSkillLevel } from "@/entities/skill/lib/stripSkillLevel";
import { TabCard } from "@/shared/ui/TabCard";

export interface SkillListItem {
  icon: string;
  /** 아이콘 위에 붙는 위치 설명 (슬롯 번호, 프리셋 번호 등) */
  label: string;
  /** "Lv.5 다크 사이트" 처럼 레벨이 붙어 와도 되며 표시할 때 떼어낸다 */
  name: string;
}

interface SkillListCardProps {
  title: string;
  items: SkillListItem[];
}

export const SkillListCard = ({ title, items }: SkillListCardProps) => {
  if (items.length === 0) return null;

  return (
    <TabCard title={title}>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {items.map((item) => (
          <div
            key={`${item.label}-${item.name}`}
            className="flex min-w-0 items-center gap-2"
          >
            <Image
              src={item.icon}
              alt=""
              aria-hidden="true"
              width={32}
              height={32}
              unoptimized
              className="h-8 w-8 object-contain"
              style={{ imageRendering: "pixelated" }}
            />
            <div className="flex min-w-0 flex-col">
              <span className="text-muted-foreground text-xs">
                {item.label}
              </span>
              <span className="truncate text-sm font-medium">
                {stripSkillLevel(item.name)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </TabCard>
  );
};
