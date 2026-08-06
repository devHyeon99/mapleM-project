import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export function SetEffectHelpCard() {
  return (
    <Card className="gap-4">
      <CardHeader>
        <CardTitle>세트옵션 계산기 도움말</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 text-sm">
          <div className="grid gap-1">
            <p className="font-medium">계산 기준</p>
            <p className="text-muted-foreground">
              - 세트 효과는 세트별 최소 세트 수부터 적용되며, 입력한 세트 수
              이하 구간 중 가장 높은 구간의 수치가 들어갑니다.
            </p>
            <p className="text-muted-foreground">
              - 스타포스 효과는 같은 세트에 속한 장비의 스타포스 합계로
              판정하고, 도달한 구간 중 가장 높은 구간의 수치가 들어갑니다.
            </p>
            <p className="text-muted-foreground">
              - 한벌옷은 스타포스가 두 배로 계산되므로 입력할 때도 두 배로 넣어
              주세요.
            </p>
          </div>
          <div className="grid gap-1">
            <p className="font-medium">세트 보정 안내</p>
            <p className="text-muted-foreground">
              - 아케인셰이드 1종은 자체 세트 효과가 켜지지 않아 앱솔랩스 1종과
              스타포스에 합산됩니다. 2종부터는 보정이 풀립니다.
            </p>
            <p className="text-muted-foreground">
              - 도전자의 장비는 이벤트 전용이라 계산 대상에서 제외했습니다.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
