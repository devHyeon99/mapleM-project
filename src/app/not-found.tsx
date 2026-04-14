import Link from "next/link";
import { Button } from "@/shared/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-2xl font-bold">페이지를 찾을 수 없습니다</h1>
      <p className="text-muted-foreground">
        요청하신 페이지가 존재하지 않거나, <br className="md:hidden" />
        주소가 변경되었을 수 있습니다.
      </p>

      <Button asChild>
        <Link href="/">홈으로 돌아가기</Link>
      </Button>
    </div>
  );
}
