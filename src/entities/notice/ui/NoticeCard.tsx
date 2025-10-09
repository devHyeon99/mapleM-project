"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import clsx from "clsx";

export interface NoticeItem {
  id: string;
  title: string;
  date: string;
  link: string;
}

interface NoticeCardProps {
  title: string;
  moreHref: string;
  items: NoticeItem[];
}

export function NoticeCard({ title, moreHref, items }: NoticeCardProps) {
  return (
    <Card className="h-full w-full gap-2 rounded-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg font-bold">{title}</CardTitle>
        <Button
          variant="link"
          size="sm"
          asChild
          className="text-muted-foreground -mx-3 h-8 text-sm hover:text-orange-500"
        >
          <Link href={moreHref} target="_blank" rel="noopener noreferrer">
            더보기
          </Link>
        </Button>
      </CardHeader>

      <CardContent>
        <ul className="flex flex-col gap-2.5">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between"
              >
                <span
                  className={clsx(
                    "text-primary truncate text-sm font-medium md:text-base",
                    "transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-orange-500",
                  )}
                >
                  {item.title}
                </span>
                <time className="text-muted-foreground text-xs">
                  {item.date}
                </time>
              </Link>
            </li>
          ))}

          {items.length < 5 &&
            Array.from({ length: 5 - items.length }).map((_, i) => (
              <li key={`empty-${i}`} className="h-5" aria-hidden="true" />
            ))}
        </ul>
      </CardContent>
    </Card>
  );
}
