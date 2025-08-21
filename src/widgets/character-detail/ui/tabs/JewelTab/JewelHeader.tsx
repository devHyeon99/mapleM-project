import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group";
import { CharacterJewelEquipment } from "@/entities/character";

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
      <div className="flex flex-col gap-0.5">
        <h3 className="font-bold">쥬얼 페이지</h3>
        <p className="text-muted-foreground text-sm">
          {useJewelPageNo}페이지 장착중
        </p>
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
            className="h-8 w-8 p-0"
          >
            {page.jewel_page_no}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};
