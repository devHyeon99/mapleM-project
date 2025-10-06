"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "@/shared/ui/badge";
import { TableCell, TableRow } from "@/shared/ui/table";
import { GuildMember } from "../model/types";
import { WORLD_NAMES } from "@/shared/config/constants/worlds";
import { useSearchHistory } from "@/features/character-search/model";

type WorldName = (typeof WORLD_NAMES)[number];

interface GuildMemberRowProps {
  member: GuildMember;
  isMaster: boolean;
  worldName: string;
}

export function GuildMemberRow({
  member,
  isMaster,
  worldName,
}: GuildMemberRowProps) {
  const router = useRouter();
  const { addHistoryItem } = useSearchHistory();

  // 행 클릭 핸들러 (모바일/편의성)
  const handleRowClick = () => {
    addHistoryItem(member.character_name, worldName as WorldName);
    const href = `/character/${encodeURIComponent(worldName)}/${encodeURIComponent(member.character_name)}`;
    router.push(href);
  };

  return (
    <TableRow
      className="group hover:bg-muted/50 relative cursor-pointer"
      onClick={handleRowClick}
    >
      <TableCell className="py-3 font-medium">
        {/* 접근성용 Link */}
        <Link
          href={`/character/${encodeURIComponent(worldName)}/${encodeURIComponent(member.character_name)}`}
          onClick={(e) => {
            e.stopPropagation(); // 부모 Row 클릭 방지
            addHistoryItem(member.character_name, worldName as WorldName);
          }}
          className="flex min-w-0 flex-wrap items-center gap-2"
        >
          <span>{member.character_name}</span>
          {isMaster && (
            <Badge
              variant="outline"
              className="h-4 flex-shrink-0 border-amber-500 p-2 text-xs text-amber-500"
            >
              길드 마스터
            </Badge>
          )}
        </Link>
      </TableCell>
      <TableCell className="relative z-0 text-center">
        {member.character_level}
      </TableCell>
      <TableCell className="relative z-0 text-right tabular-nums">
        {member.guild_activity.toLocaleString()}
      </TableCell>
    </TableRow>
  );
}
