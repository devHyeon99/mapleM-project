import type { Character } from "@/types/scheduler";
import { supabase } from "@/utils/supabase/client";

// 캐릭터 목록 조회
export const fetchCharacters = async (
  accountId: string,
): Promise<Character[]> => {
  const { data, error } = await supabase
    .from("characters")
    .select("*")
    .eq("account_id", accountId);

  if (error) {
    console.error("Supabase fetch characters error:", error);
    throw error;
  }
  return data ?? [];
};

// 캐릭터 추가
export const addCharacter = async (newCharacter: {
  account_id: string;
  name: string;
  world_name: string;
}): Promise<Character> => {
  const response = await fetch("/api/characters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCharacter),
  });

  if (!response.ok) {
    const errorData = await response.json();
    // 서버에서 보낸 에러 메시지를 그대로 전달
    throw new Error(errorData.error || "캐릭터를 추가하지 못했습니다.");
  }

  return response.json();
};

// 캐릭터 삭제
export const deleteCharacter = async (characterId: string): Promise<void> => {
  const { error } = await supabase
    .from("characters")
    .delete()
    .eq("id", characterId);

  if (error) {
    console.error("Supabase delete character error:", error);
    throw error;
  }
};
