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
          <CharacterDetailTabs ocid={ocid} characterData={characterData} />
        </div>
      </div>
    </section>
  );
};
