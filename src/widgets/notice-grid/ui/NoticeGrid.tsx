import { NoticeCard } from "@/entities/notice/ui/NoticeCard";
import type { NoticeData } from "@/entities/notice/model/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

interface NoticeGridProps {
  data: NoticeData | null;
  error: string | null;
}

export function NoticeGrid({ data, error }: NoticeGridProps) {
  if (error || !data) {
    return (
      <Card className="w-full gap-2 rounded-xs border-none">
        <CardHeader>
          <CardTitle className="text-lg font-bold">공지사항</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            {error ?? "넥슨 공지사항을 불러오는 중 오류가 발생했습니다."}
          </p>
        </CardContent>
      </Card>
    );
  }

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
      moreHref: "https://maplestorym.nexon.com/1198/board/1211/list",
      items: formatItems(data.notice),
    },
    {
      id: "event",
      title: "이벤트",
      moreHref: "https://maplestorym.nexon.com/1198/board/1378/list",
      items: formatItems(data.event_notice),
    },
    {
      id: "patch",
      title: "패치노트",
      moreHref: "https://maplestorym.nexon.com/1198/board/1215/list",
      items: formatItems(data.patch_notice),
    },
  ];

  return (
    <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-3">
      {SECTIONS.map((section) => (
        <NoticeCard
          key={section.id}
          title={section.title}
          moreHref={section.moreHref}
          items={section.items}
        />
      ))}
    </div>
  );
}
