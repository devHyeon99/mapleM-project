import { X } from "lucide-react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Separator } from "@/shared/ui/separator";
import { parseSkillOptions } from "@/entities/skill/lib/parseSkillOptions";
import type { LinkSkillInfo } from "@/entities/skill/model";

interface LinkSkillItemProps {
  skill: LinkSkillInfo;
}

export const LinkSkillItem = ({ skill }: LinkSkillItemProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex w-full cursor-pointer items-start gap-2 rounded-md p-1 text-left"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={skill.skill_icon}
            alt={skill.skill_name}
            width={32}
            height={32}
            loading="lazy"
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
      </PopoverTrigger>

      <PopoverContent
        side="right"
        align="center"
        className="popover-center relative w-72 rounded-lg border-2 p-4 shadow-lg"
      >
        <PopoverPrimitive.Close className="absolute top-2 right-2 opacity-70 hover:opacity-100">
          <X className="h-4 w-4" />
          <span className="sr-only">닫기</span>
        </PopoverPrimitive.Close>

        {/* 팝오버 헤더 */}
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={skill.skill_icon}
            alt={skill.skill_name}
            width={32}
            height={32}
            loading="lazy"
          />
          <div>
            <h4 className="text-sm font-bold">{skill.skill_name}</h4>
            <p className="text-xs font-medium text-[#FF7E54]">
              Lv.{skill.skill_level}
            </p>
          </div>
        </div>

        <Separator className="my-2" />

        {/* 스킬 설명 */}
        <p className="text-muted-foreground text-xs whitespace-pre-line">
          {skill.skill_description}
        </p>

        <Separator className="my-2" />

        {/* 스킬 옵션 파싱 결과 */}
        <ul className="space-y-1 text-xs">
          {parseSkillOptions(skill.skill_effect).map((opt, i) => (
            <li key={i} className="flex justify-between">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {opt.name}
              </span>
              <span className="font-semibold text-[#FF7E54]">{opt.value}</span>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
