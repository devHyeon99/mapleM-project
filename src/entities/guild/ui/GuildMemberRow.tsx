"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "@/shared/ui/badge";
import { TableCell, TableRow } from "@/shared/ui/table";
import { GuildMember } from "../model/types";
import { WORLD_NAMES } from "@/shared/config/constants/worlds";
import { useRecentSearch } from "@/shared/lib/hooks/useRecentSearch";
import { ShieldCheck } from "lucide-react";

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
  const { addHistory } = useRecentSearch("character-search-history");

  // 행 클릭 핸들러 (모바일/편의성)
  const handleRowClick = () => {
    addHistory(member.character_name, worldName as WorldName);
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
          prefetch={false}
          onClick={(e) => {
            e.stopPropagation(); // 부모 Row 클릭 방지
            addHistory(member.character_name, worldName as WorldName);
          }}
          className="flex min-w-0 items-center gap-1"
        >
          <span>{member.character_name}</span>
          {isMaster && (
            <ShieldCheck aria-hidden="true" className="size-4 text-amber-500" />
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
