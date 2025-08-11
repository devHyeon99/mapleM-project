import { useQuery } from "@tanstack/react-query";

interface CharacterBasicInfo {
  ocid: string;
  character_name: string;
  world_name: string;
}

const fetchCharactersAll = async (
  name: string,
): Promise<CharacterBasicInfo[]> => {
  const res = await fetch(
    `/api/character/search-all?name=${encodeURIComponent(name)}`,
  );
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.error?.message || "전체 월드 검색에 실패했습니다.",
    );
  }
  return res.json();
};

/**
 * 전체 월드 캐릭터 검색 훅
 */
export const useCharacterSearchAll = (name?: string) => {
  return useQuery({
    queryKey: ["characters", "all", name],
    queryFn: () => fetchCharactersAll(name!),
    enabled: !!name,
    staleTime: 10 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};
