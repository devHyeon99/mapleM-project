import type { CharacterStealSkill } from "@/entities/skill/model";
import Image from "next/image";
import { Separator } from "@/shared/ui/separator";

interface StealSkillCardProps {
  skills: CharacterStealSkill[];
}

const getSkillSlotLabel = (slot: string) => {
  const slotNumber = Number(slot);

  return Number.isFinite(slotNumber)
    ? `${slotNumber + 1}번 슬롯`
    : `${slot} 슬롯`;
};

export const StealSkillCard = ({ skills }: StealSkillCardProps) => {
  if (skills.length === 0) return null;

  return (
    <section className="bg-card flex w-full flex-col p-4 shadow-sm">
      <h3 className="font-bold">스틸 스킬</h3>
      <Separator className="my-2" />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {skills.map((skill) => (
          <div
            key={`${skill.skill_slot}-${skill.skill_name}`}
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
                {getSkillSlotLabel(skill.skill_slot)}
              </span>
              <span className="truncate text-sm font-medium">
                {skill.skill_name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
