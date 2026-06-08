import type { CharacterStellaMemorize } from "@/entities/skill/model";
import Image from "next/image";
import { TabCard } from "@/shared/ui/TabCard";

interface StellaMemorizeCardProps {
  skills: CharacterStellaMemorize[];
}

export const StellaMemorizeCard = ({ skills }: StellaMemorizeCardProps) => {
  if (skills.length === 0) return null;

  return (
    <TabCard title="스텔라 메모라이즈">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {skills.map((skill) => (
          <div
            key={`${skill.equipment_skill_set}-${skill.skill_name}`}
            className="flex min-w-0 items-center gap-2"
          >
            <Image
              src={skill.skill_icon}
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
                {skill.equipment_skill_set}번 프리셋
              </span>
              <span className="truncate text-sm font-medium">
                {skill.skill_name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </TabCard>
  );
};
