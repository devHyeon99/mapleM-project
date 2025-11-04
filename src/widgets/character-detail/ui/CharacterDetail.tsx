import { CharacterProfileCard } from "./CharacterProfileCard";
import { CharacterDetailTabs } from "./CharacterDetailTabs";
import { CharacterDetailData, UnionCard } from "@/entities/character";

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

      <div className="flex w-full max-w-3xl flex-col items-center gap-4 md:flex-row md:items-start md:justify-center">
        <div className="flex w-full flex-col items-center gap-1">
          <CharacterProfileCard data={characterData} />
          <UnionCard
            data={characterData.union_data}
            ranking={characterData.union_ranking}
          />
        </div>
        <CharacterDetailTabs ocid={ocid} characterData={characterData} />
      </div>
    </section>
  );
};
