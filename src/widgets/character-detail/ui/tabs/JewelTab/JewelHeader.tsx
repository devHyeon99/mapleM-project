import { CharacterJewelEquipment } from "@/entities/character";
import { PresetToggle } from "@/shared/ui/PresetToggle";

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
  const presets = jewelEquipment.map((page) => page.jewel_page_no);
  const selectedPreset = Number(activePageNo);

  return (
    <div className="flex w-full items-center justify-between gap-2">
      <h2 className="font-bold">쥬얼 페이지</h2>

      <PresetToggle
        activePresetNo={useJewelPageNo}
        presets={presets}
        selectedPreset={
          Number.isNaN(selectedPreset) ? undefined : selectedPreset
        }
        onSelectPreset={(preset) => onPageChange(String(preset))}
        ariaLabel="쥬얼 페이지 선택"
      />
    </div>
  );
};
