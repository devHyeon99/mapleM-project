import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import Link from "next/link";

export function CubeSimulatorHelpCard() {
  return (
    <Card className="gap-4 rounded-xs border-none py-4 lg:col-span-2">
      <CardHeader className="flex justify-between px-4">
        <CardTitle className="text-lg">큐브 시뮬레이터 도움말</CardTitle>
        <Link
          className="self-end text-sm font-medium"
          prefetch={false}
          href="https://m.nexon.com/probability?client_id=NTQwMzgzODAz&language=ko"
          target="_blank"
          rel="noopener noreferrer"
        >
          확률표 보기
        </Link>
      </CardHeader>
      <CardContent className="space-y-4 px-4">
        <div className="bg-secondary grid gap-3 rounded-xs p-4 text-sm shadow-sm">
          <div className="grid gap-1">
            <p className="font-medium">옵션 부여 안내</p>
            <p className="text-muted-foreground">
              - 제네시스 무기는 장비 레벨 200에 해당하는 잠재능력이 부여됩니다.
            </p>
            <p className="text-muted-foreground">
              - 루타비스 장비는 레벨 160에 해당하는 잠재능력이 부여됩니다.
            </p>
          </div>
          <div className="grid gap-1">
            <p className="font-medium">시뮬레이터 이용 안내</p>
            <p className="text-muted-foreground">
              - 본 시뮬레이터는 넥슨이 공개한 확률표를 기준으로 구현했지만, 실제
              결과와 차이가 있을 수 있습니다. 참고용으로만 이용해 주세요.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
