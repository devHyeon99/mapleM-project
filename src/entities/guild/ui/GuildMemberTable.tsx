"use client";

import * as React from "react";
import Link from "next/link"; // Link 추가
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { ArrowUpDown } from "lucide-react";
import { GuildMember } from "../model/types";

interface GuildMemberTableProps {
  members: GuildMember[];
  masterName: string;
  worldName: string;
}

type SortType = "name" | "level" | "activity";

export function GuildMemberTable({
  members,
  masterName,
  worldName,
}: GuildMemberTableProps) {
  const [sortBy, setSortBy] = React.useState<SortType>("activity");

  const sortedMembers = React.useMemo(() => {
    const list = [...members];
    return list.sort((a, b) => {
      if (sortBy === "name")
        return a.character_name.localeCompare(b.character_name);
      if (sortBy === "level") return b.character_level - a.character_level;
      if (sortBy === "activity") return b.guild_activity - a.guild_activity;
      return 0;
    });
  }, [members, sortBy]);

  const sortLabels: Record<SortType, string> = {
    name: "이름순",
    level: "레벨순",
    activity: "기여도순",
  };

  return (
    <div className="space-y-4">
      <div className="absolute top-5.5 right-6 flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <ArrowUpDown className="size-3" />
              <span className="text-xs">{sortLabels[sortBy]}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>정렬 기준</DropdownMenuLabel>
              <DropdownMenuRadioGroup
                value={sortBy}
                onValueChange={(v) => setSortBy(v as SortType)}
              >
                <DropdownMenuRadioItem value="activity">
                  기여도순
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="level">
                  레벨순
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="name">
                  이름순
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="overflow-hidden rounded-md">
        <Table className="table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/3 text-left">이름</TableHead>
              <TableHead className="w-1/3 text-center">레벨</TableHead>
              <TableHead className="w-1/3 text-right">기여도</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedMembers.map((member) => (
              /* asChild를 사용하여 Link가 Row의 역할을 하거나, Row 자체에 클릭 이벤트를 줄 수 있지만
                 shadcn UI Table과 Next.js Link의 가장 안정적인 조합은 
                 TableRow에 cursor-pointer를 주고 내부의 첫 Cell에서 전체 영역 Link를 잡는 것입니다. */
              <TableRow
                key={member.character_name}
                className="group relative cursor-pointer" // 클릭 가능함을 알리는 커서 추가
              >
                <TableCell className="py-3 font-medium">
                  {/* 전체 Row를 덮는 절대 위치 Link */}
                  <Link
                    href={`/character/${encodeURIComponent(worldName)}/${encodeURIComponent(member.character_name)}`}
                    className="absolute inset-0 z-10"
                    aria-label={`${member.character_name} 상세 정보 보기`}
                  />
                  <div className="flex min-w-0 items-center gap-2">
                    <span>{member.character_name}</span>
                    {member.character_name === masterName && (
                      <Badge
                        variant="outline"
                        className="h-4 flex-shrink-0 border-amber-500 p-2 text-xs text-amber-500"
                      >
                        길드 마스터
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="relative z-0 text-center">
                  {member.character_level}
                </TableCell>
                <TableCell className="relative z-0 text-right tabular-nums">
                  {member.guild_activity.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
