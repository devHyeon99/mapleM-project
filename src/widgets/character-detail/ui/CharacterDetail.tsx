import { CharacterProfileCard } from "./CharacterProfileCard";
import { CharacterDetailTabs } from "./CharacterDetailTabs";
import type { CharacterDetailData } from "@/entities/character/model/types";

interface CharacterBasicInfoProps {
  ocid: string;
  characterData: CharacterDetailData;
}

export const CharacterDetail = ({
  ocid,
  characterData,
}: CharacterBasicInfoProps) => {
  const titleText = `${characterData.world_name} ${characterData.character_name} 캐릭터 정보`;
  const itemData = {
    character_class: characterData.character_class,
    item_equipment: characterData.item_equipment,
    equipment_preset: characterData.equipment_preset,
    use_preset_no: characterData.use_preset_no,
    android_use_preset_no: characterData.android_use_preset_no,
    android_equipment: characterData.android_equipment,
    heart_equipment: characterData.heart_equipment,
    android_preset: characterData.android_preset,
  };

  return (
    <section
      aria-labelledby="character-info-title"
      className="flex w-full justify-center"
    >
      <h2 className="sr-only" id="character-info-title">
        {titleText}
      </h2>

      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full flex-col">
          <CharacterProfileCard data={characterData} />
        </div>
        <div className="flex w-full flex-col">
          <CharacterDetailTabs
            ocid={ocid}
            level={characterData.character_level}
            itemData={itemData}
            unionData={characterData.union_data ?? null}
            unionRanking={characterData.union_ranking ?? null}
          />
        </div>
      </div>
    </section>
  );
};
