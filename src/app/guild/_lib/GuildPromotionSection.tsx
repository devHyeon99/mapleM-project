import Link from "next/link";
import { GuildPromotionView } from "@/entities/guild-promotion/ui/GuildPromotionView";
import { CONTACT_URL } from "@/shared/config/site";
import { Button } from "@/shared/ui/button";
import { getGuildPromotions } from "@/entities/guild-promotion/api/get-guild-promotions";
import { attachGuildInfo } from "./promotion-with-mark";

/** 길드 페이지에서 미리 보여줄 개수. 나머지는 홍보 게시판에서 봄 */
const PREVIEW_COUNT = 4;

export async function GuildPromotionSection() {
  const items = await attachGuildInfo(await getGuildPromotions(PREVIEW_COUNT));

  return (
    <section aria-labelledby="guild-promotion-heading" className="mb-6 w-full">
      {/* md 이하에선 버튼이 제목 줄에 붙고, 설명은 아래 줄 전체를 씀 */}
      <div className="mb-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 gap-y-1 md:items-start">
        <h2 id="guild-promotion-heading" className="text-lg font-bold">
          길드 홍보
        </h2>

        <div className="flex shrink-0 items-end justify-end gap-2 md:row-span-2 md:self-end">
          <Button asChild variant="ghost" size="sm">
            <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer">
              홍보 문의
            </a>
          </Button>
          {items.length > 0 && (
            <Button asChild variant="ghost" size="sm">
              <Link href="/guild/promotion">더보기</Link>
            </Button>
          )}
        </div>

        <p className="text-muted-foreground text-13 col-span-2 break-keep md:col-span-1">
          카드를 누르면 길드 홍보 상세 내용을 볼 수 있습니다.
        </p>
      </div>

      {items.length > 0 ? (
        <GuildPromotionView items={items} variant="card" />
      ) : (
        // 목록이 비어도 섹션을 숨기지 않음. 홍보 문의로 이어지는 게 이 자리의 일임
        <div className="bg-card rounded-2xl px-4 py-10 text-center shadow-sm">
          <p className="text-sm font-medium">
            아직 등록된 길드 홍보가 없습니다.
          </p>
          <p className="text-muted-foreground text-13 mt-1 break-keep">
            길드 홍보를 원하신다면 홍보 문의 버튼을 통해 문의주세요.
          </p>
        </div>
      )}
    </section>
  );
}
