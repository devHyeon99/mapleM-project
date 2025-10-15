"use client";

import { NoticeCard } from "@/entities/notice/ui/NoticeCard";
import type { NoticeData } from "@/entities/notice/model/types";

interface NoticeGridProps {
  data: NoticeData;
}

export function NoticeGrid({ data }: NoticeGridProps) {
  // 넥슨 API 데이터를 NoticeCard가 요구하는 인터페이스로 변환하는 헬퍼
  const formatItems = (items: NoticeData[keyof NoticeData]) => {
    return items.map((item) => ({
      id: String(item.notice_id),
      title: item.title,
      date: item.date.split("T")[0].replace(/-/g, "."),
      link: item.url,
    }));
  };

  const SECTIONS = [
    {
      id: "notice",
      title: "공지사항",
      moreHref: "https://maplestorym.nexon.com/notice",
      items: formatItems(data.notice),
    },
    {
      id: "event",
      title: "이벤트",
      moreHref: "https://maplestorym.nexon.com/event",
      items: formatItems(data.event_notice),
    },
    {
      id: "patch",
      title: "패치노트",
      moreHref: "https://maplestorym.nexon.com/patch",
      items: formatItems(data.patch_notice),
    },
  ];

  return (
    <section className="flex w-full justify-center">
      <div className="grid w-full max-w-[1080px] grid-cols-1 gap-2 lg:grid-cols-3 lg:px-0">
        {SECTIONS.map((section) => (
          <NoticeCard
            key={section.id}
            title={section.title}
            moreHref={section.moreHref}
            items={section.items}
          />
        ))}
      </div>
    </section>
  );
}
