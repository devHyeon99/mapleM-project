"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCharacterLinkSkill } from "@/hooks/useCharacterLinkSkill";
import { mergeLinkSkills } from "@/utils/mergeLinkSkills";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { parseSkillOptions } from "@/utils/parseSkillOptions";
import { X } from "lucide-react";
import { LoadingCard } from "@/components/common/LoadingCard";

interface LinkSkillTabProps {
  ocid: string;
}

export const LinkSkillTab = ({ ocid }: LinkSkillTabProps) => {
  const { data, isLoading, isError } = useCharacterLinkSkill(ocid);

  if (isLoading) return <LoadingCard message="링크 스킬 정보 불러오는중..." />;
  if (isError) return <p>데이터를 불러오는 중 오류가 발생했습니다.</p>;
  if (!data || data?.link_skill.length === 0)
    return (
      <section className="rounded-md border p-3">
        <p className="text-muted-foreground text-sm whitespace-pre-line">
          2025.09.18 API 업데이트 이후 접속 하지 않았거나, 장착한 링크스킬이
          없습니다.
        </p>
      </section>
    );

  const defaultPreset = data.use_prest_no.toString();

  const mergedData = {
    ...data,
    link_skill: data.link_skill.map((preset) => ({
      ...preset,
      link_skill_info: mergeLinkSkills(preset.link_skill_info),
    })),
  };

  return (
    <div className="rounded-md border p-3">
      <Tabs defaultValue={defaultPreset} className="w-full">
        {/* 프리셋 탭 목록 */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold">링크스킬</h3>
            <p className="text-muted-foreground text-xs font-semibold">
              현재 장착중인 링크 스킬 프리셋 : {defaultPreset}
            </p>
          </div>
          <TabsList className="rounded-sm border">
            {mergedData.link_skill.map((preset) => (
              <TabsTrigger
                className="w-7 rounded-sm"
                key={preset.preset_no}
                value={preset.preset_no.toString()}
              >
                {preset.preset_no}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <Separator className="my-2" />

        {/* 각 프리셋의 스킬 리스트 */}
        {mergedData.link_skill.map((preset) => (
          <TabsContent
            key={preset.preset_no}
            value={preset.preset_no.toString()}
          >
            <div className="grid grid-cols-2 gap-2">
              {preset.link_skill_info.map((skill) => (
                <Popover key={skill.skill_name}>
                  <PopoverTrigger asChild>
                    <Card className="cursor-pointer border-none p-0 shadow-none">
                      <CardContent className="flex items-start gap-3 p-0">
                        <Image
                          src={skill.skill_icon}
                          alt={skill.skill_name}
                          width={32}
                          height={32}
                          className="rounded"
                          unoptimized
                        />
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold whitespace-nowrap">
                            {skill.skill_name}
                          </span>
                          <span className="text-xs font-medium text-[#FF7E54]">
                            Lv.{skill.skill_level}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </PopoverTrigger>
                  <PopoverContent
                    side="right"
                    align="center"
                    className="popover-center bg-popover/98 relative w-72 rounded-lg border-2 p-4 shadow-lg"
                  >
                    <PopoverPrimitive.Close className="absolute top-2 right-2 opacity-70 hover:opacity-100">
                      <X className="h-5 w-5" />
                    </PopoverPrimitive.Close>

                    <div className="flex items-center gap-2">
                      <Image
                        src={skill.skill_icon}
                        alt={skill.skill_name}
                        width={32}
                        height={32}
                        className="rounded"
                        unoptimized
                      />
                      <div>
                        <h4 className="text-sm font-bold">
                          {skill.skill_name}
                        </h4>
                        <p className="text-xs font-medium text-[#FF7E54]">
                          Lv.{skill.skill_level}
                        </p>
                      </div>
                    </div>

                    <Separator className="my-2" />

                    <p className="text-xs whitespace-pre-line">
                      {skill.skill_description}
                    </p>

                    <Separator className="my-2" />

                    <ul className="space-y-1 text-xs">
                      {parseSkillOptions(skill.skill_effect).map((opt, i) => (
                        <li key={i} className="flex justify-between">
                          <span className="font-medium">{opt.name}</span>
                          <span className="text-[#FF7E54]">{opt.value}</span>
                        </li>
                      ))}
                    </ul>
                  </PopoverContent>
                </Popover>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
