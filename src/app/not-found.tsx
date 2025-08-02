import Link from "next/link";
import { Button } from "@/shared/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-100px)] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-4xl font-bold">메엠지지</h1>
      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">페이지를 찾을 수 없습니다</h2>
        <p className="text-muted-foreground">
          요청하신 페이지가 존재하지 않거나, <br className="md:hidden" />
          주소가 변경되었을 수 있습니다.
        </p>
      </section>

      <Button asChild>
        <Link href="/">홈으로 돌아가기</Link>
      </Button>
    </div>
  );
}
