import Image from "next/image";
import { Separator } from "@/shared/ui/separator";
import { StickyFooterDialog } from "@/shared/ui/StickyFooterDialog";
import { parseSkillOptions } from "@/entities/skill/lib/parseSkillOptions";
import type { LinkSkillInfo } from "@/entities/skill/model";

interface LinkSkillItemProps {
  skill: LinkSkillInfo;
}

export const LinkSkillItem = ({ skill }: LinkSkillItemProps) => {
  return (
    <StickyFooterDialog
      title="링크 스킬 설명"
      description={`${skill.skill_name} 링크 스킬 상세 정보`}
      contentClassName="w-[22rem] max-w-[calc(100%-2rem)] border-2"
      bodyClassName="space-y-2"
      trigger={
        <button
          type="button"
          className="flex w-full cursor-pointer items-start gap-2 rounded-md p-1 text-left"
        >
          <Image
            src={skill.skill_icon}
            alt={skill.skill_name}
            width={32}
            height={32}
          />
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-xs font-semibold">
              {skill.skill_name}
            </span>
            <span className="text-xs font-medium text-[#FF7E54]">
              Lv.{skill.skill_level}
            </span>
          </div>
        </button>
      }
    >
      <div className="flex items-center gap-2">
        <Image
          src={skill.skill_icon}
          alt={skill.skill_name}
          width={32}
          height={32}
        />
        <div>
          <h4 className="text-sm font-bold">{skill.skill_name}</h4>
          <p className="text-xs font-medium text-[#FF7E54]">
            Lv.{skill.skill_level}
          </p>
        </div>
      </div>

      <Separator className="my-2" />

      <p className="text-muted-foreground text-xs whitespace-pre-line">
        {skill.skill_description}
      </p>

      <Separator className="my-2" />

      <ul className="space-y-1 text-xs">
        {parseSkillOptions(skill.skill_effect).map((opt, i) => (
          <li
            key={`${opt.name}-${opt.value}-${i}`}
            className="flex justify-between"
          >
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {opt.name}
            </span>
            <span className="font-semibold text-[#FF7E54]">{opt.value}</span>
          </li>
        ))}
      </ul>
    </StickyFooterDialog>
  );
};
