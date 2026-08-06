import Link from "next/link";

import { Button } from "@/shared/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

/** 시뮬레이터 세 곳이 같은 문장을 쓰므로 한 곳에 둠 */
export const SIMULATOR_DISCLAIMER =
  "본 시뮬레이터는 넥슨이 공개한 확률표를 기준으로 구현했지만, 실제 결과와 차이가 있을 수 있습니다. 참고용으로만 이용해 주세요.";

type HelpSection = {
  title: string;
  items: string[];
};

type HelpCardProps = {
  title: string;
  sections: HelpSection[];
  /** 넥슨 공식 확률표 주소. 넘기면 헤더 오른쪽에 바로가기가 붙음 */
  probabilityUrl?: string;
};

/** 도구 페이지 하단 도움말. 제목 한 줄과 "제목 + 불릿" 묶음들로만 구성됨 */
export function HelpCard({ title, sections, probabilityUrl }: HelpCardProps) {
  return (
    <Card className="gap-4">
      {/* CardHeader 는 CardAction 이 있으면 2열 그리드가 됨. 제목 왼쪽 / 링크 오른쪽 */}
      <CardHeader className="items-center">
        <CardTitle>{title}</CardTitle>

        {probabilityUrl && (
          <CardAction className="self-center justify-self-center">
            <Button type="button" variant="ghost" size="sm" asChild>
              <Link
                href={probabilityUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                확률표 보기
              </Link>
            </Button>
          </CardAction>
        )}
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 text-sm">
          {sections.map((section) => (
            <div key={section.title} className="grid gap-1">
              <p className="font-medium">{section.title}</p>

              <ul className="grid gap-1">
                {section.items.map((item) => (
                  <li key={item} className="text-muted-foreground flex gap-1.5">
                    {/* li 가 이미 목록임을 알리므로 대시는 장식임 */}
                    <span aria-hidden="true">-</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
