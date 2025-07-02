import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import type { CharacterSummary } from "@/app/api/characters/search-all/route";

export function useCharacterSearchAll(name?: string) {
  return useQuery<CharacterSummary[], Error>({
    queryKey: ["characters", name],
    queryFn: async () => {
      if (!name) return [];
      try {
        const res = await fetch(
          `/api/characters/search-all?name=${encodeURIComponent(name)}`,
        );
        if (!res.ok) throw new Error("캐릭터 검색 실패");
        const data = await res.json();
        return data.characters ?? [];
      } catch (err) {
        toast.warning("캐릭터 목록을 불러오지 못했습니다.");
        throw err as Error;
      }
    },
    enabled: !!name,
    staleTime: 1000 * 60,
  });
}
