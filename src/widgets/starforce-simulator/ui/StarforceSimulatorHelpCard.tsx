import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import Link from "next/link";

export function StarforceSimulatorHelpCard() {
  return (
    <Card className="gap-4 rounded-xs border-none py-4 lg:col-span-2">
      <CardHeader className="flex justify-between px-4">
        <CardTitle className="text-lg">스타포스 확률표</CardTitle>
        <Link
          className="self-end text-sm font-medium"
          prefetch={false}
          href="https://m.nexon.com/probability/5782?language=ko&theme="
          target="_blank"
          rel="noopener noreferrer"
        >
          확률표 보기
        </Link>
      </CardHeader>
      <CardContent className="space-y-4 px-4">
        <div className="bg-secondary grid gap-1 rounded-xs p-4 text-sm shadow-sm">
          <p className="font-medium">시뮬레이터 안내</p>
          <p className="text-muted-foreground">
            - 옵션 효과: 스타캐치(성공 +5%), 럭키데이(선택 수치만큼 성공 증가),
            세이프티(하락 방지), 프로텍트(파괴 방지)
          </p>

          <p className="text-muted-foreground">
            - 본 시뮬레이터는 넥슨이 공개한 확률표를 기준으로 구현했지만, 실제
            결과와 차이가 있을 수 있습니다. 참고용으로만 이용해 주세요.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
