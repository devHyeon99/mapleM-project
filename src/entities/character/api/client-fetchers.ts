import { CharacterDetailData } from "../model/types/character";

interface CharacterDetailsResponse {
  data: CharacterDetailData;
}

export const fetchCharacterDetails = async (
  ocid: string,
): Promise<CharacterDetailsResponse> => {
  const res = await fetch(`/api/character/basic?ocid=${ocid}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.error?.message || "캐릭터 정보를 불러오는데 실패했습니다.",
    );
  }
  return res.json();
};
