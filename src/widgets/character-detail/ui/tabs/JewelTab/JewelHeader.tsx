import type { CharacterJewelEquipment } from "@/entities/character";
import { SegmentedToggle } from "@/shared/ui/SegmentedToggle";

interface JewelHeaderProps {
  useJewelPageNo: number;
  activePageNo: string;
  jewelEquipment: CharacterJewelEquipment["jewel_equipment"];
  onPageChange: (val: string) => void;
}

export const JewelHeader = ({
  useJewelPageNo,
  activePageNo,
  jewelEquipment,
  onPageChange,
}: JewelHeaderProps) => {
  return (
    <div className="flex w-full items-center justify-between gap-2">
      <h3 className="font-bold">쥬얼 페이지</h3>

      <SegmentedToggle
        ariaLabel="쥬얼 페이지 선택"
        value={Number(activePageNo)}
        onChange={(page) => onPageChange(String(page))}
        options={jewelEquipment.map(({ jewel_page_no }) => ({
          value: jewel_page_no,
          marked: jewel_page_no === useJewelPageNo,
        }))}
      />
    </div>
  );
};
