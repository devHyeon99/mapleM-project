import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group";
import { CharacterJewelEquipment } from "@/entities/character";
import { Badge } from "@/shared/ui/badge";

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
    <div className="flex w-full items-center justify-between">
      <div className="flex flex-row items-center gap-2">
        <h2 className="font-bold">쥬얼 페이지</h2>
        <Badge className="text-xs">{useJewelPageNo}페이지 적용 중</Badge>
      </div>

      <ToggleGroup
        type="single"
        variant="outline"
        value={activePageNo}
        onValueChange={(val) => {
          if (val) onPageChange(val);
        }}
      >
        {jewelEquipment.map((page) => (
          <ToggleGroupItem
            key={page.jewel_page_no}
            value={String(page.jewel_page_no)}
            className="h-8 w-8 p-0 first:rounded-l-sm last:rounded-r-sm"
          >
            {page.jewel_page_no}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};
