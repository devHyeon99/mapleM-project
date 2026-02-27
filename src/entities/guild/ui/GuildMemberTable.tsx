"use client";

import * as React from "react";
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
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { ArrowUpDown } from "lucide-react";
import { GuildMember } from "../model/types";
import { GuildMemberRow } from "./GuildMemberRow";

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
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          길드원 목록 ({members.length}명)
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1 shadow-sm">
              <ArrowUpDown className="size-3" />
              <span className="text-13">{sortLabels[sortBy]}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>정렬 기준</DropdownMenuLabel>
              <DropdownMenuRadioGroup
                value={sortBy}
                onValueChange={(v) => setSortBy(v as SortType)}
              >
                <DropdownMenuRadioItem className="text-13" value="activity">
                  기여도순
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem className="text-13" value="level">
                  레벨순
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem className="text-13" value="name">
                  이름순
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="overflow-hidden">
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
              <GuildMemberRow
                key={member.character_name}
                member={member}
                isMaster={member.character_name === masterName}
                worldName={worldName}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
