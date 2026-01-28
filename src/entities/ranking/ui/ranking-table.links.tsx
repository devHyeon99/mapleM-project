import React from "react";
import Link from "next/link";
import type { AnyRankingData } from "../model/types/ranking";
import { RankingIcon } from "./RankingIcon";

export const LinkText = ({
  href,
  onNavigate,
  children,
}: {
  href: string;
  onNavigate?: () => void;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    prefetch={false}
    onNavigate={onNavigate}
    className="text-sm font-medium underline-offset-4 hover:text-orange-500 hover:underline"
  >
    {children}
  </Link>
);

export const IconWithText = ({
  iconSrc,
  children,
}: {
  iconSrc?: string | null;
  children: React.ReactNode;
}) => (
  <div className="flex items-center justify-center gap-1.5">
    {iconSrc && (
      <RankingIcon
        src={iconSrc}
        alt="icon"
        className="bg-secondary h-5 w-5 rounded-xs dark:bg-white"
        size={20}
      />
    )}
    {children}
  </div>
);

const encodeSegment = (value: string) => encodeURIComponent(value);

export const characterHref = (world: string, name: string) =>
  `/character/${encodeSegment(world)}/${encodeSegment(name)}`;

export const guildHref = (world: string, guildName: string) =>
  `/guild/${encodeSegment(world)}/${encodeSegment(guildName)}`;

// 길드 정보 렌더링 로직 (SubInfo와 Guild 렌더러에서 공통 사용)
export const renderGuildInfo = (item: AnyRankingData) => {
  if ("guild_name" in item && item.guild_name) {
    const guildIcon = "guild_mark_icon" in item ? item.guild_mark_icon : null;
    return (
      <IconWithText iconSrc={guildIcon}>
        <LinkText href={guildHref(item.world_name, item.guild_name)}>
          {item.guild_name}
        </LinkText>
      </IconWithText>
    );
  }
  return <span className="text-muted-foreground text-xs">-</span>;
};
