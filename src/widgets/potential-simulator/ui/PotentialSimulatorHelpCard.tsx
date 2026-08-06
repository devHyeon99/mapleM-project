import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import Link from "next/link";

export function PotentialSimulatorHelpCard() {
  return (
    <Card className="gap-4 lg:col-span-2">
      <CardHeader className="flex justify-between">
        <CardTitle className="text-lg">추가옵션 시뮬레이터 도움말</CardTitle>
        <Link
          className="self-end text-sm font-medium"
          prefetch={false}
          href="https://m.nexon.com/probability/5795?language=ko&theme="
          target="_blank"
          rel="noopener noreferrer"
        >
          확률표 보기
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-secondary ring-border grid gap-3 rounded-2xl p-4 text-sm shadow-sm ring">
          <div className="grid gap-1">
            <p className="font-medium">옵션 부여 안내</p>
            <p className="text-muted-foreground">
              - 고귀한 크리스탈의 장미, 저주받은 마도서 아이템은 장비 레벨 180에
              해당하는 추가 옵션이 부여됩니다.
            </p>
            <p className="text-muted-foreground">
              - 영생의 돌 아이템은 장비 레벨 140에 해당하는 추가 옵션이
              부여됩니다.
            </p>
            <p className="text-muted-foreground">
              - 제네시스 무기, 감시자의 눈 아이템은 장비 레벨 200에 해당하는
              추가 옵션이 부여됩니다.
            </p>
          </div>
          <div className="grid gap-1">
            <p className="font-medium">장비 종류 안내</p>
            <p className="text-muted-foreground">
              - 장비 종류 (방어구/공용방어구)에는 모자, 상의, 하의, 한벌옷,
              장갑, 신발, 어깨, 망토, 벨트가 포함됩니다.
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
