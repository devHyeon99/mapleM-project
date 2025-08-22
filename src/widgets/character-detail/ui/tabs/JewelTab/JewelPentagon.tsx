import { cn } from "@/shared/lib/utils";
import { JewelPage } from "@/entities/character";
import { JewelDisplay } from "./JewelDisplay";

const JEWEL_POSITIONS = [
  "top-0 left-1/2 -translate-x-1/2",
  "top-[35%] left-0",
  "top-[35%] right-0",
  "bottom-0 left-[10%]",
  "bottom-0 right-[10%]",
];

interface JewelPentagonProps {
  activePageData: JewelPage;
  useJewelPageNo: number;
  parseSetOption?: string[];
}

export const JewelPentagon = ({
  activePageData,
  useJewelPageNo,
  parseSetOption,
}: JewelPentagonProps) => {
  return (
    <div className="relative mx-auto mt-2 h-[340px] w-full max-w-[320px]">
      {/* 0~4번 슬롯 반복 렌더링 */}
      {[0, 1, 2, 3, 4].map((slotIndex) => {
        const jewel = activePageData.jewel_info[slotIndex];
        if (!jewel) return null;

        return (
          <div
            key={jewel.slot_no}
            className={cn("absolute", JEWEL_POSITIONS[slotIndex])}
          >
            <JewelDisplay jewel={jewel} />
          </div>
        );
      })}

      {/* 중앙 세트 옵션 텍스트 */}
      {String(activePageData.jewel_page_no) === String(useJewelPageNo) && (
        <div className="pointer-events-none absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center">
          <div className="flex flex-col items-center rounded-lg p-2 text-center text-sm font-medium">
            {parseSetOption?.map((item) => (
              <p key={item + "-idx"} className="text-foreground">
                {item}
              </p>
            ))}
            <p className="text-muted-foreground mt-1 text-xs font-semibold">
              현재 장착중
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
