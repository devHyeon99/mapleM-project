"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { GuildMark } from "@/entities/guild";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { formatDateKST } from "@/shared/lib/date";
import { guildHref } from "@/shared/lib/url";
import type {
  GuildPromotionEntry,
  GuildPromotionGuildInfo,
  GuildPromotionWithMark,
} from "../model/types";

const TRIGGER_CLASS =
  "hover:bg-muted/50 focus-visible:ring-ring w-full text-left transition-colors focus-visible:ring-2 focus-visible:-outline-offset-2 focus-visible:outline-none";

/** 길드 스킬·시설물처럼 "이름 Lv.n" 만 늘어놓는 묶음 */
function EntryGroup({
  title,
  entries,
}: {
  title: string;
  entries: GuildPromotionEntry[];
}) {
  if (entries.length === 0) return null;

  return (
    <div className="space-y-1.5">
      <p className="text-muted-foreground text-xs">{title}</p>
      <ul className="flex flex-wrap gap-1.5">
        {entries.map(({ name, level }) => (
          <li key={name} className="bg-muted text-13 rounded-md px-2 py-1">
            {name} <span className="font-semibold">Lv.{level}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** 넥슨에서 가져온 길드 정보. 조회에 실패한 홍보는 이 자리를 통째로 비움 */
function GuildInfo({ guild }: { guild: GuildPromotionGuildInfo }) {
  const stats = [
    { label: "길드 레벨", value: `Lv. ${guild.level}` },
    { label: "길드 인원", value: `${guild.member_count} / 56` },
    { label: "길드마스터", value: guild.master_name },
    { label: "창설일", value: formatDateKST(guild.create_date) || "-" },
  ];

  return (
    <div className="space-y-3 rounded-lg">
      <dl className="grid grid-cols-2 gap-x-3 gap-y-2 sm:grid-cols-4">
        {stats.map(({ label, value }) => (
          <div key={label} className="flex min-w-0 flex-col gap-0.5">
            <dt className="text-muted-foreground text-xs">{label}</dt>
            <dd className="text-13 truncate font-semibold">{value}</dd>
          </div>
        ))}
      </dl>

      <EntryGroup title="길드 스킬" entries={guild.skills} />
      <EntryGroup title="길드 시설물" entries={guild.buildings} />
    </div>
  );
}

export function GuildPromotionView({
  items,
  variant,
}: {
  items: GuildPromotionWithMark[];
  variant: "card" | "board";
}) {
  const [selected, setSelected] = useState<GuildPromotionWithMark | null>(null);
  // 닫는 동안에도 selected 를 붙들어 둠. 같이 비우면 닫기 애니메이션이 빈 상자로 돎
  const [open, setOpen] = useState(false);

  const show = (item: GuildPromotionWithMark) => {
    setSelected(item);
    setOpen(true);
  };

  return (
    <>
      {variant === "card" ? (
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {items.map((item) => (
            <li key={item.id}>
              <Card size="sm" className="h-full gap-0 py-0">
                <button
                  type="button"
                  onClick={() => show(item)}
                  aria-haspopup="dialog"
                  className={`${TRIGGER_CLASS} flex h-full flex-col gap-2 p-4`}
                >
                  <div className="flex w-full min-w-0 items-center gap-2">
                    <GuildMark
                      src={item.mark_icon}
                      name={item.guild_name}
                      size="sm"
                    />
                    <span className="truncate font-semibold">
                      {item.guild_name}
                    </span>
                    <span className="text-muted-foreground ml-auto shrink-0 text-xs">
                      {item.world_name}
                    </span>
                  </div>
                  <p className="text-13 line-clamp-2 break-keep">
                    {item.headline}
                  </p>
                </button>
              </Card>
            </li>
          ))}
        </ul>
      ) : (
        <Card size="sm" className="gap-0 rounded-sm py-0 ring-0">
          <ul className="divide-border/50 divide-y">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => show(item)}
                  aria-haspopup="dialog"
                  className={`${TRIGGER_CLASS} flex items-center gap-3 px-4 py-3`}
                >
                  <GuildMark
                    src={item.mark_icon}
                    name={item.guild_name}
                    size="sm"
                  />

                  {/* 좁은 화면에서는 소개가 길드명 아래로 내려감 */}
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
                    <span className="flex min-w-0 items-baseline gap-1.5">
                      <span className="truncate font-semibold">
                        {item.guild_name}
                      </span>
                      <span className="text-muted-foreground shrink-0 text-xs">
                        {item.world_name}
                      </span>
                    </span>
                    <span className="text-13 truncate break-keep">
                      {item.headline}
                    </span>
                  </div>

                  <time
                    dateTime={item.created_at}
                    className="text-muted-foreground block shrink-0 text-xs"
                  >
                    {formatDateKST(item.created_at)}
                  </time>
                </button>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* 카드마다 다이얼로그를 두지 않고 선택된 항목 하나만 그림 */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
          {selected && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <GuildMark
                    src={selected.mark_icon}
                    name={selected.guild_name}
                    size="sm"
                  />
                  <DialogTitle>{selected.guild_name}</DialogTitle>
                </div>
                <DialogDescription>
                  {selected.world_name} 월드 ·{" "}
                  <time dateTime={selected.created_at}>
                    {formatDateKST(selected.created_at)}
                  </time>{" "}
                  등록
                </DialogDescription>
              </DialogHeader>

              {selected.guild && <GuildInfo guild={selected.guild} />}

              <div className="space-y-2 text-sm break-keep">
                <p className="font-semibold">{selected.headline}</p>
                <p className="text-muted-foreground whitespace-pre-line">
                  {selected.description}
                </p>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    닫기
                  </Button>
                </DialogClose>
                {/* 없는 길드명이 실린 홍보도 있음. 404 로 보내지 않게 조회된 것만 링크함 */}
                {selected.guild !== null && (
                  <Button asChild variant="outline">
                    <Link
                      href={guildHref(selected.world_name, selected.guild_name)}
                    >
                      길드 정보 보기
                    </Link>
                  </Button>
                )}
                {selected.contact_url && (
                  <Button asChild>
                    <a
                      href={selected.contact_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      길드 문의
                      <ExternalLink aria-hidden="true" className="size-4" />
                    </a>
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
